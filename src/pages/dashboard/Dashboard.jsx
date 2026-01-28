import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDashboard } from '@/features/dashboard/dashboardActions'
import Layout from '../layout/Layout'

// Components
import { UserNavbar } from '@/components/UserNavbar'
import { Search } from '@/components/Search'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/button'
import DashboardChart from './components/DashboardChart'
import DashboardTable from './components/DashboardTable'
import DashboardDiscount from './components/DashboardDiscount'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

// Icons
import {
    ChartColumnBig,
    TableProperties,
    TicketPercent,
    Users,
    AlertCircle,
    RotateCw,
    Download,
    TrendingUp,
    History
} from 'lucide-react'

// تابع کمکی برای تبدیل رشته‌های دارای ویرگول به عدد
const parseFormattedNumber = (value) => {
    if (!value) return 0;
    if (typeof value === 'number') return value;
    return Number(value.toString().replace(/,/g, '')) || 0;
}

export default function Dashboard() {
    const dispatch = useDispatch()
    const { loading, dashboard, error } = useSelector(state => state.dashboard)
    const [isRetrying, setIsRetrying] = useState(false)

    useEffect(() => {
        dispatch(fetchDashboard())
    }, [dispatch])

    const handleRetry = () => {
        setIsRetrying(true)
        dispatch(fetchDashboard()).finally(() => setIsRetrying(false))
    }

    // ===== پردازش هوشمند دیتا =====
    const stats = useMemo(() => {
        if (!dashboard || !Array.isArray(dashboard) || dashboard.length === 0) return null;

        // 1. پردازش Type 1 (خلاصه سطوح کاربری -> برای چارت)
        let levelsRaw = dashboard.filter(item => item.Type === 1);
        const userLevels = levelsRaw.sort((a, b) => {
            const levelA = Number(a.f4);
            const levelB = Number(b.f4);
            if (levelA === 5) return -1;
            if (levelB === 5) return 1;
            return levelA - levelB;
        });

        // 2. پردازش Type 2 (بازه‌های فروش -> برای جدول)  <--- بخش اضافه شده
        const salesRanges = dashboard.filter(item => item.Type === 2);

        // 3. پردازش Type 3 (کوپن‌ها)
        const coupons = dashboard.filter(item => item.Type === 3).map(item => ({
            title: item.f1,
            issued: parseFormattedNumber(item.f2),
            usedTotal: parseFormattedNumber(item.f3),
            usedRecent: parseFormattedNumber(item.f4),
            ...item
        }));

        // 4. محاسبات KPI
        const totalCustomers = userLevels.reduce((acc, curr) => acc + parseFormattedNumber(curr.f3), 0);
        const totalCouponsIssued = coupons.reduce((acc, curr) => acc + curr.issued, 0);
        const totalCouponsUsed = coupons.reduce((acc, curr) => acc + curr.usedTotal, 0);
        const totalCouponsRecent = coupons.reduce((acc, curr) => acc + curr.usedRecent, 0);

        return {
            userLevels,   // دیتای تایپ 1
            salesRanges,  // دیتای تایپ 2 (جدید)
            coupons,      // دیتای تایپ 3
            kpi: {
                totalCustomers,
                totalCouponsIssued,
                totalCouponsUsed,
                totalCouponsRecent
            }
        };
    }, [dashboard]);

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
                <div className='mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-3xl font-bold tracking-tight text-foreground'>داشبورد</h1>
                        <p className='text-muted-foreground mt-1 text-sm'>
                            گزارش جامع مشتریان و وضعیت تخفیف‌ها
                        </p>
                    </div>
                    <div className='flex items-center gap-2 w-full sm:w-auto'>
                        <Button variant="outline" size="sm" onClick={handleRetry} disabled={loading || isRetrying} className="flex-1 sm:flex-none">
                            <RotateCw className={`mr-2 h-4 w-4 ${loading || isRetrying ? 'animate-spin' : ''}`} />
                            بروزرسانی
                        </Button>
                        <Button size="sm" className="flex-1 sm:flex-none">
                            <Download className="mr-2 h-4 w-4" />
                            دانلود گزارش
                        </Button>
                    </div>
                </div>

                {error ? (
                    <ErrorState message={error} onRetry={handleRetry} />
                ) : loading || !stats ? (
                    <DashboardSkeleton />
                ) : (
                    <DashboardContent stats={stats} />
                )}
            </Layout.Body>
        </Layout>
    )
}

// ==========================================
// Main Content
// ==========================================
function DashboardContent({ stats }) {
    // دریافت salesRanges از props
    const { userLevels, salesRanges, coupons, kpi } = stats;

    return (
        <Tabs orientation='vertical' defaultValue='overview' className='space-y-4 animate-in fade-in duration-500 slide-in-from-bottom-4'>

            {/* KPI Cards */}
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                <KpiCard
                    title="تعداد کل مشتریان"
                    icon={<Users className='h-5 w-5 text-blue-500' />}
                    value={`${kpi.totalCustomers.toLocaleString()} نفر`}
                    description="مجموع کاربران ثبت شده در تمام سطوح"
                />
                {kpi.totalCouponsIssued > 0 && (
                    <KpiCard
                        title="کوپن‌های صادر شده"
                        icon={<TicketPercent className='h-5 w-5 text-orange-500' />}
                        value={`${kpi.totalCouponsIssued.toLocaleString()}`}
                        description="تعداد کل کدهای تخفیف تولید شده"
                    />
                )}
                {kpi.totalCouponsUsed > 0 && (
                    <KpiCard
                        title="مجموع استفاده از تخفیف"
                        icon={<History className='h-5 w-5 text-purple-500' />}
                        value={`${kpi.totalCouponsUsed.toLocaleString()} بار`}
                        description="تعداد دفعات استفاده شده تاکنون"
                    />
                )}
                <KpiCard
                    title="استفاده در ۷ روز اخیر"
                    icon={<TrendingUp className='h-5 w-5 text-emerald-500' />}
                    value={`${kpi.totalCouponsRecent.toLocaleString()} بار`}
                    description="روند استفاده از تخفیف‌ها در هفته گذشته"
                    trend={kpi.totalCouponsRecent > 0 ? "فعال" : "بدون تغییر"}
                />
            </div>

            {/* Main Section */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>

                {/* Chart & Table Card */}
                <Card className='col-span-1 lg:col-span-4 shadow-sm border-border/60 relative'>
                    <CardHeader>
                        <div className="flex flex-col gap-1">
                            <CardTitle>توزیع سطح مشتریان</CardTitle>
                            <CardDescription>
                                نمایش تعداد مشتریان در هر سطح وفاداری و بازه‌های خرید
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className='px-2'>
                        <Tabs defaultValue="chart" className="w-full">
                            <div className="flex items-center justify-end mb-4 px-4">
                                <TabsList className="grid w-[100px] grid-cols-2 absolute top-5">
                                    <TabsTrigger value="chart"><ChartColumnBig className="h-4 w-4" /></TabsTrigger>
                                    <TabsTrigger value="table"><TableProperties className="h-4 w-4" /></TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="chart" className="mt-0">
                                {/* چارت دیتای کلی (Type 1) را می‌خواهد */}
                                <DashboardChart data={userLevels} />
                            </TabsContent>

                            <TabsContent value="table" className="mt-0">
                                {/* ✅✅✅ اصلاح شد: جدول دیتای بازه‌ها (Type 2) را می‌خواهد */}
                                <DashboardTable data={salesRanges} />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                {/* Coupons List */}
                <Card className='col-span-1 lg:col-span-3 shadow-sm border-border/60'>
                    <CardHeader>
                        <CardTitle>وضعیت کوپن‌ها و مناسبت‌ها</CardTitle>
                        <CardDescription>
                            آمار صدور و استفاده از کدهای تخفیف
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DashboardDiscount data={coupons} />
                    </CardContent>
                </Card>
            </div>
        </Tabs>
    )
}

// ... (Rest of the components: DashboardSkeleton, ErrorState, KpiCard, topNav remain the same)
function DashboardSkeleton() {
    return (
        <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="border-border/40">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-1/2 mb-2" />
                            <Skeleton className="h-3 w-3/4" />
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
                <Card className="col-span-1 lg:col-span-4 border-border/40">
                    <CardHeader>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-64" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[350px] w-full rounded-xl" />
                    </CardContent>
                </Card>
                <Card className="col-span-1 lg:col-span-3 border-border/40">
                    <CardHeader>
                        <Skeleton className="h-6 w-40 mb-2" />
                        <Skeleton className="h-4 w-56" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <div className="space-y-1.5">
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-3 w-16" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-4 w-8" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function ErrorState({ message, onRetry }) {
    return (
        <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
            <Alert variant="destructive" className="max-w-md bg-red-50/50 border-red-200 dark:bg-red-900/10 dark:border-red-900/50">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="mr-2">خطا در دریافت اطلاعات</AlertTitle>
                <AlertDescription className="mr-2 mt-1 opacity-90">
                    {message || "ارتباط با سرور برقرار نشد. لطفاً مجدداً تلاش کنید."}
                </AlertDescription>
            </Alert>
            <Button onClick={onRetry} variant="default" className="gap-2 shadow-lg shadow-primary/20">
                <RotateCw className="h-4 w-4" />
                تلاش مجدد
            </Button>
        </div>
    )
}

function KpiCard({ title, icon, value, description, trend }) {
    return (
        <Card className="hover:shadow-md transition-all duration-300 border-border/60 hover:border-border">
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium text-muted-foreground'>
                    {title}
                </CardTitle>
                <div className="p-2 bg-secondary/50 rounded-full">
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className='text-2xl font-bold font-mono tracking-tight'>{value}</div>
                <div className="flex items-center justify-between mt-1">
                    <p className='text-xs text-muted-foreground line-clamp-1'>
                        {description}
                    </p>
                    {trend && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 font-medium">
                            {trend}
                        </span>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

const topNav = [
    { title: 'نمای کلی', href: 'dashboard/overview', isActive: true },
    { title: 'مشتریان', href: 'dashboard/customers', isActive: false },
    { title: 'محصولات', href: 'dashboard/products', isActive: false },
    { title: 'تنظیمات', href: 'dashboard/settings', isActive: false },
]