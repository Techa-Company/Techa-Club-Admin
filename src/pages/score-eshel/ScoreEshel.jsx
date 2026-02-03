// ScoreShelf.jsx
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
    ArrowUpDown,
    MoreHorizontalIcon,
    Coins,
    Trophy,
    UserPlus,
    Users,
    UserCheck,
    Send,
    Calendar,
    XCircle,
    PlusCircle,
    ShoppingBag
} from 'lucide-react';

import Layout from '../layout/Layout';
import { UserNavbar } from '@/components/UserNavbar';
import { Search } from '@/components/Search';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/button';
import { DataTable } from '@/components/common/DataTable';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// مسیرهای اکشن‌ها را بر اساس پروژه خود تنظیم کنید
import { LoadingSpinner, PageLoader } from '@/components/common/Loading';
import { toast } from 'react-toastify';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { fetchScores } from '@/features/score-eshel/scoreEshelActions';

const topNav = [
    { title: 'خانه', href: 'dashboard/overview', isActive: false },
    { title: 'مشتریان', href: 'dashboard/customers', isActive: false },
    { title: 'محصولات', href: 'dashboard/products', isActive: false },
    { title: 'جایزه‌ها', href: 'dashboard/prizes', isActive: false },
    { title: 'قوانین امتیاز', href: 'dashboard/scores', isActive: true },
    { title: 'تنظیمات', href: 'dashboard/settings', isActive: false },
];

export default function ScoreShelf() {
    const MySwal = withReactContent(Swal);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // فرض بر این است که state ریداکس شما اینگونه است
    const { loading, scores, error } = useSelector(state => state.scoreEshel || { loading: false, scores: [], error: null });

    useEffect(() => {
        dispatch(fetchScores());
    }, [dispatch]);

    const formattedData = useMemo(() => {
        // دیتای نمونه شما برای نمایش (اگر دیتای واقعی هنوز نیامده)
        const rawData = scores.length > 0 ? scores : [
            { id: 3, _Business: 46, ScoreBuy: 10000, ScoreBuyOne: 30, ScoreRegisterFriend: 20, ScoreBuyFriend: null, ScoreFullProfile: 10, ScoreEitaa: 25, savedate: "2024-08-26T21:08:06.043" },
            { id: 2, _Business: 3, ScoreBuy: 101000, ScoreBuyOne: 40, ScoreRegisterFriend: 20, ScoreBuyFriend: 50000, ScoreFullProfile: 10, ScoreEitaa: 15, savedate: "2024-10-22T06:15:03.03" },
            { id: 1, _Business: 44, ScoreBuy: 10, ScoreBuyOne: 30, ScoreRegisterFriend: 20, ScoreBuyFriend: 5, ScoreFullProfile: 10, ScoreEitaa: 25, savedate: "2024-05-15T10:21:30.82" }
        ];

        return rawData.map(item => ({
            ...item,
            // تبدیل تاریخ به شمسی
            formattedDate: new Date(item.savedate).toLocaleDateString('fa-IR'),
            // هندل کردن مقادیر null
            ScoreBuyFriend: item.ScoreBuyFriend ?? 0,
        }));
    }, [scores]);

    if (loading && (!scores || scores.length === 0)) {
        return <PageLoader />;
    }

    const handleDelete = async (id) => {
        const confirm = await MySwal.fire({
            title: 'حذف قانون امتیاز',
            text: "آیا از حذف این ردیف مطمئن هستید؟",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'بله، حذف کن',
            cancelButtonText: 'انصراف',
            confirmButtonColor: '#d33',
        });

        // if (confirm.isConfirmed) {
        //     try {
        //         await dispatch(deleteScore({ Id: id })).unwrap();
        //         toast.success('با موفقیت حذف شد');
        //         dispatch(fetchScores());
        //     } catch (err) {
        //         toast.error('خطا در حذف');
        //     }
        // }
    };

    // --- تعریف ستون‌ها ---
    const columns = [
        {
            accessorKey: "id",
            header: "ردیف",
            cell: ({ row }) => <span className="font-mono text-muted-foreground">#{row.getValue("id")}</span>,
            size: 60,
        },
        // 1. امتیاز خرید
        {
            accessorKey: "ScoreBuy",
            header: ({ column }) => (
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => column.toggleSorting()}>
                    <ShoppingBag className="h-4 w-4 text-primary" />
                    <span>خرید عادی</span>
                    <ArrowUpDown className="h-3 w-3" />
                </div>
            ),
            cell: ({ row }) => (
                <div className="font-semibold text-foreground">
                    {Number(row.getValue("ScoreBuy")).toLocaleString()}
                </div>
            ),
            size: 110,
        },
        // 2. امتیاز خرید اول
        {
            accessorKey: "ScoreBuyOne",
            header: ({ column }) => (
                <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-amber-500" />
                    <span>خرید اول</span>
                </div>
            ),
            cell: ({ row }) => (
                <span className="font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                    {Number(row.getValue("ScoreBuyOne")).toLocaleString()}
                </span>
            ),
            size: 110,
        },
        // 3. امتیاز دعوت دوست
        {
            accessorKey: "ScoreRegisterFriend",
            header: ({ column }) => (
                <div className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4 text-blue-500" />
                    <span>دعوت دوست</span>
                </div>
            ),
            cell: ({ row }) => (
                <span className="font-medium text-blue-600">
                    {Number(row.getValue("ScoreRegisterFriend")).toLocaleString()}
                </span>
            ),
            size: 120,
        },
        // 4. امتیاز خرید دوست
        {
            accessorKey: "ScoreBuyFriend",
            header: ({ column }) => (
                <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-indigo-500" />
                    <span>خرید دوست</span>
                </div>
            ),
            cell: ({ row }) => {
                const val = row.getValue("ScoreBuyFriend");
                return val ? (
                    <span className="font-medium text-indigo-600">
                        {Number(val).toLocaleString()}
                    </span>
                ) : (
                    <span className="text-muted-foreground">-</span>
                );
            },
            size: 110,
        },
        // 5. امتیاز پروفایل کامل
        {
            accessorKey: "ScoreFullProfile",
            header: ({ column }) => (
                <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-emerald-500" />
                    <span>تکمیل پروفایل</span>
                </div>
            ),
            cell: ({ row }) => (
                <span className="font-medium text-emerald-600">
                    {Number(row.getValue("ScoreFullProfile")).toLocaleString()}
                </span>
            ),
            size: 120,
        },
        // 6. امتیاز ایتا
        {
            accessorKey: "ScoreEitaa",
            header: ({ column }) => (
                <div className="flex items-center gap-2">
                    <Send className="h-4 w-4 text-sky-500" />
                    <span>عضویت در ایتا</span>
                </div>
            ),
            cell: ({ row }) => (
                <span className="font-medium text-sky-600">
                    {Number(row.getValue("ScoreEitaa")).toLocaleString()}
                </span>
            ),
            size: 110,
        },
        // تاریخ
        {
            accessorKey: "formattedDate",
            header: "تاریخ ثبت",
            cell: ({ row }) => (
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="h-3 w-3" />
                    <span>{row.getValue("formattedDate")}</span>
                </div>
            ),
            size: 130,
        },
        // عملیات
        {
            id: "actions",
            header: "",
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link to={`edit/${row.original.id}`}>ویرایش</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-destructive focus:text-destructive cursor-pointer"
                            onClick={() => handleDelete(row.original.id)}
                        >
                            حذف
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
            size: 50,
        },
    ];

    return (
        <Layout>
            <Layout.Header>
                <Navbar links={topNav} />
                <div className='mr-auto flex items-center space-x-4 gap-5'>
                    <Search />
                    <UserNavbar />
                </div>
            </Layout.Header>

            <Layout.Body>
                {/* هدر صفحه */}
                <div className='mb-6 p-4 bg-card rounded-xl border shadow-sm flex items-center justify-between'>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Coins className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h2 className='text-lg font-bold'>تنظیمات امتیازدهی</h2>
                            <p className="text-sm text-muted-foreground">مشاهده و مدیریت امتیازات خرید و فعالیت‌ها</p>
                        </div>
                    </div>
                    <Button onClick={() => navigate("new")} className="gap-2">
                        <PlusCircle className="h-4 w-4" />
                        قانون جدید
                    </Button>
                </div>

                {/* نمایش خطا */}
                {error && (
                    <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20 flex gap-2 items-center">
                        <XCircle className="h-5 w-5" />
                        {error}
                    </div>
                )}

                {/* جدول داده‌ها */}
                <div className="bg-background border rounded-xl shadow-sm overflow-hidden p-5">
                    <DataTable
                        data={formattedData}
                        columns={columns}
                        filters={[
                            {
                                value: "id", // یا هر فیلد دیگری برای جستجو
                                placeholder: "جستجو..."
                            }
                        ]}
                    />
                </div>
            </Layout.Body>
        </Layout>
    );
}