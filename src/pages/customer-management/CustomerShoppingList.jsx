// import { Button } from '@/components/custom/button'

import Layout from '../layout/Layout'
import { UserNavbar } from '@/components/UserNavbar'
import { Search } from '@/components/Search'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/button'
import { DataTable } from '@/components/common/DataTable'
import { ArrowUpDown } from 'lucide-react'


const data = [
    {
        id: 1,
        name: "رامین جوشنگ",
        mobile: "09195993264",
        date: "1402/05/13",
        price: "5000",
    },
    {
        id: 2,
        name: "رامین جوشنگ",
        mobile: "09195993264",
        date: "1402/11/18",
        price: "3540000",

    },
    {
        id: 3,
        name: "رامین جوشنگ",
        mobile: "09195993264",
        date: "1402/03/13",
        price: "80000",
    },
    {
        id: 4,
        name: "رامین جوشنگ",
        mobile: "09195993264",
        date: "1401/05/13",
        price: "250000",
    },
    {
        id: 5,
        name: "رامین جوشنگ",
        mobile: "09195993264",
        date: "1400/12/12",
        price: "3600000",
    },
    {
        id: 6,
        name: "دکتر جوشنگ",
        mobile: "09195993264",
        date: "1402/02/05",
        price: "100000",
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
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    نام و نام خانوادگی
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "mobile",
        header: () => <div >شماره موبایل</div>,
        cell: ({ row }) => {


            return <div className="text-right font-medium">{row.getValue("mobile")} </div>
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
        cell: ({ row }) => <div >{row.getValue("date")}</div>,
    },
    {
        accessorKey: "price",
        header: () => <div >مبلغ</div>,
        cell: ({ row }) => {


            return <div className="text-right font-medium">{Number(row.getValue("price")).toLocaleString()}</div>
        },
    },
]

const filters = [
    {
        value: "name",
        placeholder: "نام"
    },
    {
        value: "date",
        placeholder: "تاریخ"
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
                    <h1 className='text-2xl font-bold tracking-tight'>لیست خرید مشتریان</h1>
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
