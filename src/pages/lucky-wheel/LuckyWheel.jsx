// import { Button } from '@/components/custom/button'

import Layout from '../layout/Layout'
import { UserNavbar } from '@/components/UserNavbar'
import { Search } from '@/components/Search'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/button'
import { DataTable } from '@/components/common/DataTable'
import { AddLuckyWheel } from './components/AddLuckyWheel'
import { ArrowUpDown, Trash2 } from 'lucide-react'
import { EditLuckyWheel } from './components/EditLuckyWheel'


const data = [
    {
        id: 1,
        title: "سفر به مشهد",
        type: "سفر",
        color: "#FFF000",
        status: true,
    },
    {
        id: 2,
        title: "سفر به مکه",
        type: "سفر",
        color: "#FFF000",
        status: false,

    },
    {
        id: 3,
        title: "بلیط سینما",
        type: "تماشا",
        color: "#FFF000",
        status: false,
    },
    {
        id: 4,
        title: "پوچ",
        type: "تلاش مجدد",
        color: "#FFF000",
        status: true,
    },
    {
        id: 5,
        title: "تخفیف 50 درصدی بیمه",
        type: "کد تخفیف",
        color: "#FFF000",
        status: false,
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
        accessorKey: "type",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    نوع
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("type")}</div>,
    },
    {
        accessorKey: "color",
        header: () => <div >رنگ</div>,
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row.getValue("color")} </div>
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    وضعیت
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div >{row.getValue("status") ? "فعال" : "غیر فعال"}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        header: () => <div >عملیات</div>,

        cell: () => (
            <div className='flex gap-2 items-center'>
                <EditLuckyWheel />
                <Trash2 className='cursor-pointer text-red-500' />
            </div>
        )
    },
]

const filters = [
    {
        value: "title",
        placeholder: "عنوان"
    },
    {
        value: "type",
        placeholder: "نوع"
    },
    {
        value: "status",
        placeholder: "وضعیت"
    }
]

export default function Customers() {
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
                    <h1 className='text-2xl font-bold tracking-tight'>گردونه شانس</h1>
                    <div className='flex items-center gap-3'>
                        {/* <Button >برسی کد جایزه</Button> */}
                        <AddLuckyWheel />
                    </div>
                </div>

                <DataTable data={data} columns={columns} filters={filters} />
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
