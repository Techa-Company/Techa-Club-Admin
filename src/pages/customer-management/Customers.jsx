// import { Button } from '@/components/custom/button'

import Layout from '../layout/Layout'
import { UserNavbar } from '@/components/UserNavbar'
import { Search } from '@/components/Search'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/button'
import { DataTable } from '@/components/common/DataTable'
import { AddCustomer } from './components/AddCustomer'
import { ArrowUpDown, Eye, User, Smartphone, Award, Key, CheckCircle, XCircle, Crown, Star } from 'lucide-react'
import { EditCustomer } from './components/EditCustomer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchCustomers } from '@/features/customer/customerActions'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const columns = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="text-xs font-bold text-slate-500"
            >
                ردیف
                <ArrowUpDown className="mr-2 h-3 w-3" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="text-center font-mono text-sm font-bold text-slate-400">
                #{row.getValue("id")}
            </div>
        ),
    },
    {
        accessorKey: "FullName",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="text-xs font-bold text-slate-500"
            >
                <User className="ml-2 h-4 w-4" />
                نام و نام خانوادگی
                <ArrowUpDown className="mr-2 h-3 w-3" />
            </Button>
        ),
        cell: ({ row }) => {
            const customer = row.original;
            const firstName = customer.FirstName || "کاربر";
            const lastName = customer.LastName || "";
            const fullName = customer.FullName || `${firstName} ${lastName}`.trim();

            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border-2 border-slate-100">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${customer.mobile}`} />
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-blue-100 text-primary">
                            {firstName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-bold text-slate-700">{fullName}</span>
                        {customer.gender && (
                            <span className="text-[10px] text-slate-400 font-medium">
                                {customer.gender === "male" ? "آقا" : "خانم"}
                            </span>
                        )}
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "mobile",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="text-xs font-bold text-slate-500"
            >
                <Smartphone className="ml-2 h-4 w-4" />
                شماره موبایل
                <ArrowUpDown className="mr-2 h-3 w-3" />
            </Button>
        ),
        cell: ({ row }) => {
            const mobile = row.getValue("mobile");
            const formatted = mobile.toString().replace(/(\d{4})(\d{3})(\d{4})/, "$1-$2-$3");

            return (
                <div className="flex items-center gap-2 font-mono">
                    <div className="rounded-lg bg-blue-50 p-1.5">
                        <Smartphone className="h-3.5 w-3.5 text-blue-500" />
                    </div>
                    <span className="font-bold text-slate-700">0{formatted}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "_Level",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="text-xs font-bold text-slate-500"
            >
                <Award className="ml-2 h-4 w-4" />
                سطح عضویت
                <ArrowUpDown className="mr-2 h-3 w-3" />
            </Button>
        ),
        cell: ({ row }) => {
            const level = row.getValue("_Level");
            const getLevelInfo = (lvl) => {
                const levels = {
                    1: { label: "برنزی", color: "bg-amber-100 text-amber-800 border-amber-200", icon: Star },
                    2: { label: "نقره‌ای", color: "bg-slate-100 text-slate-800 border-slate-200", icon: Star },
                    3: { label: "طلایی", color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Crown },
                    4: { label: "پلاتین", color: "bg-blue-100 text-blue-800 border-blue-200", icon: Crown },
                };
                return levels[lvl] || { label: `سطح ${lvl}`, color: "bg-slate-100 text-slate-800", icon: Star };
            };

            const { label, color, icon: Icon } = getLevelInfo(level);

            return (
                <Badge className={`${color} border font-bold px-3 py-1 rounded-full`}>
                    <Icon className="ml-1 h-3 w-3" />
                    {label}
                </Badge>
            );
        },
    },
    {
        accessorKey: "KeyCode",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="text-xs font-bold text-slate-500"
            >
                <Key className="ml-2 h-4 w-4" />
                کد معرف
                <ArrowUpDown className="mr-2 h-3 w-3" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <div className="rounded-lg bg-purple-50 p-1.5">
                    <Key className="h-3.5 w-3.5 text-purple-500" />
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <code className="font-mono text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                {row.getValue("KeyCode")}
                            </code>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-xs">کد معرف کاربر</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        ),
    },
    {
        accessorKey: "active",
        header: () => (
            <div className="text-xs font-bold text-slate-500">وضعیت</div>
        ),
        cell: ({ row }) => {
            const isActive = row.getValue("active");

            return (
                <div className="flex items-center gap-2">
                    {isActive ? (
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50">
                            <CheckCircle className="ml-1 h-3 w-3" />
                            فعال
                        </Badge>
                    ) : (
                        <Badge variant="outline" className="text-rose-600 border-rose-200">
                            <XCircle className="ml-1 h-3 w-3" />
                            غیرفعال
                        </Badge>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "MahGardon",
        header: () => (
            <div className="text-xs font-bold text-slate-500">ماه گردون</div>
        ),
        cell: ({ row }) => (
            <div className="text-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-orange-50 to-amber-100 text-amber-700 font-bold text-sm border border-amber-200">
                    {row.getValue("MahGardon") || 0}
                </span>
            </div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        header: () => <div className="text-xs font-bold text-slate-500">عملیات</div>,
        cell: ({ row }) => {
            const customer = row.original;

            return (
                <div className='flex gap-2 items-center'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-xl hover:bg-blue-50 hover:text-blue-600"
                                    onClick={() => navigate(`/customers/${customer.id}`)}
                                >
                                    <Eye className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-xs">مشاهده جزئیات</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <EditCustomer customer={customer} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-xs">ویرایش اطلاعات</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            );
        }
    },
];

const filters = [
    {
        value: "FullName",
        placeholder: "نام"
    },
    {
        value: "mobile",
        placeholder: "موبایل"
    },
    {
        value: "KeyCode",
        placeholder: "کد معرف"
    }
]

export default function Customers() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        goldLevel: 0,
        hasReferral: 0
    });

    // دریافت دیتا از استور
    const { loading, customers } = useSelector((state) => state.customers);

    useEffect(() => {
        dispatch(fetchCustomers({ "_Business": 3 }));
    }, [dispatch]);

    useEffect(() => {
        if (customers && customers.length > 0) {
            const stats = {
                total: customers.length,
                active: customers.filter(c => c.active).length,
                goldLevel: customers.filter(c => c._Level === 3).length,
                hasReferral: customers.filter(c => c.KeyCode && c.KeyCode.length > 0).length
            };
            setStats(stats);
        }
    }, [customers]);

    const CustomerSkeleton = () => (
        <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <Layout>
            {/* ===== Top Heading ===== */}
            <Layout.Header>
                <Navbar links={topNav} />
                <div className='mr-auto flex items-center space-x-4 gap-5'>
                    <Search />
                    {/* <ThemeSwitch /> */}
                    <UserNavbar />
                </div>
            </Layout.Header>

            {/* ===== Main ===== */}
            <Layout.Body>
                <div className='mb-6 flex flex-col gap-6'>
                    <div className='flex items-center justify-between'>
                        <div className="flex flex-col">
                            <h1 className='text-2xl font-black text-slate-800 flex items-center gap-2'>
                                <div className="p-2 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-100">
                                    <User className="h-6 w-6 text-primary" />
                                </div>
                                مدیریت مشتریان
                            </h1>
                            <span className="text-sm text-slate-500 font-medium mt-1">
                                مشاهده، مدیریت و ویرایش اطلاعات مشتریان مجموعه
                            </span>
                        </div>
                        <div className='flex items-center gap-3'>
                            <AddCustomer />
                            <Button variant="outline" className="gap-2 rounded-2xl border-slate-200 hover:bg-slate-50">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                خروجی Excel
                            </Button>
                        </div>
                    </div>

                    {/* آمار سریع */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="border-none shadow-lg rounded-2xl bg-gradient-to-br from-blue-50 to-white">
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-black text-slate-800">{stats.total}</span>
                                        <span className="text-sm text-slate-500 font-medium">کل مشتریان</span>
                                    </div>
                                    <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                                        <User className="h-6 w-6" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-lg rounded-2xl bg-gradient-to-br from-emerald-50 to-white">
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-black text-slate-800">{stats.active}</span>
                                        <span className="text-sm text-slate-500 font-medium">کاربران فعال</span>
                                    </div>
                                    <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600">
                                        <CheckCircle className="h-6 w-6" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-lg rounded-2xl bg-gradient-to-br from-amber-50 to-white">
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-black text-slate-800">{stats.goldLevel}</span>
                                        <span className="text-sm text-slate-500 font-medium">مشتریان طلایی</span>
                                    </div>
                                    <div className="p-3 rounded-xl bg-amber-100 text-amber-600">
                                        <Crown className="h-6 w-6" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-lg rounded-2xl bg-gradient-to-br from-purple-50 to-white">
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-black text-slate-800">{stats.hasReferral}</span>
                                        <span className="text-sm text-slate-500 font-medium">دارای کد معرف</span>
                                    </div>
                                    <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
                                        <Key className="h-6 w-6" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {loading ? (
                    <CustomerSkeleton />
                ) : (
                    <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-primary via-blue-400 to-indigo-500" />
                        <CardContent className="p-6">
                            <DataTable
                                data={customers || []}
                                columns={columns}
                                filters={filters}
                                searchPlaceholder="جستجوی مشتریان (نام، موبایل، کد معرف...)"
                            />
                        </CardContent>
                    </Card>
                )}
            </Layout.Body>
        </Layout>
    )
}

const topNav = [
    {
        title: 'خانه',
        href: 'dashboard/overview',
        isActive: false,
    },
    {
        title: 'مشتریان',
        href: 'dashboard/customers',
        isActive: true,
    },
    {
        title: 'محصولات',
        href: 'dashboard/products',
        isActive: false,
    },
    {
        title: 'تنظیمات',
        href: 'dashboard/settings',
        isActive: false,
    },
]