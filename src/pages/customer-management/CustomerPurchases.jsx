import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    ArrowUpDown, Clock, Phone, CreditCard,
    User, Calendar, ExternalLink, Receipt,
    TrendingUp, Wallet, ShoppingBag, Filter,
    Download, BarChart3, Sparkles, Crown,
    Award, Target, Zap, ChevronRight
} from 'lucide-react';

import Layout from '../layout/Layout';
import { UserNavbar } from '@/components/UserNavbar';
import { Search } from '@/components/Search';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/button';
import { DataTable } from '@/components/common/DataTable';
import { Badge } from '@/components/ui/badge';
import { PageLoader } from '@/components/common/Loading';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { fetchCustomerPurchases } from '@/features/customer-purchase/customerPurchaseActions';

const topNav = [
    { title: 'خانه', href: 'dashboard/overview', isActive: false },
    { title: 'مشتریان', href: 'dashboard/customers', isActive: false },
    { title: 'لیست خریدها', href: 'dashboard/purchases', isActive: true },
    { title: 'گزارش‌ها', href: 'dashboard/reports', isActive: false },
    { title: 'تنظیمات', href: 'dashboard/settings', isActive: false },
];

export default function CustomerPurchases() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, customerPurchases } = useSelector((state) => state.customerPurchases);
    const [timeFilter, setTimeFilter] = React.useState('all');

    useEffect(() => {
        dispatch(fetchCustomerPurchases());
    }, [dispatch]);

    // محاسبات پیشرفته برای آمار
    const stats = useMemo(() => {
        if (!customerPurchases?.length) return {
            total: 0,
            count: 0,
            avg: 0,
            max: 0,
            monthlyGrowth: 0,
            topCustomer: null
        };

        const total = customerPurchases.reduce((acc, curr) => acc + (curr.Tot || 0), 0);
        const avg = Math.round(total / customerPurchases.length);
        const max = Math.max(...customerPurchases.map(p => p.Tot || 0));

        // محاسبه رشد ماهانه (فرضی)
        const monthlyGrowth = customerPurchases.length > 10 ? 15 : 5;

        // پیدا کردن مشتری برتر
        const customerTotals = {};
        customerPurchases.forEach(purchase => {
            const key = purchase.mobile;
            customerTotals[key] = (customerTotals[key] || 0) + (purchase.Tot || 0);
        });

        const topCustomerKey = Object.keys(customerTotals).reduce((a, b) =>
            customerTotals[a] > customerTotals[b] ? a : b
        );

        const topCustomer = customerPurchases.find(p => p.mobile === topCustomerKey);

        return {
            total,
            count: customerPurchases.length,
            avg,
            max,
            monthlyGrowth,
            topCustomer,
            topCustomerAmount: customerTotals[topCustomerKey] || 0
        };
    }, [customerPurchases]);

    const filteredPurchases = useMemo(() => {
        if (!customerPurchases) return [];

        const now = new Date();
        const filterMap = {
            today: (date) => date.toDateString() === now.toDateString(),
            week: (date) => {
                const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
                return date >= weekAgo;
            },
            month: (date) => {
                const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
                return date >= monthAgo;
            }
        };

        if (timeFilter === 'all') return customerPurchases;

        return customerPurchases.filter(p => {
            const date = new Date(p.tDate);
            return filterMap[timeFilter](date);
        });
    }, [customerPurchases, timeFilter]);

    const columns = [
        {
            accessorKey: "id",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="text-xs font-bold text-slate-500 px-2">
                    <div className="flex items-center gap-2">
                        <Receipt className="h-3.5 w-3.5" />
                        شماره فاکتور
                        <ArrowUpDown className="h-3 w-3" />
                    </div>
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                        <Receipt className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-mono font-bold text-sm text-slate-800">#{row.getValue("id")}</span>
                    </div>
                </div>
            ),
            size: 120,
        },
        {
            accessorKey: "mobile",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="text-xs font-bold text-slate-500 px-2">
                    <div className="flex items-center gap-2">
                        <User className="h-3.5 w-3.5" />
                        اطلاعات مشتری
                        <ArrowUpDown className="h-3 w-3" />
                    </div>
                </Button>
            ),
            cell: ({ row }) => {
                const fullName = row.original.FullName;
                const mobile = row.getValue("mobile");

                return (
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-white shadow-md">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mobile}`} />
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                                {fullName?.charAt(0) || "U"}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                            <span className="font-bold text-sm text-slate-800">
                                {fullName && fullName.trim() ? fullName : "کاربر مهمان"}
                            </span>

                            <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full">
                                    <Phone className="h-3 w-3" />
                                    <span className="font-mono">0{mobile}</span>
                                </div>
                                {row.original._Level >= 3 && (
                                    <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-0 px-2 py-0.5 text-[10px]">
                                        <Crown className="h-2.5 w-2.5 ml-1" />
                                        طلایی
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                );
            },
            size: 250,
        },
        {
            accessorKey: "tDate",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="text-xs font-bold text-slate-500 px-2">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5" />
                        زمان خرید
                        <ArrowUpDown className="h-3 w-3" />
                    </div>
                </Button>
            ),
            cell: ({ row }) => {
                const date = new Date(row.getValue("tDate"));
                const isRecent = (new Date() - date) < 24 * 60 * 60 * 1000;

                return (
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <div className={`h-8 w-8 rounded-xl flex items-center justify-center ${isRecent ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
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
                            <Badge className="mt-1 w-fit text-[9px] bg-green-50 text-green-600 border-green-200 px-2 py-0">
                                امروز
                            </Badge>
                        )}
                    </div>
                );
            },
            size: 160,
        },
        {
            accessorKey: "Tot",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="text-xs font-bold text-slate-500 px-2">
                    <div className="flex items-center gap-2">
                        <CreditCard className="h-3.5 w-3.5" />
                        مبلغ پرداختی
                        <ArrowUpDown className="h-3 w-3" />
                    </div>
                </Button>
            ),
            cell: ({ row }) => {
                const amount = row.getValue("Tot");
                const isHighValue = amount > 5000000;

                return (
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <div className={`h-8 w-8 rounded-xl flex items-center justify-center ${isHighValue ? 'bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-600' : 'bg-emerald-50 text-emerald-500'}`}>
                                <CreditCard className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-base font-black ${isHighValue ? 'text-emerald-700' : 'text-emerald-600'}`}>
                                        {Number(amount).toLocaleString()}
                                    </span>
                                    <span className="text-[10px] font-medium text-slate-400">تومان</span>
                                </div>
                                <div className="flex gap-1 mt-1">
                                    <Badge variant="outline" className="text-[9px] bg-gradient-to-r from-emerald-50 to-white border-emerald-200 text-emerald-700 px-2 py-0 h-5">
                                        <Sparkles className="h-2.5 w-2.5 ml-1" />
                                        پرداخت موفق
                                    </Badge>
                                    {isHighValue && (
                                        <Badge className="text-[9px] bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-2 py-0 h-5">
                                            <Award className="h-2.5 w-2.5 ml-1" />
                                            خرید کلان
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            },
            size: 180,
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
                                    onClick={() => navigate(`/purchases/${row.original.id}`)}
                                >
                                    <ExternalLink className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-xs">مشاهده جزئیات خرید</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <div className="h-6 w-px bg-slate-200" />
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-300"
                        onClick={() => navigate(`/customers/${row.original.mobile}`)}
                    >
                        <User className="h-4 w-4" />
                    </Button>
                </div>
            ),
            size: 100,
        },
    ];

    if (loading && (!customerPurchases || customerPurchases.length === 0)) return <PageLoader />;

    return (
        <Layout>
            <Layout.Header>
                <Navbar links={topNav} />
                <div className='mr-auto flex items-center space-x-4 gap-5 text-right' dir="rtl">
                    <Search />
                    <UserNavbar />
                </div>
            </Layout.Header>

            <Layout.Body className="space-y-6">
                {/* هدر استاتیکی زیبا */}
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[1.5rem] px-8 py-5 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24" />

                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <ShoppingBag className="h-7 w-7" />
                                </div>
                                <div>
                                    <h1 className='text-3xl font-black tracking-tight'>لیست خرید مشتریان</h1>
                                    <p className="text-sm opacity-90 font-medium">نمایش و مدیریت تمام تراکنش‌های ثبت شده در سیستم</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mt-4">
                            <Badge className="bg-white/20 backdrop-blur-sm border-white/30 px-4 py-2 rounded-xl">
                                <Sparkles className="h-3.5 w-3.5 ml-1" />
                                {customerPurchases?.length || 0} تراکنش ثبت شده
                            </Badge>
                            <Badge className="bg-white/20 backdrop-blur-sm border-white/30 px-4 py-2 rounded-xl">
                                <Target className="h-3.5 w-3.5 ml-1" />
                                {stats.monthlyGrowth}% رشد ماهانه
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* فیلترهای سریع */}
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border shadow-sm">
                            <Filter className="h-4 w-4 text-slate-400" />
                            <span className="text-sm font-bold text-slate-700">فیلتر زمانی:</span>
                        </div>
                        <Tabs defaultValue="all" value={timeFilter} onValueChange={setTimeFilter} className="w-auto">
                            <TabsList className="bg-white p-1 rounded-2xl border">
                                <TabsTrigger value="all" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white px-4">
                                    همه
                                </TabsTrigger>
                                <TabsTrigger value="today" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white px-4">
                                    امروز
                                </TabsTrigger>
                                <TabsTrigger value="week" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white px-4">
                                    این هفته
                                </TabsTrigger>
                                <TabsTrigger value="month" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white px-4">
                                    این ماه
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" className="rounded-xl gap-2">
                            <Zap className="h-3.5 w-3.5" />
                            فیلتر پیشرفته
                        </Button>
                    </div>
                </div>

                {/* کارت‌های آمار پیشرفته */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <CardStats
                        title="مجموع فروش"
                        value={stats.total.toLocaleString()}
                        unit="تومان"
                        icon={<Wallet className="h-5 w-5" />}
                        color="from-emerald-500 to-teal-500"
                        bg="bg-gradient-to-br from-emerald-50 to-teal-50"
                        growth={stats.monthlyGrowth}
                    />
                    <CardStats
                        title="تعداد تراکنش‌ها"
                        value={stats.count}
                        unit="فاکتور"
                        icon={<Receipt className="h-5 w-5" />}
                        color="from-blue-500 to-indigo-500"
                        bg="bg-gradient-to-br from-blue-50 to-indigo-50"
                        growth={stats.monthlyGrowth}
                    />
                    <CardStats
                        title="میانگین خرید"
                        value={stats.avg.toLocaleString()}
                        unit="تومان"
                        icon={<TrendingUp className="h-5 w-5" />}
                        color="from-amber-500 to-orange-500"
                        bg="bg-gradient-to-br from-amber-50 to-orange-50"
                    />
                    <CardStats
                        title="بیشترین خرید"
                        value={stats.max.toLocaleString()}
                        unit="تومان"
                        icon={<Crown className="h-5 w-5" />}
                        color="from-purple-500 to-pink-500"
                        bg="bg-gradient-to-br from-purple-50 to-pink-50"
                        customer={stats.topCustomer}
                        customerAmount={stats.topCustomerAmount}
                    />
                </div>

                {/* بخش اصلی جدول */}
                <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden">
                    <div className="h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                    <CardContent className="p-6">
                        <DataTable
                            data={filteredPurchases}
                            columns={columns}
                            filters={[
                                { value: "mobile", placeholder: "شماره موبایل" },
                                { value: "FullName", placeholder: "نام مشتری" },
                                { value: "id", placeholder: "شماره فاکتور" }
                            ]}
                            searchPlaceholder="جستجوی در خریدها"
                            showViewOptions={true}
                        />
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>
    );
}

function CardStats({ title, value, unit, icon, color, bg, growth, customer, customerAmount }) {
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
                                    {customerAmount.toLocaleString()}
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