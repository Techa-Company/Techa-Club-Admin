// import { Button } from '@/components/custom/button'

import Layout from '../layout/Layout'
import { UserNavbar } from '@/components/UserNavbar'
import { Search } from '@/components/Search'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/button'
import { DataTable } from '@/components/common/DataTable'
import { Link, useNavigate } from 'react-router-dom'
import { CheckPrize } from './components/CheckPrize'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ArrowUpDown, MoreHorizontalIcon } from 'lucide-react'
// import ThemeSwitch from '@/components/theme-switch'
// import { RecentSales } from './components/recent-sales'
// import { Overview } from './components/overview'



const data = [
    {
        id: 1,
        usage: "316",
        title: "تخفیف اول",
    },
    {
        id: 2,
        usage: "242",
        title: "تخفیف دوم",

    },
    {
        id: 3,
        usage: "837",
        title: "تخفیف سوم",
    },
    {
        id: 4,
        usage: "874",
        title: "تخفیف چهارم",
    },
    {
        id: 5,
        usage: "721",
        title: "تخفیف پنجم",
    },
    {
        id: 6,
        usage: "316",
        title: "تخفیف ششم",
    },
    {
        id: 7,
        usage: "242",
        title: "تخفیف هفتم",
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
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    عنوان
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
    },
    {
        accessorKey: "usage",
        header: () => <div >تعداد استفاده</div>,
        cell: ({ row }) => {


            return <div className="text-right font-medium">{row.getValue("usage")} بار</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        header: () => <div >عملیات</div>,

        cell: ({ row }) => {
            const payment = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">بازکردن</span>
                            <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuLabel>عملیات ها</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.title)}
                        >
                            کپی کردن عنوان
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link to={`edit/${payment.id}`}>ویرایش</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>حذف</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]



export default function PrizeShelf() {
    const navigate = useNavigate()
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
                    <h1 className='text-2xl font-bold tracking-tight'>لیست جایزه ها</h1>
                    <div className='flex items-center gap-3'>
                        {/* <Button >برسی کد جایزه</Button> */}
                        <CheckPrize />
                        <Button onClick={() => navigate("new")}>ایجاد جایزه</Button>
                    </div>
                </div>

                <DataTable data={data} columns={columns} filters={[{
                    value: "title",
                    placeholder: "عنوان"
                }]} />
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
