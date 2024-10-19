// import { Button } from '@/components/custom/button'

import Layout from '../layout/Layout'
import { UserNavbar } from '@/components/UserNavbar'
import { Search } from '@/components/Search'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/button'
import { DataTable } from '@/components/common/DataTable'
import { SendSMS } from './components/SendSMS'
import { ArrowUpDown } from 'lucide-react'


const data = [
    {
        id: 1,
        mobile: "09195993264",
        messageType: "نوع اول",
        date: "1402/05/15",
        status: "ارسال شده"

    },
    {
        id: 2,
        mobile: "09125693214",
        messageType: "نوع دوم",
        date: "1402/08/15",
        status: "ارسال شده"


    },
    {
        id: 3,
        mobile: "0918653258",
        messageType: "نوع سوم",
        date: "1402/01/15",
        status: "ارسال شده"

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
        accessorKey: "mobile",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    شماره موبایل
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div >{row.getValue("mobile")}</div>,
    },
    {
        accessorKey: "messageType",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    نوع پیام
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {


            return <div className="text-right font-medium">{row.getValue("messageType")}</div>
        },
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
    {
        accessorKey: "status",
        header: () => <div >وضعیت</div>,
        cell: ({ row }) => {


            return <div className="text-right font-medium">{row.getValue("status")} </div>
        },
    },
]

const filters = [
    {
        value: "mobile",
        placeholder: "موبایل"
    },
    {
        value: "messageType",
        placeholder: "نوع پیام"
    },
    {
        value: "date",
        placeholder: "تاریخ"
    }
]

export default function PrizeShelf() {
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
                    <h1 className='text-2xl font-bold tracking-tight'>گزارش پیامک ها</h1>
                    <div className='flex items-center gap-3'>
                        {/* <Button >برسی کد جایزه</Button> */}
                        <SendSMS />
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
