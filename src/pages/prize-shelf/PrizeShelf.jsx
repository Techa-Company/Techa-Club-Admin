// PrizeShelf.jsx
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
    ArrowUpDown,
    MoreHorizontalIcon,
    Trophy,
    Calendar,
    Award,
    Clock,
    CheckCircle,
    XCircle,
    Sparkles,
    Building2,
    Info,
    Tag,
    Edit3,
    Power
} from 'lucide-react';

import Layout from '../layout/Layout';
import { UserNavbar } from '@/components/UserNavbar';
import { Search } from '@/components/Search';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/button';
import { DataTable } from '@/components/common/DataTable';
import { CheckPrize } from './components/CheckPrize';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { createAndUpdatePrize, deletePrize, fetchPrizes } from '@/features/prize-shelf/prizeShelfActions';
import { LoadingSpinner, PageLoader } from '@/components/common/Loading';
import { toast } from 'react-toastify';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';


const topNav = [
    {
        title: 'خانه',
        href: 'dashboard/overview',
        isActive: true,
    },
    {
        title: 'مشتریان',
        href: 'dashboard/customers',
        isActive: false,
    },
    {
        title: 'محصولات',
        href: 'dashboard/products',
        isActive: false,
    },
    {
        title: 'جایزه‌ها',
        href: 'dashboard/prizes',
        isActive: true,
    },
    {
        title: 'تنظیمات',
        href: 'dashboard/settings',
        isActive: false,
    },
];

export default function PrizeShelf() {


    const MySwal = withReactContent(Swal);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, prizes, error } = useSelector(state => state.prizeShelf);

    useEffect(() => {
        dispatch(fetchPrizes({ "_Business": 3 }));
    }, [dispatch]);



    const formattedData = useMemo(() => {
        return prizes.map(prize => ({
            ...prize,
            dateRange: `${prize.sDate} - ${prize.eDate}`
        }));
    }, [prizes]);

    if (loading && prizes.length === 0) {
        return <PageLoader />;
    }

    const handlePrizeStatus = async (prize) => {
        const payload = {};
        if (!prize) return;
        const excludedFields = ['BusinessName', 'TypePrizeTitle', 'savedate', 'TypePrizeTitle', 'dateRange'];

        Object.keys(prize).forEach(key => {
            const value = prize[key];

            // شرط: فیلد در لیست ممنوعه نباشد و مقدارش خالی/نال نباشد
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
            const resultAction = await dispatch(createAndUpdatePrize(payload));

            if (createAndUpdatePrize.fulfilled.match(resultAction)) {
                toast.success('عملیات با موفقیت انجام شد');
                dispatch(fetchPrizes({ "_Business": 3 }));
            }
        } catch (error) {
            toast.error(`خطا در ویرایش وضعیت جایزه: ${error.message}`);
        }
    };






    const columns = [
        {
            id: "rowIndex",
            header: "ردیف",
            cell: ({ row }) => (
                <div className="flex justify-center">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary/50 text-xs font-bold text-muted-foreground border border-border/50">
                        {row.index + 1}
                    </span>
                </div>
            ),
            size: 60,
        },
        {
            accessorKey: "BusinessName",
            header: "کسب‌وکار",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-blue-50 text-blue-600">
                        <Building2 className="h-4 w-4" />
                    </div>
                    <span className="font-semibold text-sm tracking-tight text-foreground/80">
                        {row.getValue("BusinessName")}
                    </span>
                </div>
            ),
            size: 160,
        },
        {
            accessorKey: "title",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    className="p-0 hover:bg-transparent font-bold text-foreground"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    عنوان جایزه
                    <ArrowUpDown className="mr-2 h-3 w-3 text-muted-foreground" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/40 to-secondary/40 blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                        <div className="relative h-10 w-10 rounded-xl bg-background border shadow-sm flex items-center justify-center">
                            <Trophy className="h-5 w-5 text-primary" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-sm text-foreground leading-none mb-1">
                            {row.getValue("title")}
                        </span>
                        {row.original.describe && (
                            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                <Info className="h-3 w-3" />
                                <span className="line-clamp-1 italic">
                                    {row.original.describe.replace(/<[^>]*>/g, "")}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            ),
            size: 220,
        },
        {
            accessorKey: "TypePrizeTitle",
            header: "نوع",
            cell: ({ row }) => (
                <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100">
                    <Tag className="h-3 w-3 ml-1" />
                    {row.original.TypePrizeTitle || "نامشخص"}
                </Badge>
            ),
        },
        {
            accessorKey: "minusScore",
            header: "امتیاز",
            cell: ({ row }) => (
                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-amber-50 border border-amber-100">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-black text-amber-700 tabular-nums">
                        {row.getValue("minusScore") ?? 0}
                    </span>
                </div>
            ),
            size: 100,
        },
        {
            id: "purchaseLimits", // <--- ستون جدید اینجاست
            header: "محدودیت خرید",
            cell: ({ row }) => {
                const min = row.original.minBuy;
                const max = row.original.maxBuy;
                return (
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                            <span className="text-[10px] text-muted-foreground w-8">حداقل:</span>
                            <span className="text-[11px] font-bold tabular-nums">
                                {min ? `${min.toLocaleString()}` : "—"}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 border-t border-border/40 pt-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                            <span className="text-[10px] text-muted-foreground w-8">حداکثر:</span>
                            <span className="text-[11px] font-bold tabular-nums">
                                {max ? `${max.toLocaleString()}` : "—"}
                            </span>
                        </div>
                    </div>
                );
            },
            size: 140,
        },
        {
            id: "discount",
            header: "ارزش جایزه",
            cell: ({ row }) => {
                const percent = row.original.Persent;
                const amount = row.original.Amount;
                return (
                    <div className="font-bold text-emerald-600 tracking-tight">
                        {percent ? (
                            <span className="text-lg">%{percent}</span>
                        ) : amount ? (
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-sm">{amount.toLocaleString()}</span>
                                <span className="text-[10px] opacity-70">تومان</span>
                            </div>
                        ) : (
                            <span className="text-muted-foreground opacity-30">—</span>
                        )}
                    </div>
                );
            },
            size: 110,
        },
        {
            id: "dateRange",
            header: "اعتبار",
            cell: ({ row }) => (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="flex items-center gap-2 cursor-help group">
                                <div className="h-2 w-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                                <div className="flex flex-col text-[12px] font-medium text-muted-foreground leading-tight">
                                    <span>{new Date(row.original.sDate).toLocaleDateString("fa-IR")}</span>
                                    <span className="border-t border-border/40 mt-1">{new Date(row.original.eDate).toLocaleDateString("fa-IR")}</span>
                                </div>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="top">بازه زمانی فعال بودن جایزه</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ),
            size: 130,
        },
        {
            accessorKey: "active",
            header: "وضعیت",
            cell: ({ row }) => {
                const isActive = row.getValue("active");
                return (
                    <Badge
                        className={`rounded-full px-3 py-0.5 border-none ${isActive
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                            }`}
                    >
                        <span className={`ml-1.5 h-1.5 w-1.5 rounded-full animate-pulse ${isActive ? "bg-emerald-500" : "bg-rose-500"}`} />
                        {isActive ? "فعال" : "غیرفعال"}
                    </Badge>
                );
            },
            size: 100,
        },
        {
            id: "actions",
            header: "عملیات",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary" asChild>
                        <Link to={`edit/${row.original.id}`}>
                            <Edit3 className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        className={`h-8 w-8 rounded-full ${row.original.active ? "hover:text-rose-600" : "hover:text-emerald-600"}`}
                        onClick={() => handlePrizeStatus(row.original)}
                    >
                        <Power className="h-4 w-4" />
                    </Button>
                </div>
            ),
            size: 100,
        },
    ];


    return (
        <Layout>
            {/* ===== Top Heading ===== */}
            <Layout.Header>
                <Navbar links={topNav} />
                <div className='mr-auto flex items-center space-x-4 gap-5'>
                    <Search />
                    <UserNavbar />
                </div>
            </Layout.Header>

            {/* ===== Main ===== */}
            <Layout.Body>

                {/* Action Bar */}
                <div className='mb-6 p-4 bg-card rounded-xl border shadow-sm'>
                    <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
                        <div className="flex items-center gap-2">
                            <h2 className='text-xl font-semibold'>لیست جایزه‌ها</h2>
                            {loading && prizes.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <LoadingSpinner size="sm" />
                                    <span className="text-sm text-muted-foreground">در حال بروزرسانی...</span>
                                </div>
                            )}
                        </div>
                        <div className='flex items-center gap-3 flex-wrap'>
                            <CheckPrize />
                            <Button
                                onClick={() => navigate("new")}
                                className="gap-2 bg-primary hover:opacity-90 transition-all"
                            >
                                <Trophy className="h-4 w-4" />
                                ایجاد جایزه جدید
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <div className="flex items-center gap-3 text-destructive">
                            <XCircle className="h-5 w-5" />
                            <div>
                                <p className="font-semibold">خطا در بارگذاری داده‌ها</p>
                                <p className="text-sm">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Data Table */}
                <div className="relative">
                    {loading && prizes.length === 0 ? (
                        <div className="h-64 flex items-center justify-center">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <DataTable
                            data={formattedData}
                            columns={columns}
                            filters={[
                                {
                                    value: "title",
                                    placeholder: "عنوان"
                                }

                            ]}
                            initialState={{
                                sorting: [{ id: "id", desc: true }]
                            }}
                            className="border rounded-xl overflow-hidden shadow-sm"
                        />
                    )}
                </div>

                {/* Empty State */}
                {!loading && prizes.length === 0 && (
                    <div className="h-64 flex flex-col items-center justify-center text-center p-8">
                        <div className="h-20 w-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                            <Trophy className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">هیچ جایزه‌ای وجود ندارد</h3>
                        <p className="text-muted-foreground mb-6">
                            هنوز جایزه‌ای ایجاد نکرده‌اید. اولین جایزه خود را ایجاد کنید!
                        </p>
                        <Button
                            onClick={() => navigate("new")}
                            className="gap-2"
                        >
                            <Trophy className="h-4 w-4" />
                            ایجاد اولین جایزه
                        </Button>
                    </div>
                )}
            </Layout.Body>
        </Layout>
    );
}