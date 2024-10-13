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
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { bronze, golden, normal, silver, special } from '@/data/tableData'
import { CreditCard, Package, TicketPercent, Users } from 'lucide-react'
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
                                    <p className='text-xs text-muted-foreground'>
                                        +20.1% نسبت به ماه گذشته
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
                                    <p className='text-xs text-muted-foreground'>
                                        +19% نسبت به ماه گذشته
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
                            <Card className='col-span-1 lg:col-span-4'>
                                <CardHeader>
                                    {/* <CardTitle>Overview</CardTitle> */}
                                    <div className="flex flex-1 flex-col justify-center gap-1 px-6">
                                        <CardTitle>سطح کاربران - تعاملی</CardTitle>
                                        <CardDescription>
                                            نمایش کل بازدید کنندگان در یکسال گذشته
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className='pl-2'>
                                    {/* <Overview /> */}
                                    <DashboardChart />
                                </CardContent>
                            </Card>
                            <Card className='col-span-1 lg:col-span-3'>
                                <CardHeader>
                                    <CardTitle>سطح کاربران</CardTitle>
                                    <CardDescription>
                                        نمایش سطح کاربران در یک نگاه
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Tabs
                                        orientation='vertical'
                                        defaultValue='normal'
                                        className='space-y-4'
                                    >
                                        <div className='w-full overflow-x-auto pb-2'>
                                            <TabsList>
                                                <TabsTrigger value='normal'>عادی</TabsTrigger>
                                                <TabsTrigger value='bronze'>برنزی</TabsTrigger>
                                                <TabsTrigger value='silver'>نقره ای</TabsTrigger>
                                                <TabsTrigger value='golden'>طلایی</TabsTrigger>
                                                <TabsTrigger value='special'>ویژه</TabsTrigger>
                                            </TabsList>
                                        </div>
                                        <TabsContent value="normal">
                                            <Table>
                                                <TableCaption>لیستی از کاربران سطح عادی</TableCaption>
                                                <TableHeader >
                                                    <TableRow>
                                                        <TableHead className="text-right font-semibold px-0 pr-3">شروع مبلغ ماهانه</TableHead>
                                                        <TableHead className="text-right font-semibold px-0 pr-3">پایان مبلغ ماهانه</TableHead>
                                                        <TableHead className="text-right font-semibold px-0 pr-3">تعداد مشتریان</TableHead>
                                                        <TableHead className="text-right font-semibold px-0 pr-3">سطح</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {normal.map((data) => (
                                                        <TableRow key={data.from}>
                                                            <TableCell className="font-medium px-5">{data.from.toLocaleString()}</TableCell>
                                                            <TableCell className="px-5">{data.to.toLocaleString()}</TableCell>
                                                            <TableCell className="px-5">{data.users}</TableCell>
                                                            <TableCell className="px-5">{data.level}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TabsContent>
                                        <TabsContent value="bronze">
                                            <Table>
                                                <TableCaption>لیستی از کاربران سطح برنزی</TableCaption>
                                                <TableHeader >
                                                    <TableRow>
                                                        <TableHead className="text-right font-semibold px-0 pr-3">شروع مبلغ ماهانه</TableHead>
                                                        <TableHead className="text-right font-semibold px-0 pr-3">پایان مبلغ ماهانه</TableHead>
                                                        <TableHead className="text-right font-semibold px-0 pr-3">تعداد مشتریان</TableHead>
                                                        <TableHead className="text-right font-semibold px-0 pr-3">سطح</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {bronze.map((data) => (
                                                        <TableRow key={data.from}>
                                                            <TableCell className="font-medium px-5">{data.from.toLocaleString()}</TableCell>
                                                            <TableCell className="px-5">{data.to.toLocaleString()}</TableCell>
                                                            <TableCell className="px-5">{data.users}</TableCell>
                                                            <TableCell className="px-5">{data.level}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TabsContent>
                                        <TabsContent value="silver">
                                            <Table>
                                                <TableCaption>لیستی از کاربران سطح نقره ای</TableCaption>
                                                <TableHeader >
                                                    <TableRow>
                                                        <TableHead className="text-right font-semibold px-0 pr-3">شروع مبلغ ماهانه</TableHead>
                                                        <TableHead className="text-right font-semibold px-0 pr-3">پایان مبلغ ماهانه</TableHead>
                                                        <TableHead className="text-right font-semibold px-0 pr-3">تعداد مشتریان</TableHead>
                                                        <TableHead className="text-right font-semibold px-0 pr-3">سطح</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {silver.map((data) => (
                                                        <TableRow key={data.from}>
                                                            <TableCell className="font-medium px-5">{data.from.toLocaleString()}</TableCell>
                                                            <TableCell className="px-5">{data.to.toLocaleString()}</TableCell>
                                                            <TableCell className="px-5">{data.users}</TableCell>
                                                            <TableCell className="px-5">{data.level}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TabsContent>
                                        <TabsContent value="golden">
                                            <Table>
                                                <TableCaption>لیستی از کاربران سطح طلایی</TableCaption>
                                                <TableHeader >
                                                    <TableRow>
                                                        <TableHead className="text-right font-semibold px-0 pr-3">شروع مبلغ ماهانه</TableHead>
                                                        <TableHead className="text-right font-semibold px-0 pr-3">پایان مبلغ ماهانه</TableHead>
                                                        <TableHead className="text-right font-semibold px-0 pr-3">تعداد مشتریان</TableHead>
                                                        <TableHead className="text-right font-semibold px-0 pr-3">سطح</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {golden.map((data) => (
                                                        <TableRow key={data.from}>
                                                            <TableCell className="font-medium px-5">{data.from.toLocaleString()}</TableCell>
                                                            <TableCell className="px-5">{data.to.toLocaleString()}</TableCell>
                                                            <TableCell className="px-5">{data.users}</TableCell>
                                                            <TableCell className="px-5">{data.level}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TabsContent>
                                        <TabsContent value="special">
                                            <Table>
                                                <TableCaption>لیستی از کاربران سطح ویژه</TableCaption>
                                                <TableHeader >
                                                    <TableRow>
                                                        <TableHead className="text-right font-semibold px-0 pr-3">شروع مبلغ ماهانه</TableHead>
                                                        <TableHead className="text-right font-semibold px-0 pr-3">پایان مبلغ ماهانه</TableHead>
                                                        <TableHead className="text-right font-semibold px-0 pr-3">تعداد مشتریان</TableHead>
                                                        <TableHead className="text-right font-semibold px-0 pr-3">سطح</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {special.map((data) => (
                                                        <TableRow key={data.from}>
                                                            <TableCell className="font-medium px-5">{data.from.toLocaleString()}</TableCell>
                                                            <TableCell className="px-5">{data.to.toLocaleString()}</TableCell>
                                                            <TableCell className="px-5">{data.users}</TableCell>
                                                            <TableCell className="px-5">{data.level}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TabsContent>
                                    </Tabs>
                                    {/* <RecentSales /> */}


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
