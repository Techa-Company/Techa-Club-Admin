// import { Button } from '@/components/custom/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Layout from '../layout/Layout'
import { UserNavbar } from '@/components/UserNavbar'
import { Search } from '@/components/Search'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/button'
import DashboardChart from './components/DashboardChart'
import { ChartColumnBig, CreditCard, Package, TableProperties, TicketPercent, Users } from 'lucide-react'
import DashboardTable from './components/DashboardTable'
import DashboardDiscount from './components/DashboardDiscount'
// import ThemeSwitch from '@/components/theme-switch'
// import { RecentSales } from './components/recent-sales'
// import { Overview } from './components/overview'




export default function Dashboard() {
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
                <div className='mb-2 flex items-center justify-between space-y-2'>
                    <h1 className='text-2xl font-bold tracking-tight'>داشبورد</h1>
                    <div className='flex items-center space-x-2'>
                        <Button>دانلود</Button>
                    </div>
                </div>
                <Tabs
                    orientation='vertical'
                    defaultValue='overview'
                    className='space-y-4'
                >
                    <div className='w-full overflow-x-auto pb-2 hidden'>
                        <TabsList>
                            <TabsTrigger value='overview'>Overview</TabsTrigger>
                            <TabsTrigger value='analytics'>Analytics</TabsTrigger>
                            <TabsTrigger value='reports'>Reports</TabsTrigger>
                            <TabsTrigger value='notifications'>Notifications</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value='overview' className='space-y-4'>
                        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                            <Card>
                                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                    <CardTitle className='text-sm font-medium'>
                                        تعداد مشتریان
                                    </CardTitle>
                                    <Users className='h-5 w-5 text-muted-foreground' />
                                </CardHeader>
                                <CardContent>
                                    <div className='text-2xl font-bold'>125,554 نفر</div>
                                    <p className='text-sm text-muted-foreground'>
                                        <span className='text-green-500'>+20.1%</span> نسبت به ماه گذشته
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                    <CardTitle className='text-sm font-medium'>تعداد فروش</CardTitle>
                                    <Package className='h-5 w-5 text-muted-foreground' />

                                </CardHeader>
                                <CardContent>
                                    <div className='text-2xl font-bold'>12,320 کالا</div>
                                    <p className='text-sm text-muted-foreground'>
                                        <span className='text-red-500'>-19%</span> نسبت به ماه گذشته
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                    <CardTitle className='text-sm font-medium'>
                                        کد های تخفیف فعال
                                    </CardTitle>
                                    <TicketPercent className='h-5 w-5 text-muted-foreground' />

                                </CardHeader>
                                <CardContent>
                                    <div className='text-2xl font-bold'>5 کد</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                    <CardTitle className='text-sm font-medium'>
                                        شارژ پنل
                                    </CardTitle>
                                    <CreditCard className='h-5 w-5 text-muted-foreground' />
                                </CardHeader>
                                <CardContent>
                                    <div className='text-2xl font-bold'>1,000,000 تومان</div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
                            <Card className='col-span-1 lg:col-span-4 relative'>
                                <CardHeader>
                                    {/* <CardTitle>Overview</CardTitle> */}
                                    <div className="flex flex-1 flex-col justify-center gap-1 px-6">
                                        <CardTitle>سطح کاربران</CardTitle>
                                        <CardDescription>
                                            تغییرات تعداد کاربران در سال گذشته
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className='pl-2'>
                                    <Tabs defaultValue="chart" >
                                        <TabsList className="grid grid-cols-2 absolute top-7 left-5 h-12">
                                            <TabsTrigger value="chart">
                                                <ChartColumnBig />
                                            </TabsTrigger>
                                            <TabsTrigger value="table">
                                                <TableProperties />
                                            </TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="chart">
                                            {/* <Overview /> */}
                                            <DashboardChart />
                                        </TabsContent>
                                        <TabsContent value="table">
                                            <DashboardTable />
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>
                            <Card className='col-span-1 lg:col-span-3'>
                                <CardHeader>
                                    <CardTitle>کد های تخفیف</CardTitle>
                                    <CardDescription>
                                        آخرین کد های تخفیف
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <DashboardDiscount />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </Layout.Body>
        </Layout>
    )
}

const topNav = [
    {
        title: 'نمای کلی',
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
        title: 'تنظیمات',
        href: 'dashboard/settings',
        isActive: false,
    },
]
