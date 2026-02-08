import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Gift, User, Calendar, Key, Activity, Filter, Download, Eye,
    TrendingUp, Percent, Clock, Shield, Sparkles, Zap, Award,
    CheckCircle, XCircle, MoreVertical, BarChart3, RefreshCw
} from 'lucide-react';

import Layout from '../layout/Layout';
import { UserNavbar } from '@/components/UserNavbar';
import { Search } from '@/components/Search';
import { Navbar } from '@/components/Navbar';
import { DataTable } from '@/components/common/DataTable';
import { PageLoader } from '@/components/common/Loading';
import { fetchCustomerCoupons } from '@/features/customer-coupon/customerCouponActions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const TOP_NAV = [
    { title: 'خانه', href: 'dashboard/overview', isActive: false },
    { title: 'مشتریان', href: 'dashboard/customers', isActive: false },
    { title: 'کوپن‌ها', href: 'dashboard/coupons', isActive: true },
    { title: 'تنظیمات', href: 'dashboard/settings', isActive: false },
];

const STATS_COLORS = {
    used: { bg: 'bg-emerald-500', text: 'text-emerald-500', light: 'bg-emerald-50' },
    active: { bg: 'bg-blue-500', text: 'text-blue-500', light: 'bg-blue-50' },
    expired: { bg: 'bg-rose-500', text: 'text-rose-500', light: 'bg-rose-50' },
    total: { bg: 'bg-indigo-500', text: 'text-indigo-500', light: 'bg-indigo-50' }
};

export default function CustomerCoupons() {
    const dispatch = useDispatch();
    const { loading, customerCoupons } = useSelector(state => state.customerCoupons);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        dispatch(fetchCustomerCoupons({ "_Business": 3 }));
    }, [dispatch]);

    // محاسبه آمار
    const stats = useMemo(() => {
        if (!customerCoupons) return null;

        const total = customerCoupons.length;
        const used = customerCoupons.filter(c => c.useDate).length;
        const active = customerCoupons.filter(c => !c.useDate && new Date(c.expiryDate) > new Date()).length;
        const expired = customerCoupons.filter(c => !c.useDate && new Date(c.expiryDate) <= new Date()).length;
        const usageRate = total > 0 ? Math.round((used / total) * 100) : 0;

        return { total, used, active, expired, usageRate };
    }, [customerCoupons]);

    // فیلتر کردن داده‌ها
    const filteredData = useMemo(() => {
        if (!customerCoupons) return [];

        let filtered = [...customerCoupons];

        // جستجو
        if (searchQuery) {
            filtered = filtered.filter(item =>
                item.FullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.mobile?.includes(searchQuery) ||
                item.KeyCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.title?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // فیلتر وضعیت
        if (statusFilter !== 'all') {
            filtered = filtered.filter(item => {
                switch (statusFilter) {
                    case 'used': return item.useDate;
                    case 'active': return !item.useDate && new Date(item.expiryDate) > new Date();
                    case 'expired': return !item.useDate && new Date(item.expiryDate) <= new Date();
                    default: return true;
                }
            });
        }

        return filtered;
    }, [customerCoupons, searchQuery, statusFilter]);

    // فرمت تاریخ فارسی
    const formatPersianDate = useCallback((dateString, showTime = false) => {
        if (!dateString) return '--';
        try {
            const date = new Date(dateString);
            const persianDate = new Intl.DateTimeFormat('fa-IR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(date);

            if (showTime) {
                const time = new Intl.DateTimeFormat('fa-IR', {
                    hour: '2-digit',
                    minute: '2-digit'
                }).format(date);
                return `${persianDate} - ${time}`;
            }

            return persianDate;
        } catch (error) {
            return '--';
        }
    }, []);

    // ستون‌های جدول
    const columns = useMemo(() => [
        {
            id: 'select',
            header: ({ table }) => (
                <input
                    type="checkbox"
                    checked={table.getIsAllRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                    className="h-4 w-4 rounded border-gray-300"
                />
            ),
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                    className="h-4 w-4 rounded border-gray-300"
                />
            ),
            size: 40,
        },
        {
            accessorKey: "id",
            header: () => (
                <div className="flex items-center gap-2">
                    <Key className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-xs text-slate-500">شناسه</span>
                </div>
            ),
            cell: ({ row }) => (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span className="font-mono text-xs bg-gradient-to-r from-slate-100 to-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                                #{row.getValue("id")}
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-xs">شناسه یکتا</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ),
            size: 80,
        },
        {
            id: "customer",
            header: () => (
                <div className="flex items-center gap-2">
                    <User className="h-3.5 w-3.5 text-blue-500" />
                    <span className="text-xs text-slate-500">مشتری</span>
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 border-2 border-blue-200 group-hover:scale-105 transition-transform">
                            <User className="h-6 w-6" />
                        </div>
                        <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                            <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                            {row.original.FullName}
                        </span>
                        <span className="font-mono text-xs text-slate-500 bg-slate-50 px-2 py-0.5 rounded">
                            {row.original.mobile}
                        </span>
                    </div>
                </div>
            ),
            size: 240,
        },
        {
            accessorKey: "title",
            header: () => (
                <div className="flex items-center gap-2">
                    <Gift className="h-3.5 w-3.5 text-purple-500" />
                    <span className="text-xs text-slate-500">عنوان کوپن</span>
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border border-purple-100 shadow-sm group hover:shadow-md transition-shadow">
                    <div className="relative">
                        <Gift className="h-4 w-4" />
                        <Sparkles className="h-2 w-2 absolute -top-1 -right-1 text-yellow-500 animate-pulse" />
                    </div>
                    <span className="text-sm font-bold">{row.getValue("title")}</span>
                    {row.original.discount && (
                        <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200">
                            {row.original.discount}% تخفیف
                        </Badge>
                    )}
                </div>
            ),
            size: 200,
        },
        {
            accessorKey: "KeyCode",
            header: () => (
                <div className="flex items-center gap-2">
                    <Shield className="h-3.5 w-3.5 text-amber-500" />
                    <span className="text-xs text-slate-500">کد کوپن</span>
                </div>
            ),
            cell: ({ row }) => (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="group relative">
                                <div className="font-mono text-sm font-bold text-slate-800 bg-gradient-to-r from-amber-50 to-yellow-50 px-4 py-2.5 rounded-xl border-2 border-amber-200 shadow-sm cursor-pointer hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                                    <div className="flex items-center gap-2">
                                        <Key className="h-3.5 w-3.5 text-amber-600" />
                                        <span>{row.getValue("KeyCode")}</span>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Zap className="h-3 w-3 text-amber-500 animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10 rounded-xl blur-sm"></div>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-xs">برای کپی کلیک کنید</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ),
            size: 180,
        },
        {
            id: "status",
            header: () => (
                <div className="flex items-center gap-2">
                    <Activity className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-xs text-slate-500">وضعیت</span>
                </div>
            ),
            cell: ({ row }) => {
                const isUsed = row.original.useDate;
                const isExpired = !isUsed && new Date(row.original.expiryDate) <= new Date();

                return (
                    <div className="flex flex-col gap-1">
                        {isUsed ? (
                            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 px-3 py-1 rounded-full">
                                <CheckCircle className="h-3 w-3 ml-1" />
                                استفاده شده
                            </Badge>
                        ) : isExpired ? (
                            <Badge className="bg-rose-500 hover:bg-rose-600 text-white border-0 px-3 py-1 rounded-full">
                                <XCircle className="h-3 w-3 ml-1" />
                                منقضی شده
                            </Badge>
                        ) : (
                            <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-0 px-3 py-1 rounded-full">
                                <Clock className="h-3 w-3 ml-1" />
                                فعال
                            </Badge>
                        )}
                        {!isUsed && row.original.expiryDate && (
                            <span className="text-[10px] text-slate-400">
                                تا {formatPersianDate(row.original.expiryDate)}
                            </span>
                        )}
                    </div>
                );
            },
            size: 140,
        },
        {
            accessorKey: "useDate",
            header: () => (
                <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-violet-500" />
                    <span className="text-xs text-slate-500">تاریخ استفاده</span>
                </div>
            ),
            cell: ({ row }) => {
                const dateStr = row.getValue("useDate");
                if (!dateStr) return (
                    <div className="flex items-center gap-2 text-slate-400">
                        <Clock className="h-3.5 w-3.5" />
                        <span className="text-xs">استفاده نشده</span>
                    </div>
                );

                return (
                    <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs">
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                            {formatPersianDate(dateStr)}
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">
                            {new Intl.DateTimeFormat('fa-IR', {
                                hour: '2-digit',
                                minute: '2-digit'
                            }).format(new Date(dateStr))}
                        </span>
                    </div>
                );
            },
            size: 150,
        },
        {
            id: "actions",
            header: "عملیات",
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" />
                            مشاهده جزئیات
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                            <BarChart3 className="h-4 w-4" />
                            آمار استفاده
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-rose-600">
                            <XCircle className="h-4 w-4" />
                            غیرفعال کردن
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
            size: 60,
        },
    ], [formatPersianDate]);

    // کارت‌های آمار
    const StatCard = ({ title, value, icon: Icon, color, change, description }) => (
        <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className={`absolute top-0 right-0 h-1 w-full ${color.bg}`}></div>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-600">{title}</CardTitle>
                    <div className={`p-2 rounded-lg ${color.light}`}>
                        <Icon className={`h-5 w-5 ${color.text}`} />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-slate-800">{value}</div>
                {change && (
                    <div className="flex items-center gap-1 mt-2">
                        <TrendingUp className="h-3 w-3 text-emerald-500" />
                        <span className="text-xs text-emerald-600 font-medium">{change}</span>
                    </div>
                )}
                {description && (
                    <p className="text-xs text-slate-400 mt-1">{description}</p>
                )}
            </CardContent>
        </Card>
    );

    if (loading && (!customerCoupons || customerCoupons.length === 0)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="text-center">
                    <div className="relative">
                        <Gift className="h-16 w-16 text-indigo-500 animate-bounce mx-auto" />
                        <Sparkles className="h-8 w-8 text-yellow-500 absolute -top-2 -right-2 animate-ping" />
                    </div>
                    <PageLoader message="در حال بارگذاری جوایز..." />
                </div>
            </div>
        );
    }

    return (
        <Layout>
            <Layout.Header>
                <Navbar links={TOP_NAV} />
                <div className='mr-auto flex items-center space-x-4 gap-5'>
                    <Search />
                    <UserNavbar />
                </div>
            </Layout.Header>

            <Layout.Body className="space-y-6">
                {/* هدر اصلی */}
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 rounded-[2.5rem] shadow-xl">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="h-16 w-16 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <Gift className="h-8 w-8 text-white" />
                                </div>
                                <Sparkles className="h-6 w-6 text-yellow-300 absolute -top-2 -right-2 animate-spin" />
                            </div>
                            <div>
                                <h1 className='text-2xl lg:text-3xl font-black text-white tracking-tight'>
                                    مدیریت کوپن‌ها
                                    <span className="ml-3 bg-white/20 text-white text-sm px-3 py-1 rounded-full font-mono backdrop-blur-sm">
                                        {stats?.total || 0} کوپن
                                    </span>
                                </h1>
                                <p className="text-sm text-white/80 font-medium mt-2">
                                    مدیریت هوشمند کوپن‌های اعطا شده به مشتریان
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button className="bg-white text-indigo-600 hover:bg-white/90 shadow-lg">
                                <Sparkles className="h-4 w-4 ml-2" />
                                ایجاد کوپن جدید
                            </Button>
                            <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                                <Download className="h-4 w-4 ml-2" />
                                خروجی گزارش
                            </Button>
                        </div>
                    </div>
                </div>

                {/* کارت‌های آمار */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="کل کوپن‌ها"
                        value={stats?.total || 0}
                        icon={Award}
                        color={STATS_COLORS.total}
                        change="+12% نسبت به ماه گذشته"
                    />
                    <StatCard
                        title="استفاده شده"
                        value={stats?.used || 0}
                        icon={CheckCircle}
                        color={STATS_COLORS.used}
                        description={`${stats?.usageRate || 0}% نرخ استفاده`}
                    />
                    <StatCard
                        title="فعال"
                        value={stats?.active || 0}
                        icon={Clock}
                        color={STATS_COLORS.active}
                        change="+5% نسبت به هفته گذشته"
                    />
                    <StatCard
                        title="منقضی شده"
                        value={stats?.expired || 0}
                        icon={XCircle}
                        color={STATS_COLORS.expired}
                        description={`${stats?.expired && stats?.total ? Math.round((stats.expired / stats.total) * 100) : 0}% از کل`}
                    />
                </div>

                {/* نوار پیشرفت */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-600">نرخ استفاده از کوپن‌ها</span>
                            <span className="text-sm font-bold text-emerald-600">{stats?.usageRate || 0}%</span>
                        </div>
                        <Progress value={stats?.usageRate || 0} className="h-2" />
                        <div className="flex justify-between text-xs text-slate-400 mt-2">
                            <span>0%</span>
                            <span>50%</span>
                            <span>100%</span>
                        </div>
                    </CardContent>
                </Card>

                {/* تب‌ها و فیلترها */}
                <Card className="rounded-[2rem] overflow-hidden border shadow-lg">
                    <div className="p-6 border-b">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50">
                                    <Activity className="h-5 w-5 text-indigo-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-800">سوابق کوپن‌ها</h2>
                                    <p className="text-sm text-slate-400">مدیریت و رصد کوپن‌های مشتریان</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                                <div className="relative flex-1 lg:flex-initial">
                                    <Input
                                        placeholder="جستجو در کوپن‌ها..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10"
                                    />
                                    <Filter className="h-4 w-4 text-slate-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                                </div>

                                <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full lg:w-auto">
                                    <TabsList className="grid grid-cols-4 w-full lg:w-auto">
                                        <TabsTrigger value="all" className="text-xs">
                                            همه
                                        </TabsTrigger>
                                        <TabsTrigger value="active" className="text-xs">
                                            فعال
                                        </TabsTrigger>
                                        <TabsTrigger value="used" className="text-xs">
                                            استفاده شده
                                        </TabsTrigger>
                                        <TabsTrigger value="expired" className="text-xs">
                                            منقضی
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>

                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm">
                                        <RefreshCw className="h-4 w-4 ml-2" />
                                        بروزرسانی
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="sm">
                                                <Download className="h-4 w-4 ml-2" />
                                                خروجی
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>خروجی Excel</DropdownMenuItem>
                                            <DropdownMenuItem>خروجی PDF</DropdownMenuItem>
                                            <DropdownMenuItem>خروجی CSV</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-1">
                        <DataTable
                            data={filteredData}
                            columns={columns}
                            loading={loading && customerCoupons?.length > 0}
                            enableRowSelection
                            onRowSelectionChange={setSelectedRows}
                            emptyStateMessage={
                                <div className="text-center py-16">
                                    <div className="relative inline-block">
                                        <Gift className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 animate-pulse"></div>
                                    </div>
                                    <p className="text-lg font-bold text-slate-500">هیچ کوپنی یافت نشد</p>
                                    <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
                                        با ایجاد کوپن جدید برای مشتریان، لیست کوپن‌ها اینجا نمایش داده می‌شود
                                    </p>
                                    <Button className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                                        <Sparkles className="h-4 w-4 ml-2" />
                                        ایجاد اولین کوپن
                                    </Button>
                                </div>
                            }
                            pagination
                            pageSize={10}
                            className="min-h-[500px]"
                            filters={[]}
                        />
                    </div>
                </Card>
            </Layout.Body>

            {/* فوتر */}
            <div className="mt-8 text-center text-sm text-slate-400">
                <div className="flex items-center justify-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>کلیه اطلاعات به صورت امن ذخیره شده است</span>
                </div>
                <p className="mt-1">آخرین بروزرسانی: {new Date().toLocaleDateString('fa-IR')}</p>
            </div>
        </Layout>
    );
}