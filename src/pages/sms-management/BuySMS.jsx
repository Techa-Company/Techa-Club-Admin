// import { Button } from '@/components/custom/button'

import Layout from '../layout/Layout'
import { UserNavbar } from '@/components/UserNavbar'
import { Search } from '@/components/Search'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/button'
import { DataTable } from '@/components/common/DataTable'
import { ArrowUpDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IconHexagonNumber0, IconHexagonNumber1, IconHexagonNumber2, IconHexagonNumber3, IconHexagonNumber5 } from '@tabler/icons-react'
import { Link } from 'react-router-dom'


const data = [
    {
        id: 1,
        charge: "100",
        price: 150000,
        date: "1403/05/15",

    },
    {
        id: 2,
        charge: "300",
        price: 400000,
        date: "1402/08/15",


    },
    {
        id: 3,
        charge: "500",
        price: 650000,
        date: "1403/02/15",
    },

]


const columns = [

    {
        accessorKey: "id",
        header: "ردیف",
        cell: ({ row }) => (
            <div >{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "charge",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    شارژ
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {


            return <div className="text-right font-medium">{Number(row.getValue("charge")).toLocaleString()} عددی </div>
        },
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    مبلغ
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div >{Number(row.getValue("price")).toLocaleString()} تومان</div>,
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    تاریخ
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {


            return <div className="text-right font-medium">{row.getValue("date")} </div>
        },
    },
]

const filters = [
    {
        value: "charge",
        placeholder: "شارژ"
    }
]

export default function BuySMS() {
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
                    <h1 className='text-2xl font-bold tracking-tight'>خرید بسته پیامکی</h1>
                </div>
                <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-10'>
                    <Link to="#">
                        <Card className="hover:border-primary">
                            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                <CardTitle className='text-sm font-medium'>بسته 100 عددی</CardTitle>
                                <div className='flex flex-row-reverse'>
                                    <IconHexagonNumber1 className='h-8 w-8 text-muted-foreground' />
                                    <IconHexagonNumber0 className='h-8 w-8 text-muted-foreground' />
                                    <IconHexagonNumber0 className='h-8 w-8 text-muted-foreground' />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className='text-2xl font-bold'><span className='text-primary'>150,000</span> تومان</div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link to="#">
                        <Card className="hover:border-primary">
                            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                <CardTitle className='text-sm font-medium'>بسته 200 عددی</CardTitle>
                                <div className='flex flex-row-reverse'>
                                    <IconHexagonNumber2 className='h-8 w-8 text-muted-foreground' />
                                    <IconHexagonNumber0 className='h-8 w-8 text-muted-foreground' />
                                    <IconHexagonNumber0 className='h-8 w-8 text-muted-foreground' />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className='text-2xl font-bold'><span className='text-primary'>280,000</span> تومان</div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link to="#">
                        <Card className="hover:border-primary">
                            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                <CardTitle className='text-sm font-medium'>بسته 300 عددی</CardTitle>
                                <div className='flex flex-row-reverse'>
                                    <IconHexagonNumber3 className='h-8 w-8 text-muted-foreground' />
                                    <IconHexagonNumber0 className='h-8 w-8 text-muted-foreground' />
                                    <IconHexagonNumber0 className='h-8 w-8 text-muted-foreground' />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className='text-2xl font-bold'><span className='text-primary'>400,000</span> تومان</div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link to="#">
                        <Card className="hover:border-primary">
                            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                <CardTitle className='text-sm font-medium'>بسته 500 عددی</CardTitle>
                                <div className='flex flex-row-reverse'>
                                    <IconHexagonNumber5 className='h-8 w-8 text-muted-foreground' />
                                    <IconHexagonNumber0 className='h-8 w-8 text-muted-foreground' />
                                    <IconHexagonNumber0 className='h-8 w-8 text-muted-foreground' />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className='text-2xl font-bold'><span className='text-primary'>650,000</span> تومان</div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
                <div className='mt-10'>
                    <h1 className='text-2xl font-bold tracking-tight'>بسته های خریداری شده</h1>
                    <DataTable data={data} columns={columns} filters={filters} />
                </div>
            </Layout.Body>
        </Layout>
    )
}

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
        title: 'تنظیمات',
        href: 'dashboard/settings',
        isActive: false,
    },
]
