// ScoreShelf.jsx
import { useEffect, useMemo } from 'react';
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
    ShoppingBag,
    Store,
    Cog,
    Edit3
} from 'lucide-react';

import Layout from '../layout/Layout';
import { UserNavbar } from '@/components/UserNavbar';
import { Search } from '@/components/Search';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/button';
import { DataTable } from '@/components/common/DataTable';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

    const { loading, scores, error } = useSelector(
        (state) => state.scoreEshel || { loading: false, scores: [], error: null }
    );

    useEffect(() => {
        dispatch(fetchScores({ "_Business": 3 }));
    }, [dispatch]);

    const formattedData = useMemo(() => {
        if (!scores || scores.length === 0) {
            return [];
        }

        return scores.map((item) => ({
            ...item,
            formattedDate: new Date(item.savedate).toLocaleDateString('fa-IR'),
            ScoreBuyFriend: item.ScoreBuyFriend ?? 0,
        }));
    }, [scores]);

    // ── لودینگ ──
    if (loading) {
        return <PageLoader />;
    }

    // ── خطا ──
    if (error) {
        return (
            <Layout>
                <Layout.Header>
                    <Navbar links={topNav} />
                    <div className="mr-auto flex items-center space-x-4 gap-5">
                        <Search />
                        <UserNavbar />
                    </div>
                </Layout.Header>

                <Layout.Body>
                    <div className="max-w-2xl mx-auto mt-12 p-8 bg-destructive/5 border border-destructive/30 rounded-xl text-center">
                        <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-destructive mb-3">
                            مشکلی پیش آمد
                        </h2>
                        <p className="text-muted-foreground mb-6">{error}</p>
                        <Button
                            onClick={() => {
                                dispatch(fetchScores({ "_Business": 3 }));
                                toast.info('در حال بارگذاری مجدد...');
                            }}
                        >
                            تلاش مجدد
                        </Button>
                    </div>
                </Layout.Body>
            </Layout>
        );
    }
    const columns = [
        {
            id: 'rowNumber',
            header: 'ردیف',
            size: 70,
            cell: ({ row }) => (
                <span className="font-mono text-muted-foreground">
                    {row.index + 1}
                </span>
            ),
        },
        {
            accessorKey: 'BusinessName',
            header: ({ column }) => (
                <div
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <Store className="h-4 w-4 text-blue-500" />
                    <span>کسب و کار</span>
                </div>
            ),
            cell: ({ row }) => (
                <div className="font-semibold">
                    {row.getValue('BusinessName')}
                </div>
            ),
            size: 180,
            minSize: 140,
        },
        {
            accessorKey: 'ScoreBuy',
            header: ({ column }) => (
                <div
                    className="flex items-center gap-2 cursor-pointer justify-center"
                    onClick={() => column.toggleSorting()}
                >
                    <ShoppingBag className="h-4 w-4 text-primary" />
                    <span>خرید عادی</span>
                    <ArrowUpDown className="h-3 w-3" />
                </div>
            ),
            cell: ({ row }) => (
                <div className="font-semibold text-center">
                    {Number(row.getValue('ScoreBuy')).toLocaleString()}
                </div>
            ),
            size: 120,
        },
        {
            accessorKey: 'ScoreBuyOne',
            header: () => (
                <div className="flex items-center gap-2 justify-center">
                    <Trophy className="h-4 w-4 text-amber-500" />
                    <span>خرید اول</span>
                </div>
            ),
            cell: ({ row }) => (
                <span className="font-medium w-fit block mx-auto text-amber-700 bg-amber-50 px-2.5 py-1 rounded">
                    {Number(row.getValue('ScoreBuyOne')).toLocaleString()}
                </span>
            ),
            size: 120,
        },
        {
            accessorKey: 'ScoreRegisterFriend',
            header: () => (
                <div className="flex items-center gap-2 justify-center">
                    <UserPlus className="h-4 w-4 text-blue-500" />
                    <span>دعوت دوست</span>
                </div>
            ),
            cell: ({ row }) => (
                <span className="font-medium w-fit block mx-auto text-blue-700">
                    {Number(row.getValue('ScoreRegisterFriend')).toLocaleString()}
                </span>
            ),
            size: 130,
        },
        {
            accessorKey: 'ScoreBuyFriend',
            header: () => (
                <div className="flex items-center gap-2 justify-center">
                    <Users className="h-4 w-4 text-indigo-500" />
                    <span>خرید دوست</span>
                </div>
            ),
            cell: ({ row }) => {
                const val = row.getValue('ScoreBuyFriend');
                return val ? (
                    <span className="font-medium w-fit block mx-auto text-indigo-700">
                        {Number(val).toLocaleString()}
                    </span>
                ) : (
                    <span className="text-muted-foreground">—</span>
                );
            },
            size: 120,
        },
        {
            accessorKey: 'ScoreFullProfile',
            header: () => (
                <div className="flex items-center gap-2 justify-center">
                    <UserCheck className="h-4 w-4 text-emerald-500" />
                    <span>تکمیل پروفایل</span>
                </div>
            ),
            cell: ({ row }) => (
                <span className="font-medium w-fit block mx-auto text-emerald-700">
                    {Number(row.getValue('ScoreFullProfile')).toLocaleString()}
                </span>
            ),
            size: 140,
        },
        {
            accessorKey: 'ScoreEitaa',
            header: () => (
                <div className="flex items-center gap-2 justify-center">
                    <Send className="h-4 w-4 text-sky-500" />
                    <span>عضویت در ایتا</span>
                </div>
            ),
            cell: ({ row }) => (
                <span className="font-medium w-fit block mx-auto text-sky-700">
                    {Number(row.getValue('ScoreEitaa')).toLocaleString()}
                </span>
            ),
            size: 120,
        },
        {
            accessorKey: 'formattedDate',
            header: () => (
                <div className="flex items-center gap-2 justify-center">
                    <Calendar className="h-4 w-4 text-pink-500" />
                    <span>تاریخ ثبت</span>
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center gap-2 text-muted-foreground text-sm justify-center">
                    <span>{row.getValue('formattedDate')}</span>
                </div>
            ),
            size: 140,
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
                    {/* <Button size="icon" variant="ghost" className={`h-8 w-8 rounded-full ${row.original.active ? "hover:text-rose-600" : "hover:text-emerald-600"}`}>
                        <Power className="h-4 w-4" />
                    </Button> */}
                </div>
            ),
            size: 100,
        }
    ]
    // ── رندر اصلی صفحه ──
    return (
        <Layout>
            <Layout.Header>
                <Navbar links={topNav} />
                <div className="mr-auto flex items-center space-x-4 gap-5">
                    <Search />
                    <UserNavbar />
                </div>
            </Layout.Header>

            <Layout.Body>
                {/* هدر صفحه */}
                <div className="mb-8 p-6 bg-card rounded-2xl border shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl">
                            <Coins className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                تنظیمات امتیازدهی
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                مدیریت قوانین امتیاز خرید، دعوت دوستان و فعالیت‌ها
                            </p>
                        </div>
                    </div>

                    {/* <Button
                        onClick={() => navigate('new')}
                        size="lg"
                        className="gap-2 whitespace-nowrap"
                    >
                        <PlusCircle className="h-5 w-5" />
                        ایجاد قانون جدید
                    </Button> */}
                </div>

                {/* محتوای اصلی */}
                <div className="bg-background border rounded-2xl shadow-sm overflow-hidden">
                    {formattedData.length === 0 ? (
                        <div className="py-20 px-8 text-center">
                            <Coins className="h-16 w-16 text-muted-foreground/40 mx-auto mb-6" />
                            <h3 className="text-xl font-semibold mb-3">
                                هنوز هیچ قانون امتیازی ثبت نشده است
                            </h3>
                            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                                با ایجاد اولین قانون امتیازدهی، می‌توانید سیستم پاداش‌دهی به مشتریان خود را فعال کنید.
                            </p>
                            {/* <Button
                                onClick={() => navigate('new')}
                                size="lg"
                                className="gap-2"
                            >
                                <PlusCircle className="h-5 w-5" />
                                ایجاد قانون جدید
                            </Button> */}
                        </div>
                    ) : (
                        <div className="p-6">
                            <DataTable
                                data={formattedData}
                                columns={columns}
                                filters={[

                                ]}
                            />
                        </div>
                    )}
                </div>
            </Layout.Body>
        </Layout>
    );
}