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
    Sparkles
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

import { deletePrize, fetchPrizes } from '@/features/prize-shelf/prizeShelfActions';
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
        dispatch(fetchPrizes());
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

    const handleDeletePrize = async (id) => {
        const confirm = await MySwal.fire({
            title: 'آیا از حذف این جایزه مطمئن هستید؟',
            text: "این عمل قابل بازگشت نیست!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'بله، حذف شود!',
            cancelButtonText: 'لغو',
        });

        if (!confirm.isConfirmed) return;

        try {
            const resultAction = await dispatch(deletePrize({ Id: id }));

            if (resultAction.type === deletePrize.fulfilled.type) {
                toast.success('جایزه با موفقیت حذف شد');
                dispatch(fetchPrizes());
            } else {
                toast.error('خطا در حذف جایزه');
            }
        } catch (error) {
            toast.error(`خطا در حذف جایزه: ${error.message}`);
        }
    };



    const columns = [
        {
            accessorKey: "id",
            header: "ردیف",
            cell: ({ row }) => (
                <div className="font-mono font-bold text-primary">
                    #{row.getValue("id")}
                </div>
            ),
            size: 80,
        },
        {
            accessorKey: "title",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    className="text-right"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <Trophy className="ml-2 h-4 w-4" />
                    عنوان جایزه
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <p className="font-semibold text-foreground">{row.getValue("title")}</p>
                        {row.original.describe && (
                            <p className="text-xs text-muted-foreground line-clamp-1">
                                {row.original.describe.replace(/<[^>]*>/g, '')}
                            </p>
                        )}
                    </div>
                </div>
            ),
            size: 250,
        },
        {
            accessorKey: "active",
            header: "وضعیت",
            cell: ({ row }) => {
                const isActive = row.getValue("active");
                return (
                    <Badge
                        variant={isActive ? "default" : "destructive"}
                        className="gap-1"
                    >
                        {isActive ? (
                            <>
                                <CheckCircle className="h-3 w-3" />
                                فعال
                            </>
                        ) : (
                            <>
                                <XCircle className="h-3 w-3" />
                                غیرفعال
                            </>
                        )}
                    </Badge>
                );
            },
            size: 100,
        },
        {
            accessorKey: "minusScore",
            header: "امتیاز مورد نیاز",
            cell: ({ row }) => (
                <div className="flex items-center  gap-2">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span className="font-bold text-lg">{row.getValue("minusScore") || 0}</span>
                    <span className="text-sm text-muted-foreground">امتیاز</span>
                </div>
            ),
            size: 120,
        },
        {
            accessorKey: "dateRange",
            header: "بازه زمانی",
            cell: ({ row }) => (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="truncate">
                                    {new Date(row.original.sDate).toLocaleDateString('fa-IR')}
                                </span>
                                <span>تا</span>
                                <span className="truncate">
                                    {new Date(row.original.eDate).toLocaleDateString('fa-IR')}
                                </span>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>تاریخ شروع: {new Date(row.original.sDate).toLocaleDateString('fa-IR')}</p>
                            <p>تاریخ پایان: {new Date(row.original.eDate).toLocaleDateString('fa-IR')}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ),
            size: 200,
        },
        {
            accessorKey: "Persent",
            header: "درصد تخفیف",
            cell: ({ row }) => (
                <Badge variant="outline" className="bg-secondary/20">
                    {row.getValue("Persent") || 0}%
                </Badge>
            ),
            size: 100,
        },
        {
            id: "stats",
            header: "آمار",
            cell: ({ row }) => (
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="space-y-1">
                        <p className="text-muted-foreground">حداقل خرید</p>
                        <p className="font-semibold">{row.original.minBuy || '-'}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-muted-foreground">حداکثر خرید</p>
                        <p className="font-semibold">{row.original.maxBuy || '-'}</p>
                    </div>
                </div>
            ),
            size: 150,
        },
        {
            id: "actions",
            enableHiding: false,
            header: "عملیات",
            cell: ({ row }) => {
                const prize = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-primary/10">
                                <span className="sr-only">بازکردن منو</span>
                                <MoreHorizontalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-48">
                            <DropdownMenuLabel className="flex items-center gap-2">
                                <Trophy className="h-4 w-4" />
                                عملیات‌ها
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link to={`edit/${prize.id}`} className="cursor-pointer">
                                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    ویرایش جایزه
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(prize.title)}
                                className="cursor-pointer"
                            >
                                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                کپی عنوان
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive"
                                onClick={() => handleDeletePrize(prize.id)}
                            >
                                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                حذف جایزه
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
            size: 80,
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
                                    placeholder: "جستجو بر اساس عنوان..."
                                },
                                {
                                    value: "active",
                                    placeholder: "فیلتر بر اساس وضعیت",
                                    type: "select",
                                    options: [
                                        { label: "فعال", value: "true" },
                                        { label: "غیرفعال", value: "false" }
                                    ]
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