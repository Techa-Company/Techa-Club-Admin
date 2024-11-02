// import { Button } from '@/components/custom/button'

import Layout from '../layout/Layout'
import { UserNavbar } from '@/components/UserNavbar'
import { Search } from '@/components/Search'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/button'
import { DataTable } from '@/components/common/DataTable'
import { AddPoll } from './components/AddPoll'
import { ArrowUpDown, Trash2 } from 'lucide-react'
import { EditPoll } from './components/EditPoll'
import { PollStatistics } from './components/PollStatistics'


const data = [
    {
        id: 1,
        title: "نظر سنجی معلمان",
        description: "معلمان",
        score: 5,
        from: "1403/12/12",
        to: "1402/08/12"
    },
    {
        id: 2,
        title: "کیفیت پاسخگویی",
        description: "دانشمندان",
        score: 3.5,
        from: "1403/12/12",
        to: "1402/08/12"

    },
    {
        id: 3,
        title: "تنوع فروشگاه",
        description: "محصولات",
        score: 4,
        from: "1403/12/12",
        to: "1402/08/12"

    },
    {
        id: 4,
        title: "رضایتمندی",
        description: "بهبود کیفیت",
        score: 1,
        from: "1403/12/12",
        to: "1402/08/12"
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
        accessorKey: "description",
        header: () => <div >توضیحات</div>,
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row.getValue("description")} </div>
        },
    },
    {
        accessorKey: "score",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    امتیاز
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("score")}</div>,
    },

    {
        accessorKey: "from",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    تاریخ ثبت
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div >{row.getValue("from")}</div>,
    },
    {
        accessorKey: "to",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    تاریخ انقضاء
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div >{row.getValue("to")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        header: () => <div >عملیات</div>,

        cell: () => (
            <div className='flex gap-2 items-center'>
                <PollStatistics />
                <EditPoll />
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
        value: "score",
        placeholder: "امتیاز"
    },
]

export default function Polls() {
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
                        <AddPoll />
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
