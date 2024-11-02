// import { Button } from '@/components/custom/button'

import Layout from '../layout/Layout'
import { UserNavbar } from '@/components/UserNavbar'
import { Search } from '@/components/Search'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/button'
import { DataTable } from '@/components/common/DataTable'
import { ArrowUpDown, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


const data = [
    {
        id: 1,
        title: "ویژه روز معلم",
        from: "140308/05",
        to: "1403/08/010",
        users: 800,
        message: "روزت مبارک",

    },
    {
        id: 2,
        title: "جشنواره پاییزه",
        from: "140308/05",
        to: "1403/08/010",
        users: 15300,
        message: "پاییز همراه با تخفیف",


    },
    {
        id: 3,
        title: "هالوین",
        from: "140308/05",
        to: "1403/08/010",
        users: 15000,
        message: "جشنواره ویژه هالوین",

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
        accessorKey: "from",
        header: () => <div >تاریخ شروع</div>,
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row.getValue("from")} </div>
        },
    },
    {
        accessorKey: "to",
        header: () => {
            return (
                <Button
                    variant="ghost"
                >
                    تاریخ پایان
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("to")}</div>,
    },
    {
        accessorKey: "users",
        header: () => <div >تعداد کاربران</div>,
        cell: ({ row }) => {


            return <div className="text-right font-medium">{row.getValue("users").toLocaleString()}</div>
        },
    },
    {
        accessorKey: "message",
        header: () => <div >متن پیام</div>,
        cell: ({ row }) => {


            return <div className="text-right font-medium">{row.getValue("message")}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        header: () => <div >عملیات</div>,

        cell: () => (
            <div className='flex gap-2 items-center'>
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

]

export default function SalesCampaign() {

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
                    <h1 className='text-2xl font-bold tracking-tight'>لیست کمپین ها</h1>
                    <div className='flex items-center gap-3'>
                        <Button onClick={() => navigate("new")}>ایجاد کمپین</Button>
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
