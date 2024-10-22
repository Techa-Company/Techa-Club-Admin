// import { Button } from '@/components/custom/button'

import Layout from '../layout/Layout'
import { UserNavbar } from '@/components/UserNavbar'
import { Search } from '@/components/Search'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/button'
import { DataTable } from '@/components/common/DataTable'
import { AddCustomer } from './components/AddCustomer'
import { ArrowUpDown, Eye } from 'lucide-react'
import { EditCustomer } from './components/EditCustomer'


const data = [
    {
        id: 1,
        name: "رامین جوشنگ",
        mobile: "09195993264",
        level: "عادی",
        activeCoupons: 5,
        usedCoupons: 6,

    },
    {
        id: 2,
        name: "رامین جوشنگ",
        mobile: "09195993264",
        level: "عادی",
        activeCoupons: 5,
        usedCoupons: 6,


    },
    {
        id: 3,
        name: "رامین جوشنگ",
        mobile: "09195993264",
        level: "عادی",
        activeCoupons: 5,
        usedCoupons: 6,

    },
    {
        id: 4,
        name: "رامین جوشنگ",
        mobile: "09195993264",
        level: "عادی",
        activeCoupons: 5,
        usedCoupons: 6,

    },
    {
        id: 5,
        name: "رامین جوشنگ",
        mobile: "09195993264",
        level: "عادی",
        activeCoupons: 5,
        usedCoupons: 6,

    },
    {
        id: 6,
        name: "رامین جوشنگ",
        mobile: "09195993264",
        level: "عادی",
        activeCoupons: 5,
        usedCoupons: 6,

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
        accessorKey: "level",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    سطح
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("level")}</div>,
    },
    {
        accessorKey: "activeCoupons",
        header: () => <div >کوپن های استفاده شده</div>,
        cell: ({ row }) => {


            return <div className="text-right font-medium">{row.getValue("activeCoupons")}</div>
        },
    },
    {
        accessorKey: "usedCoupons",
        header: () => <div >کوپن های استفاده شده</div>,
        cell: ({ row }) => {


            return <div className="text-right font-medium">{row.getValue("usedCoupons")}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        header: () => <div >عملیات</div>,

        cell: () => (
            <div className='flex gap-2 items-center'>
                <Eye className='cursor-pointer text-muted-foreground' />
                <EditCustomer />
            </div>
        )
    },
]

const filters = [
    {
        value: "name",
        placeholder: "نام"
    },
    {
        value: "level",
        placeholder: "سطح"
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
                    <h1 className='text-2xl font-bold tracking-tight'>لیست مشتریان</h1>
                    <div className='flex items-center gap-3'>
                        {/* <Button >برسی کد جایزه</Button> */}
                        <AddCustomer />
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
