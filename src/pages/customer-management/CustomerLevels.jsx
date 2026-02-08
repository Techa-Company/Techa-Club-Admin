import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Trophy, Star, Medal, Award, User,
    Settings2, TrendingUp, ArrowLeftRight,
    ShieldCheck, Crown
} from 'lucide-react';

import Layout from '../layout/Layout';
import { UserNavbar } from '@/components/UserNavbar';
import { Search } from '@/components/Search';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/button';
import { DataTable } from '@/components/common/DataTable';
import { PageLoader } from '@/components/common/Loading';
import { fetchLevels } from '@/features/customer-level/customerLevelActions';

const topNav = [
    { title: 'خانه', href: 'dashboard/overview', isActive: false },
    { title: 'مشتریان', href: 'dashboard/customers', isActive: false },
    { title: 'سطح‌بندی', href: 'dashboard/levels', isActive: true },
    { title: 'تنظیمات', href: 'dashboard/settings', isActive: false },
];

// دیتای پیش‌فرض برای زمانی که API هنوز لود نشده یا خالی است
const defaultData = [
    { id: 1, title: "عادی", from: 0, to: 10000 },
    { id: 2, title: "برنزی", from: 10000, to: 500000 },
    { id: 3, title: "نقره ای", from: 500000, to: 1000000 },
    { id: 4, title: "طلایی", from: 1000000, to: 5000000 },
    { id: 5, title: "ویژه", from: 5000000, to: 10000000 },
];

export default function CustomerLevels() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // دریافت دیتا از استور
    const { loading, levels } = useSelector((state) => state.customerLevel);

    useEffect(() => {
        dispatch(fetchLevels());
    }, [dispatch]);

    // انتخاب دیتا (اگر از سرور بیاید یا دیتای پیش‌فرض)
    const tableData = useMemo(() => {
        if (!levels || levels.length === 0) return defaultData;

        const item = levels[0]; // چون فقط یک رکورد تنظیمات داری

        return [
            { id: 1, title: "عادی", from: 0, to: item.boronzi },
            { id: 2, title: "برنزی", from: item.boronzi, to: item.nogrei },
            { id: 3, title: "نقره ای", from: item.nogrei, to: item.talaei },
            { id: 4, title: "طلایی", from: item.talaei, to: item.vige },
            { id: 5, title: "ویژه", from: item.vige, to: Infinity },
        ];
    }, [levels]);


    const levelConfig = {
        "عادی": { color: "text-slate-500", bg: "bg-slate-50", icon: <User className="h-4 w-4" /> },
        "برنزی": { color: "text-orange-600", bg: "bg-orange-50", icon: <Award className="h-4 w-4" /> },
        "نقره ای": { color: "text-zinc-500", bg: "bg-zinc-50", icon: <Medal className="h-4 w-4" /> },
        "طلایی": { color: "text-amber-500", bg: "bg-amber-50", icon: <Star className="h-4 w-4" /> },
        "ویژه": { color: "text-purple-600", bg: "bg-purple-50", icon: <Crown className="h-4 w-4" /> },
    };

    const columns = [
        {
            accessorKey: "id",
            header: "رتبه",
            cell: ({ row }) => <div className="font-mono font-black text-slate-300">#0{row.index + 1}</div>,
            size: 80,
        },
        {
            accessorKey: "title",
            header: "عنوان سطح",
            cell: ({ row }) => {
                const title = row.getValue("title");
                const config = levelConfig[title] || levelConfig["عادی"];
                return (
                    <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl border ${config.bg} ${config.color} border-current/10 w-fit`}>
                        {config.icon}
                        <span className="font-black text-sm">{title}</span>
                    </div>
                );
            },
            size: 200,
        },
        {
            accessorKey: "from",
            header: "حداقل خرید (از)",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-mono font-bold text-slate-700">
                        {Number(row.getValue("from")).toLocaleString()}
                    </span>
                    <span className="text-[10px] text-muted-foreground">تومان</span>
                </div>
            ),
        },
        {
            accessorKey: "to",
            header: "حداکثر خرید (تا)",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-mono font-bold text-slate-700">
                        {Number(row.getValue("to")).toLocaleString()}
                    </span>
                    <span className="text-[10px] text-muted-foreground">تومان</span>
                </div>
            ),
        },
        {
            id: "logic",
            header: "وضعیت زنجیره",
            cell: ({ row }) => (
                <div className="flex items-center gap-2 text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full w-fit">
                    <ShieldCheck className="h-3 w-3" />
                    <span className="text-[10px] font-bold italic">پیوسته</span>
                </div>
            ),
        }
    ];

    if (loading && (!levels || levels.length === 0)) return <PageLoader />;

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
                <div className="bg-white p-6 rounded-[2.5rem] border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-right" dir="rtl">
                    <div className="flex items-center gap-4">
                        <div className="bg-amber-50 p-4 rounded-[2rem] text-amber-500 shadow-inner">
                            <Trophy className="h-8 w-8" />
                        </div>
                        <div>
                            <h1 className='text-2xl font-black text-slate-800 tracking-tight'>سطح‌بندی مشتریان</h1>
                            <p className="text-sm text-slate-400 font-medium">مدیریت بازه‌های خرید برای ارتقای خودکار سطح مشتری</p>
                        </div>
                    </div>

                    <Button
                        onClick={() => navigate("edit")}
                        className="bg-slate-900 hover:bg-slate-800 text-white rounded-2xl px-10 h-12 gap-2 font-bold shadow-xl shadow-slate-200 transition-all active:scale-95"
                    >
                        <Settings2 className="h-4 w-4" />
                        ویرایش سطوح
                    </Button>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-[3rem] border shadow-2xl shadow-slate-200/50 p-8 overflow-hidden">
                    <div className="flex items-center gap-2 mb-6 text-slate-400" dir="rtl">
                        <ArrowLeftRight className="h-4 w-4 text-primary" />
                        <span className="text-xs font-black uppercase tracking-widest leading-none">
                            ترتیب منطقی: حداقل هر سطح برابر با حداکثر سطح قبلی است
                        </span>
                    </div>

                    <DataTable
                        data={tableData}
                        columns={columns}
                        filters={[]}
                    />
                </div>
            </Layout.Body>
        </Layout>
    );
}