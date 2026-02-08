import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    ArrowUpDown, History, Zap, Target, Clock,
    ShieldCheck, Edit3, Search as SearchIcon,
    TrendingDown, Gem, Award, Medal, Star,
    User,
    Sparkles,
    Crown
} from 'lucide-react';

import Layout from '../layout/Layout';
import { UserNavbar } from '@/components/UserNavbar';
import { Search } from '@/components/Search';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/button';
import { DataTable } from '@/components/common/DataTable';
import { Badge } from '@/components/ui/badge';
import { PageLoader } from '@/components/common/Loading';
import { fetchScenarios } from '@/features/forgot-scenario/forgotScenarioActions';

const topNav = [
    { title: 'خانه', href: 'dashboard/overview', isActive: false },
    { title: 'مشتریان', href: 'dashboard/customers', isActive: false },
    { title: 'سناریوها', href: 'dashboard/forget-scenario', isActive: true },
    { title: 'تنظیمات', href: 'dashboard/settings', isActive: false },
];

export default function ForgetScenario() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, scenarios } = useSelector((state) => state.forgotScenario);

    useEffect(() => {
        dispatch(fetchScenarios());
    }, [dispatch]);

    // تبدیل دیتای تک‌خطی API به آرایه برای جدول
    const transformedData = useMemo(() => {
        if (!scenarios || scenarios.length === 0) return [];
        const s = scenarios[0];


        const levels = [
            {
                id: 0,
                label: "عادی",
                prefix: "SF0",
                icon: <User className="h-4 w-4" />,
                color: "text-gray-500",
                bg: "bg-gray-50",
            },
            {
                id: 1,
                label: "برنزی",
                prefix: "SF1",
                icon: <Award className="h-4 w-4" />,
                color: "text-orange-600",
                bg: "bg-orange-50",
            },
            {
                id: 2,
                label: "نقره‌ای",
                prefix: "SF2",
                icon: <Medal className="h-4 w-4" />,
                color: "text-slate-500",
                bg: "bg-slate-50",
            },
            {
                id: 3,
                label: "طلایی",
                prefix: "SF3",
                icon: <Crown className="h-4 w-4" />,
                color: "text-amber-500",
                bg: "bg-amber-50",
            },
            {
                id: 4,
                label: "ویژه",
                prefix: "SF4",
                icon: <Sparkles className="h-4 w-4" />,
                color: "text-indigo-600",
                bg: "bg-indigo-50",
            },
        ];


        return levels.map(lvl => ({
            id: lvl.id,
            levelTitle: lvl.label,
            icon: lvl.icon,
            color: lvl.color,
            bg: lvl.bg,
            day: s[`${lvl.prefix}_Day`],
            percent: s[`${lvl.prefix}_Persent`],
            amount: s[`${lvl.prefix}_Amount`],
            minBuy: s[`${lvl.prefix}_minBuy`],
            maxBuy: s[`${lvl.prefix}_maxBuy`],
            expire: s[`${lvl.prefix}_ExpireDayCount`],
        }));
    }, [scenarios]);

    const columns = [
        {
            accessorKey: "id",
            header: "ردیف",
            cell: ({ row }) => <div className="font-mono font-black opacity-30">0{row.getValue("id") + 1}</div>,
            size: 50,
        },
        {
            accessorKey: "levelTitle",
            header: "سطح سناریو",
            cell: ({ row }) => (
                <div className={`flex items-center gap-3 px-3 py-1.5 rounded-xl ${row.original.bg} ${row.original.color} border border-current/10 w-fit`}>
                    {row.original.icon}
                    <span className="font-black text-sm">{row.getValue("levelTitle")}</span>
                </div>
            ),
            size: 180,
        },
        {
            accessorKey: "day",
            header: "روزهای عدم خرید",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <History className="h-4 w-4 text-rose-500" />
                    <span className="font-bold">{row.getValue("day")}</span>
                    <span className="text-xs text-muted-foreground font-medium">روز</span>
                </div>
            ),
        },
        {
            id: "discount",
            header: "هدیه بازگشت",
            cell: ({ row }) => {
                const p = row.original.percent;
                const a = row.original.amount;
                return (
                    <div className="font-black">
                        {p > 0 ? (
                            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white gap-1">
                                <Zap className="h-3 w-3 fill-white" />
                                {p}% تخفیف
                            </Badge>
                        ) : (
                            <div className="text-emerald-600 text-sm">
                                {a?.toLocaleString()} <span className="text-[10px]">تومان</span>
                            </div>
                        )}
                    </div>
                );
            },
        },
        {
            id: "purchaseLimits",
            header: "محدودیت‌های خرید",
            cell: ({ row }) => (
                <div className="flex flex-col gap-1 text-[11px] font-bold">
                    <div className="flex items-center gap-1.5">
                        <div className="h-1 w-1 rounded-full bg-slate-400" />
                        <span className="text-muted-foreground">حداقل خرید:</span>
                        <span>{row.original.minBuy?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 border-t border-slate-100 pt-1">
                        <div className="h-1 w-1 rounded-full bg-slate-400" />
                        <span className="text-muted-foreground">حداکثر تخفیف:</span>
                        <span>{row.original.maxBuy?.toLocaleString()}</span>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "expire",
            header: "انقضای هدیه",
            cell: ({ row }) => (
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg w-fit">
                    <Clock className="h-3 w-3" />
                    {row.getValue("expire") || 0} روز پس از صدور
                </div>
            ),
        },
    ];

    if (loading) return <PageLoader />;

    return (
        <Layout>
            <Layout.Header>
                <Navbar links={topNav} />
                <div className='mr-auto flex items-center space-x-4 gap-5'>
                    <Search />
                    <UserNavbar />
                </div>
            </Layout.Header>

            <Layout.Body className="space-y-6">
                {/* Header Section */}
                <div className="relative overflow-hidden bg-white p-6 rounded-3xl border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />

                    <div className="flex items-center gap-4 relative">
                        <div className="bg-rose-50 p-3 rounded-2xl text-rose-500 shadow-inner">
                            <TrendingDown className="h-8 w-8" />
                        </div>
                        <div>
                            <h1 className='text-2xl font-black text-slate-800 tracking-tight'>سناریوهای فراموشی</h1>
                            <p className="text-sm text-slate-400 font-medium">تنظیمات بازگرداندن مشتریان بر اساس روزهای عدم خرید</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden lg:flex flex-col items-end ml-4 border-l pl-4">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">آخرین بروزرسانی</span>
                            <span className="text-xs font-black italic">۲۰۲۳-۰۹-۱۰</span>
                        </div>
                        <Button
                            className='px-8 h-12 rounded-2xl bg-slate-900 hover:bg-slate-800 gap-2 shadow-xl shadow-slate-200 transition-all active:scale-95 font-bold'
                            onClick={() => navigate("edit")}
                        >
                            <Edit3 className="h-4 w-4" />
                            مدیریت و ویرایش سناریو
                        </Button>
                    </div>
                </div>

                {/* Main Content (DataTable) */}
                <div className="bg-white rounded-[32px] border shadow-2xl shadow-slate-200/50 p-6 overflow-hidden transition-all hover:shadow-primary/5">
                    <DataTable
                        data={transformedData}
                        columns={columns}
                        filters={[{ value: "levelTitle", placeholder: "جستجوی سطح..." }]}
                    />
                </div>

                {/* Info Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex items-center gap-3">
                        <ShieldCheck className="h-5 w-5 text-blue-500" />
                        <span className="text-xs font-bold text-blue-700 leading-snug">سناریوها به صورت خودکار با سیستم وفاداری مشتریان هماهنگ هستند.</span>
                    </div>
                </div>
            </Layout.Body>
        </Layout>
    );
}