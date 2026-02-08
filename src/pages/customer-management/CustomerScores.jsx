import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    ArrowUpDown, Award, Trophy, Target,
    User, Calendar, Star, TrendingUp,
    Filter, Download, BarChart3, Sparkles,
    Crown, Zap, ChevronRight, Users,
    Coins, Medal, History, Clock,
    ExternalLink, Search, BarChart
} from 'lucide-react';

import Layout from '../layout/Layout';
import { UserNavbar } from '@/components/UserNavbar';
import { Search as SearchComponent } from '@/components/Search';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/button';
import { DataTable } from '@/components/common/DataTable';
import { Badge } from '@/components/ui/badge';
import { PageLoader } from '@/components/common/Loading';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { fetchCustomerScores } from '@/features/customer-score/customerScoreActions';

const topNav = [
    { title: 'خانه', href: 'dashboard/overview', isActive: false },
    { title: 'مشتریان', href: 'dashboard/customers', isActive: false },
    { title: 'امتیازات', href: 'dashboard/scores', isActive: true },
    { title: 'گزارش‌ها', href: 'dashboard/reports', isActive: false },
    { title: 'تنظیمات', href: 'dashboard/settings', isActive: false },
];

const scoreTypeColors = {
    "شرکت در نظرسنجی": { bg: "from-blue-100 to-indigo-100", text: "text-blue-700", border: "border-blue-200" },
    "خرید محصول": { bg: "from-emerald-100 to-teal-100", text: "text-emerald-700", border: "border-emerald-200" },
    "معرفی دوستان": { bg: "from-purple-100 to-pink-100", text: "text-purple-700", border: "border-purple-200" },
    "اولین خرید": { bg: "from-amber-100 to-orange-100", text: "text-amber-700", border: "border-amber-200" },
    "ثبت نظر": { bg: "from-cyan-100 to-sky-100", text: "text-cyan-700", border: "border-cyan-200" },
    "تولد": { bg: "from-rose-100 to-pink-100", text: "text-rose-700", border: "border-rose-200" },
};

export default function CustomerScores() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, customerScores = [], error } = useSelector(state => state.customerScores);
    console.log(customerScores.length)
    const [timeFilter, setTimeFilter] = useState('all');
    const [scoreTypeFilter, setScoreTypeFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(fetchCustomerScores({ "_Business": 3 }));
    }, [dispatch]);

    // محاسبات پیشرفته برای آمار
    const stats = useMemo(() => {
        if (!customerScores?.length) return {
            totalPoints: 0,
            count: 0,
            avg: 0,
            max: 0,
            topCustomer: null,
            topScoreType: null,
            recentPoints: 0
        };

        const totalPoints = customerScores.reduce((acc, curr) => acc + (curr.amount || 0), 0);
        const avg = Math.round(totalPoints / customerScores.length);
        const max = Math.max(...customerScores.map(s => s.amount || 0));

        // امتیازات اخیر (آخرین 7 روز)
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const recentPoints = customerScores.filter(s =>
            new Date(s.scoreDate) > oneWeekAgo
        ).reduce((acc, curr) => acc + (curr.amount || 0), 0);

        // پیدا کردن مشتری برتر
        const customerPoints = {};
        customerScores.forEach(score => {
            const key = score.mobile;
            customerPoints[key] = (customerPoints[key] || 0) + (score.amount || 0);
        });

        const topCustomerKey = Object.keys(customerPoints).reduce((a, b) =>
            customerPoints[a] > customerPoints[b] ? a : b
        );

        const topCustomer = customerScores.find(s => s.mobile === topCustomerKey);

        // پیدا کردن نوع امتیاز برتر
        const scoreTypeCounts = {};
        customerScores.forEach(score => {
            const type = score.TypeScoreTitle;
            scoreTypeCounts[type] = (scoreTypeCounts[type] || 0) + 1;
        });

        const topScoreType = Object.keys(scoreTypeCounts).reduce((a, b) =>
            scoreTypeCounts[a] > scoreTypeCounts[b] ? a : b
        );

        return {
            totalPoints,
            count: customerScores.length,
            avg,
            max,
            recentPoints,
            topCustomer,
            topCustomerPoints: customerPoints[topCustomerKey] || 0,
            topScoreType,
            topScoreTypeCount: scoreTypeCounts[topScoreType] || 0
        };
    }, [customerScores]);

    // فیلتر داده‌ها
    const filteredScores = useMemo(() => {
        if (!customerScores) return [];

        let filtered = [...customerScores];

        // فیلتر زمانی
        if (timeFilter !== 'all') {
            const now = new Date();
            const filterMap = {
                week: (date) => {
                    const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
                    return date >= weekAgo;
                },
                month: (date) => {
                    const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
                    return date >= monthAgo;
                },
                quarter: (date) => {
                    const quarterAgo = new Date(now.setMonth(now.getMonth() - 3));
                    return date >= quarterAgo;
                }
            };

            filtered = filtered.filter(s => {
                const date = new Date(s.scoreDate);
                return filterMap[timeFilter](date);
            });
        }

        // فیلتر نوع امتیاز
        if (scoreTypeFilter !== 'all') {
            filtered = filtered.filter(s => s.TypeScoreTitle === scoreTypeFilter);
        }

        // فیلتر جستجو
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(s =>
                s.FullName?.toLowerCase().includes(query) ||
                s.mobile?.toString().includes(query) ||
                s.TypeScoreTitle?.toLowerCase().includes(query)
            );
        }

        return filtered;
    }, [customerScores, timeFilter, scoreTypeFilter, searchQuery]);

    const columns = [
        {
            accessorKey: "id",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="text-xs font-bold text-slate-500 px-2">
                    <div className="flex items-center gap-2">
                        <Hash className="h-3.5 w-3.5" />
                        شماره رکورد
                        <ArrowUpDown className="h-3 w-3" />
                    </div>
                </Button>
            ),
            cell: ({ row }) => (
                <div className="font-mono text-sm font-bold text-slate-400">
                    #{row.getValue("id")}
                </div>
            ),
            size: 100,
        },
        {
            accessorKey: "FullName",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="text-xs font-bold text-slate-500 px-2">
                    <div className="flex items-center gap-2">
                        <User className="h-3.5 w-3.5" />
                        مشتری
                        <ArrowUpDown className="h-3 w-3" />
                    </div>
                </Button>
            ),
            cell: ({ row }) => {
                const fullName = row.original.FullName;
                const mobile = row.original.mobile;
                const firstName = row.original.FirstName;

                return (
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-white shadow-lg">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mobile}`} />
                            <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-500 text-white">
                                {firstName?.charAt(0) || fullName?.charAt(0) || "U"}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                            <span className="font-bold text-sm text-slate-800">
                                {fullName || "کاربر مهمان"}
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full">
                                    <Phone className="h-3 w-3" />
                                    <span className="font-mono">0{mobile}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            },
            size: 220,
        },
        {
            accessorKey: "TypeScoreTitle",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="text-xs font-bold text-slate-500 px-2">
                    <div className="flex items-center gap-2">
                        <Award className="h-3.5 w-3.5" />
                        نوع امتیاز
                        <ArrowUpDown className="h-3 w-3" />
                    </div>
                </Button>
            ),
            cell: ({ row }) => {
                const type = row.getValue("TypeScoreTitle");
                const typeColors = scoreTypeColors[type] || {
                    bg: "from-slate-100 to-gray-100",
                    text: "text-slate-700",
                    border: "border-slate-200"
                };

                return (
                    <Badge className={`${typeColors.bg} ${typeColors.text} ${typeColors.border} px-3 py-1.5 rounded-xl font-bold border`}>
                        <Award className="h-3 w-3 ml-1" />
                        {type || "امتیاز معمولی"}
                    </Badge>
                );
            },
            size: 180,
        },
        {
            accessorKey: "amount",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="text-xs font-bold text-slate-500 px-2">
                    <div className="flex items-center gap-2">
                        <Star className="h-3.5 w-3.5" />
                        امتیاز کسب شده
                        <ArrowUpDown className="h-3 w-3" />
                    </div>
                </Button>
            ),
            cell: ({ row }) => {
                const amount = row.getValue("amount");
                const isHighScore = amount >= 100;

                return (
                    <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${isHighScore
                            ? 'bg-gradient-to-br from-amber-100 to-orange-100'
                            : 'bg-gradient-to-br from-blue-100 to-indigo-100'
                            }`}>
                            {isHighScore ? (
                                <Crown className="h-5 w-5 text-amber-600" />
                            ) : (
                                <Star className="h-5 w-5 text-blue-600" />
                            )}
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-baseline gap-1">
                                <span className={`text-lg font-black ${isHighScore ? 'text-amber-700' : 'text-blue-700'}`}>
                                    +{amount}
                                </span>
                                <span className="text-xs font-medium text-slate-400">امتیاز</span>
                            </div>
                            {isHighScore && (
                                <Badge className="mt-1 w-fit text-[10px] bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-2 py-0 h-4">
                                    امتیاز ویژه
                                </Badge>
                            )}
                        </div>
                    </div>
                );
            },
            size: 180,
        },
        {
            accessorKey: "scoreDate",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="text-xs font-bold text-slate-500 px-2">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5" />
                        تاریخ کسب
                        <ArrowUpDown className="h-3 w-3" />
                    </div>
                </Button>
            ),
            cell: ({ row }) => {
                const date = new Date(row.getValue("scoreDate"));
                const now = new Date();
                const isRecent = (now - date) < 24 * 60 * 60 * 1000 * 3; // 3 روز اخیر

                return (
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${isRecent ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'
                                }`}>
                                <Calendar className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col text-right" dir="rtl">
                                <span className="text-sm font-bold text-slate-700">
                                    {date.toLocaleDateString('fa-IR')}
                                </span>
                                <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                                    <Clock className="h-3 w-3" />
                                    {date.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                        {isRecent && (
                            <Badge className="mt-2 w-fit text-[10px] bg-green-50 text-green-600 border-green-200 px-2 py-0.5">
                                <Sparkles className="h-2.5 w-2.5 ml-1" />
                                جدید
                            </Badge>
                        )}
                    </div>
                );
            },
            size: 160,
        },
        {
            id: "actions",
            header: () => <div className="text-xs font-bold text-slate-500 px-2">جزئیات</div>,
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all duration-300"
                                    onClick={() => navigate(`/customers/${row.original.mobile}`)}
                                >
                                    <ExternalLink className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-xs">مشاهده پروفایل مشتری</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <div className="h-6 w-px bg-slate-200" />
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-300"
                        onClick={() => navigate(`/scores/${row.original.id}`)}
                    >
                        <BarChart className="h-4 w-4" />
                    </Button>
                </div>
            ),
            size: 100,
        },
    ];

    // جمع‌آوری انواع امتیازهای موجود برای فیلتر
    const scoreTypes = useMemo(() => {
        if (!customerScores) return [];
        const types = [...new Set(customerScores.map(s => s.TypeScoreTitle).filter(Boolean))];
        return types;
    }, [customerScores]);

    if (loading && (!customerScores || customerScores.length === 0)) return <PageLoader />;

    return (
        <Layout>
            <Layout.Header>
                <Navbar links={topNav} />
                <div className='mr-auto flex items-center space-x-4 gap-5 text-right' dir="rtl">
                    <SearchComponent />
                    <UserNavbar />
                </div>
            </Layout.Header>

            <Layout.Body className="space-y-6">
                {/* هدر گرادیان خیره کننده */}
                <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24" />

                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <Trophy className="h-7 w-7" />
                                </div>
                                <div>
                                    <h1 className='text-3xl font-black tracking-tight'>امتیازات مشتریان</h1>
                                    <p className="text-sm opacity-90 font-medium">ردیابی و مدیریت امتیازات کسب شده توسط مشتریان</p>
                                </div>
                            </div>

                        </div>
                        <div className="flex flex-wrap gap-3 mt-4">
                            <Badge className="bg-white/20 backdrop-blur-sm border-white/30 px-4 py-2 rounded-xl">
                                <Coins className="h-3.5 w-3.5 ml-1" />
                                {customerScores?.length || 0} امتیاز ثبت شده
                            </Badge>
                            <Badge className="bg-white/20 backdrop-blur-sm border-white/30 px-4 py-2 rounded-xl">
                                <Target className="h-3.5 w-3.5 ml-1" />
                                {stats.recentPoints.toLocaleString()} امتیاز هفته اخیر
                            </Badge>
                            {stats.topScoreType && (
                                <Badge className="bg-white/20 backdrop-blur-sm border-white/30 px-4 py-2 rounded-xl">
                                    <Medal className="h-3.5 w-3.5 ml-1" />
                                    برترین نوع: {stats.topScoreType}
                                </Badge>
                            )}
                        </div>


                    </div>
                </div>

                {/* فیلترهای پیشرفته */}
                <Card className="border-none shadow-lg rounded-3xl overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-50 to-white rounded-2xl border">
                                    <Filter className="h-4 w-4 text-slate-400" />
                                    <span className="text-sm font-bold text-slate-700">فیلترهای پیشرفته:</span>
                                </div>

                                <Tabs defaultValue="all" value={timeFilter} onValueChange={setTimeFilter} className="w-auto">
                                    <TabsList className="bg-white p-1 rounded-2xl border">
                                        <TabsTrigger value="all" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white px-4">
                                            همه زمان‌ها
                                        </TabsTrigger>
                                        <TabsTrigger value="week" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white px-4">
                                            ۷ روز اخیر
                                        </TabsTrigger>
                                        <TabsTrigger value="month" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white px-4">
                                            این ماه
                                        </TabsTrigger>
                                        <TabsTrigger value="quarter" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white px-4">
                                            ۳ ماه اخیر
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <div className="relative flex-1 md:flex-none">
                                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        placeholder="جستجوی مشتری، شماره موبایل یا نوع امتیاز..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pr-10 rounded-xl bg-slate-50 border-slate-200"
                                    />
                                </div>

                                <Select value={scoreTypeFilter} onValueChange={setScoreTypeFilter}>
                                    <SelectTrigger className="w-[180px] rounded-xl bg-white border-slate-200">
                                        <SelectValue placeholder="نوع امتیاز" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">همه انواع</SelectItem>
                                        {scoreTypes.map(type => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>



                {/* بخش اصلی جدول */}
                <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden">
                    <div className="h-3 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                                    <History className="h-5 w-5 text-amber-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-black text-slate-800">سوابق امتیازات</h2>
                                    <p className="text-sm text-slate-400">نمایش تمامی امتیازات کسب شده توسط مشتریان</p>
                                </div>
                            </div>
                            <Badge className="bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 border-slate-200 px-4 py-2 rounded-xl">
                                <Users className="h-3.5 w-3.5 ml-1" />
                                {filteredScores?.length || 0} مورد یافت شد
                            </Badge>
                        </div>

                        {/* استفاده از SafeDataTable برای جلوگیری از خطا */}
                        {filteredScores && (
                            <SafeDataTable
                                data={filteredScores}
                                columns={columns}
                                searchPlaceholder="جستجوی در امتیازات..."
                                showViewOptions={true}
                                emptyMessage="هیچ امتیازی یافت نشد"
                            />
                        )}
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>
    );
}

// کامپوننت آیکون Hash برای ستون شماره رکورد
function Hash(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="9" y2="9" />
            <line x1="4" x2="20" y1="15" y2="15" />
            <line x1="10" x2="8" y1="3" y2="21" />
            <line x1="16" x2="14" y1="3" y2="21" />
        </svg>
    );
}

// کامپوننت آیکون Phone برای ستون موبایل
function Phone(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    );
}

// کامپوننت کمکی برای کارت‌های آمار
function CardStats({ title, value, unit, icon, color, bg, growth, customer, customerPoints }) {
    return (
        <Card className={`${bg} border-none rounded-3xl overflow-hidden relative group hover:scale-[1.02] transition-all duration-300 cursor-pointer`}>
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                    <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg`}>
                        {icon}
                    </div>
                    {growth && (
                        <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-emerald-700 border-emerald-200 px-3 py-1 rounded-full">
                            <span className="flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" />
                                +{growth}%
                            </span>
                        </Badge>
                    )}
                </div>

                <div className="space-y-2">
                    <span className="text-sm font-bold text-slate-600">{title}</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-800">{value}</span>
                        <span className="text-xs font-medium text-slate-400">{unit}</span>
                    </div>

                    {customer && (
                        <div className="pt-3 border-t border-white/20 mt-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6 border">
                                        <AvatarFallback className="text-xs bg-white/20">
                                            {customer.FullName?.charAt(0) || "C"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs font-medium text-slate-600 truncate max-w-[80px]">
                                        {customer.FullName || "مشتری برتر"}
                                    </span>
                                </div>
                                <span className="text-xs font-bold text-slate-700">
                                    {customerPoints.toLocaleString()} امتیاز
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                </div>
            </CardContent>
        </Card>
    );
}

// SafeDataTable wrapper برای جلوگیری از خطا
function SafeDataTable({ data, columns, ...props }) {
    // اطمینان از اینکه data و columns وجود دارند
    const safeData = Array.isArray(data) ? data : [];
    const safeColumns = Array.isArray(columns) ? columns : [];

    try {
        return (
            <DataTable
                data={safeData}
                columns={safeColumns}
                filters={[]}
            />
        );
    } catch (error) {
        console.error('Error in DataTable:', error);
        return (
            <div className="text-center p-8 text-slate-500">
                <div className="text-lg font-bold mb-2">خطا در نمایش جدول</div>
                <p className="text-sm">مشکلی در بارگذاری داده‌ها رخ داده است.</p>
            </div>
        );
    }
}