import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
    ArrowUpDown, Trophy, Calendar, CheckCircle, XCircle,
    Sparkles, Building2, Info, Tag, Edit3, Power,
    Ticket, Zap, ShieldCheck, Clock
} from 'lucide-react';

import Layout from '../layout/Layout';
import { UserNavbar } from '@/components/UserNavbar';
import { Search } from '@/components/Search';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/button';
import { DataTable } from '@/components/common/DataTable';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { createAndUpdateCoupon, fetchCoupons } from '@/features/coupon/couponActions';
import { PageLoader, LoadingSpinner } from '@/components/common/Loading';

const topNav = [
    { title: 'خانه', href: 'dashboard/overview', isActive: false },
    { title: 'مشتریان', href: 'dashboard/customers', isActive: false },
    { title: 'کد تخفیف', href: 'dashboard/coupons', isActive: true },
    { title: 'تنظیمات', href: 'dashboard/settings', isActive: false },
];

export default function Coupons() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, coupons, error } = useSelector(state => state.coupon);

    useEffect(() => {
        dispatch(fetchCoupons({ "_Business": 3 }));
    }, [dispatch]);

    // تفکیک داده‌ها بر اساس وضعیت برای تب‌ها
    const categorizedData = useMemo(() => {
        const now = new Date();
        return {
            active: coupons.filter(c => c.active && (!c.eDate || new Date(c.eDate) > now)),
            expired: coupons.filter(c => c.eDate && new Date(c.eDate) < now),
            all: coupons
        };
    }, [coupons]);


    const handleCouponStatus = async (coupon) => {
        const payload = {};
        if (!coupon) return;
        const excludedFields = ['BusinessName', 'savedate', 'CouponTitle', 'icon'];

        Object.keys(coupon).forEach(key => {
            const value = coupon[key];

            if (
                !excludedFields.includes(key) &&
                value !== null &&
                value !== undefined &&
                value !== ''
            ) {
                payload[key] = value;
            }
        });
        payload.active = !payload.active
        console.log("Clean Payload for Server:", payload);

        try {
            const resultAction = await dispatch(createAndUpdateCoupon(payload));

            if (createAndUpdateCoupon.fulfilled.match(resultAction)) {
                toast.success('عملیات با موفقیت انجام شد');
                dispatch(fetchCoupons({ "_Business": 3 }));
            }
        } catch (error) {
            toast.error(`خطا در ویرایش وضعیت تخفیف: ${error.message}`);
        }
    };

    const columns = [
        {
            id: "rowIndex",
            header: "ردیف",
            cell: ({ row }) => (
                <div className="flex justify-center">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500 border border-slate-200">
                        {row.index + 1}
                    </span>
                </div>
            ),
            size: 60,
        },
        {
            accessorKey: "title",
            header: "اطلاعات کوپن",
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border bg-white shadow-sm">
                        {row.original.icon ? (
                            <img src={row.original.icon} alt="icon" className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-slate-50">
                                <Ticket className="h-6 w-6 text-slate-300" />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-sm text-slate-800 leading-none mb-1">
                            {row.getValue("title")}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                            <Building2 className="h-3 w-3" />
                            {row.original.BusinessName}
                        </div>
                    </div>
                </div>
            ),
            size: 250,
        },
        {
            accessorKey: "CouponTitle",
            header: "نوع",
            cell: ({ row }) => (
                <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100">
                    <Tag className="h-3 w-3 ml-1" />
                    {row.original.CouponTitle || "تخفیف عمومی"}
                </Badge>
            ),
        },
        {
            id: "value",
            header: "ارزش تخفیف",
            cell: ({ row }) => {
                const p = row.original.Persent;
                const a = row.original.Amount;
                return (
                    <div className="flex flex-col items-start">
                        {p ? (
                            <div className="flex items-center gap-1 text-emerald-600 font-black text-lg">
                                <Zap className="h-4 w-4 fill-emerald-500" />
                                %{p}
                            </div>
                        ) : a ? (
                            <div className="text-sm font-bold text-blue-600">
                                {a.toLocaleString()} <span className="text-[10px] opacity-70">تومان</span>
                            </div>
                        ) : <span className="text-slate-300">---</span>}
                    </div>
                );
            },
        },
        {
            id: "limits",
            header: "قوانین خرید",
            cell: ({ row }) => (
                <div className="flex flex-col gap-1 border-r-2 border-slate-100 pr-3">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400">حداقل:</span>
                        <span className="text-xs font-bold text-slate-700">{(row.original.minBuy || 0).toLocaleString()}</span>
                    </div>
                    {row.original.maxBuy > 0 && (
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-slate-400">سقف:</span>
                            <span className="text-xs font-bold text-slate-700">{(row.original.maxBuy).toLocaleString()}</span>
                        </div>
                    )}
                </div>
            ),
        },
        {
            id: "dateRange",
            header: "اعتبار",
            cell: ({ row }) => (
                <div className="flex flex-col text-[11px] font-medium text-slate-500 leading-tight">
                    <div className="flex items-center gap-1 text-emerald-600">
                        <Clock className="h-3 w-3" />
                        {row.original.sDate ? new Date(row.original.sDate).toLocaleDateString("fa-IR") : 'نامحدود'}
                    </div>
                    <div className="flex items-center gap-1 text-rose-500 mt-1">
                        <Calendar className="h-3 w-3" />
                        {row.original.eDate ? new Date(row.original.eDate).toLocaleDateString("fa-IR") : 'بدون انقضا'}
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "active",
            header: "وضعیت",
            cell: ({ row }) => {
                const isActive = row.getValue("active");
                return (
                    <Badge className={`rounded-full border-none px-3 py-1 ${isActive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                        <div className={`ml-1.5 h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
                        {isActive ? "فعال" : "غیرفعال"}
                    </Badge>
                );
            },
        },
        {
            id: "actions",
            header: "عملیات",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                    <Link to={`edit/${row.original.id}`}><Edit3 className="h-4 w-4" /></Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>ویرایش کد</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors"
                                    onClick={() => handleCouponStatus(row.original)}
                                >
                                    <Power className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>تغییر وضعیت</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            ),
        },
    ];

    if (loading && coupons.length === 0) return <PageLoader />;

    return (
        <Layout>
            <Layout.Header>
                <Navbar links={topNav} />
                <div className='mr-auto flex items-center space-x-4 gap-5 text-right'>
                    <Search />
                    <UserNavbar />
                </div>
            </Layout.Header>

            <Layout.Body className="space-y-6">
                <Tabs defaultValue="active" className="w-full space-y-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-xl text-primary">
                                <Ticket className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-xl font-black text-slate-800">کدهای تخفیف</h1>
                                <p className="text-xs text-slate-400 font-medium">مدیریت و نظارت بر کدهای تخفیف بیزنس</p>
                            </div>
                        </div>

                        <TabsList className="bg-slate-100/50 border p-1 h-12 rounded-xl">
                            <TabsTrigger value="active" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                <ShieldCheck className="h-4 w-4 ml-2" /> فعال
                            </TabsTrigger>
                            <TabsTrigger value="expired" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                <Clock className="h-4 w-4 ml-2" /> منقضی شده
                            </TabsTrigger>
                            <TabsTrigger value="all" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                لیست کل
                            </TabsTrigger>
                        </TabsList>

                        <Button onClick={() => navigate("new")} className="gap-2 bg-primary hover:bg-primary/90 rounded-xl px-6 shadow-lg shadow-primary/20 transition-all">
                            <Sparkles className="h-4 w-4" />
                            ایجاد کد جدید
                        </Button>
                    </div>

                    <TabsContent value="active" className="m-0 border-none outline-none ">
                        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden p-5">
                            <DataTable data={categorizedData.active} columns={columns} filters={[{ value: "title", placeholder: "عنوان" }]} />
                        </div>
                    </TabsContent>

                    <TabsContent value="expired" className="m-0 border-none outline-none">
                        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden p-5">
                            <DataTable data={categorizedData.expired} columns={columns} filters={[{ value: "title", placeholder: "عنوان" }]} />
                        </div>
                    </TabsContent>

                    <TabsContent value="all" className="m-0 border-none outline-none">
                        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden p-5">
                            <DataTable data={categorizedData.all} columns={columns} filters={[{ value: "title", placeholder: "عنوان" }]} />
                        </div>
                    </TabsContent>
                </Tabs>
            </Layout.Body>
        </Layout>
    );
}