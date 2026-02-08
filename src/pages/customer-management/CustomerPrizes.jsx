import React, { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserNavbar } from '@/components/UserNavbar';
import { Search } from '@/components/Search';
import { Navbar } from '@/components/Navbar';
import { DataTable } from '@/components/common/DataTable';
import { PageLoader } from '@/components/common/Loading';
import { fetchCustomerPrizes } from '@/features/customer-Prize/customerPrizeActions';
import { Coins, Calendar, Award, Users } from 'lucide-react';
import Layout from '../layout/Layout';
import { Card, CardContent } from '@/components/ui/card';

// Top navigation links
const TOP_NAV_LINKS = [
    { title: 'خانه', href: 'dashboard/overview', isActive: false },
    { title: 'مشتریان', href: 'dashboard/customers', isActive: false },
    { title: 'جوایز', href: 'dashboard/prizes', isActive: true },
    { title: 'تنظیمات', href: 'dashboard/settings', isActive: false },
];

// Constants
const BUSINESS_ID = 3;

const CustomerPrizes = () => {
    const dispatch = useDispatch();
    const { loading, customerPrizes, error } = useSelector(state => state.customerPrizes);
    const prizesCount = customerPrizes?.length || 0;

    // Fetch customer prizes data
    useEffect(() => {
        dispatch(fetchCustomerPrizes({ "_Business": BUSINESS_ID }));
    }, [dispatch]);

    // Format date to Persian
    const formatPersianDate = useCallback((dateString) => {
        if (!dateString) return '--';
        try {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('fa-IR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(date);
        } catch (error) {
            console.error('Error formatting date:', error);
            return '--';
        }
    }, []);

    // Define columns for the data table
    const columns = useMemo(() => [
        {
            id: 'id',
            accessorKey: "id",
            header: () => (
                <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">شناسه</span>
                </div>
            ),
            cell: ({ row }) => (
                <span className="font-mono text-slate-400 text-xs bg-slate-50 px-2 py-1 rounded">
                    #{row.getValue("id")}
                </span>
            ),
            size: 80,
            enableSorting: true,
        },
        {
            id: 'FullName',
            accessorKey: "FullName",
            header: () => (
                <div className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-xs text-slate-500">مشتری</span>
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-bold text-slate-800 text-sm">{row.original.FullName}</span>
                    <span className="text-xs text-slate-400">{row.original.Email || 'ایمیل ثبت نشده'}</span>
                </div>
            ),
            size: 220,
            enableSorting: true,
        },
        {
            id: 'Mobile',
            accessorKey: "Mobile",
            header: () => (
                <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">شماره تماس</span>
                </div>
            ),
            cell: ({ row }) => (
                <span className="font-mono text-sm text-slate-600 bg-blue-50 px-3 py-1.5 rounded-lg">
                    {row.original.Mobile}
                </span>
            ),
            size: 140,
        },
        {
            id: 'title',
            accessorKey: "title",
            header: () => (
                <div className="flex items-center gap-2">
                    <Award className="h-3.5 w-3.5 text-amber-500" />
                    <span className="text-xs text-slate-500">عنوان جایزه</span>
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    <span className="font-bold text-slate-800">{row.original.title}</span>
                </div>
            ),
            size: 200,
            enableSorting: true,
        },
        {
            id: 'points',
            accessorKey: "points",
            header: () => (
                <div className="flex items-center gap-2">
                    <Coins className="h-3.5 w-3.5 text-amber-500" />
                    <span className="text-xs text-slate-500">امتیاز</span>
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center gap-1.5">
                    <Coins className="h-3.5 w-3.5 text-amber-500" />
                    <span className="font-bold text-amber-600">{row.original.points || 0}</span>
                </div>
            ),
            size: 100,
        },
        {
            id: 'savedate',
            accessorKey: "savedate",
            header: () => (
                <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-xs text-slate-500">تاریخ ثبت</span>
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center gap-1.5 text-slate-700 font-medium text-xs bg-slate-50 px-3 py-1.5 rounded-lg">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span>{formatPersianDate(row.getValue("savedate"))}</span>
                </div>
            ),
            size: 160,
            enableSorting: true,
        },
        {
            id: 'actions',
            header: 'عملیات',
            cell: ({ row }) => (
                <button
                    className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-lg transition-colors"
                    onClick={() => console.log('View details:', row.original)}
                >
                    مشاهده جزئیات
                </button>
            ),
            size: 120,
        },
    ], [formatPersianDate]);

    // Stats calculation
    const stats = useMemo(() => {
        if (!customerPrizes) return null;

        const totalPoints = customerPrizes.reduce((sum, item) => sum + (item.points || 0), 0);
        const uniqueCustomers = [...new Set(customerPrizes.map(item => item.FullName))].length;

        return { totalPoints, uniqueCustomers };
    }, [customerPrizes]);

    // Loading state
    if (loading && (!customerPrizes || customerPrizes.length === 0)) {
        return (
            <Layout>
                <Layout.Header>
                    <Navbar links={TOP_NAV_LINKS} />
                    <div className='mr-auto flex items-center space-x-4 gap-5'>
                        <Search />
                        <UserNavbar />
                    </div>
                </Layout.Header>
                <Layout.Body className="flex items-center justify-center min-h-[50vh]">
                    <PageLoader message="در حال دریافت جوایز..." />
                </Layout.Body>
            </Layout>
        );
    }

    // Error state
    if (error) {
        return (
            <Layout>
                <Layout.Header>
                    <Navbar links={TOP_NAV_LINKS} />
                    <div className='mr-auto flex items-center space-x-4 gap-5'>
                        <Search />
                        <UserNavbar />
                    </div>
                </Layout.Header>
                <Layout.Body className="space-y-6">
                    <div className="bg-red-50 border border-red-200 rounded-[2.5rem] p-8 text-center">
                        <div className="text-red-600 mb-4">خطا در دریافت داده‌ها</div>
                        <p className="text-slate-600 mb-4">{error}</p>
                        <button
                            onClick={() => dispatch(fetchCustomerPrizes({ "_Business": BUSINESS_ID }))}
                            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            تلاش مجدد
                        </button>
                    </div>
                </Layout.Body>
            </Layout>
        );
    }

    return (
        <Layout>
            <Layout.Header>
                <Navbar links={TOP_NAV_LINKS} />
                <div className='mr-auto flex items-center space-x-4 gap-5'>
                    <Search />
                    <UserNavbar />
                </div>
            </Layout.Header>

            <Layout.Body className="space-y-6">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-[2.5rem] border shadow-sm">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <h1 className='text-2xl md:text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3'>
                                <Award className="h-8 w-8 text-blue-600" />
                                جوایز مشتریان
                            </h1>
                            <p className="text-sm md:text-base text-slate-500 font-medium mt-2">
                                لیست جوایز و پاداش‌های اعطا شده به مشتریان
                            </p>
                        </div>

                        <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl shadow-sm">
                            <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-slate-600 font-medium">
                                تعداد جوایز:
                            </span>
                            <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-lg font-bold">
                                {prizesCount.toLocaleString('fa-IR')}
                            </span>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    {stats && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                            <Card className="bg-white border shadow-sm rounded-2xl overflow-hidden">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-500">تعداد مشتریان</p>
                                            <p className="text-2xl font-bold text-slate-800 mt-1">
                                                {stats.uniqueCustomers.toLocaleString('fa-IR')}
                                            </p>
                                        </div>
                                        <Users className="h-10 w-10 text-blue-100 bg-blue-500 p-2 rounded-xl" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border shadow-sm rounded-2xl overflow-hidden">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-500">مجموع امتیازات</p>
                                            <p className="text-2xl font-bold text-amber-600 mt-1 flex items-center gap-1">
                                                <Coins className="h-5 w-5" />
                                                {stats.totalPoints.toLocaleString('fa-IR')}
                                            </p>
                                        </div>
                                        <Coins className="h-10 w-10 text-amber-100 bg-amber-500 p-2 rounded-xl" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border shadow-sm rounded-2xl overflow-hidden">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-500">میانگین امتیاز</p>
                                            <p className="text-2xl font-bold text-emerald-600 mt-1">
                                                {prizesCount > 0
                                                    ? Math.round(stats.totalPoints / prizesCount).toLocaleString('fa-IR')
                                                    : '0'
                                                }
                                            </p>
                                        </div>
                                        <Award className="h-10 w-10 text-emerald-100 bg-emerald-500 p-2 rounded-xl" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>

                {/* Data Table Section */}
                <div className="bg-white rounded-[2.5rem] border shadow-lg overflow-hidden">
                    <div className="p-6 border-b">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <h2 className="text-lg font-bold text-slate-800">لیست جوایز</h2>
                            <div className="flex items-center gap-3">
                                <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    خروجی Excel
                                </button>
                                <button className="text-sm border border-slate-300 text-slate-600 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                                    فیلتر پیشرفته
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-5">
                        <DataTable
                            data={customerPrizes || []}
                            columns={columns}
                            loading={loading && customerPrizes?.length > 0}
                            emptyStateMessage={
                                <div className="text-center py-12">
                                    <Award className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                                    <p className="text-slate-500 font-medium">هیچ جایزه‌ای ثبت نشده است</p>
                                    <p className="text-sm text-slate-400 mt-2">
                                        با اعطای جایزه به مشتریان، لیست جوایز اینجا نمایش داده می‌شود
                                    </p>
                                </div>
                            }
                            pagination
                            pageSize={10}
                            className="min-h-[400px]"
                            filters={[]}
                        />
                    </div>
                </div>
            </Layout.Body>
        </Layout>
    );
}

export default CustomerPrizes;