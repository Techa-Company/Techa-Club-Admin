import Layout from '../layout/Layout'
import { UserNavbar } from '@/components/UserNavbar'
import { Search } from '@/components/Search'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/button'
import { DataTable } from '@/components/common/DataTable'
import { ArrowUpDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


const data = [
    {
        id: 1,
        level: "عادی",
        discountPercentage: "10000",
        maximumDiscount: "13000",
        discountPrice: "100",
        minimumPurchase: "3",
        lastPurchase: "8",

    },
    {
        id: 1,
        level: "برنزی",
        discountPercentage: "200000",
        maximumDiscount: "5000",
        discountPrice: "100",
        minimumPurchase: "350000",
        lastPurchase: "3",

    },
    {
        id: 1,
        level: "نقره ای",
        discountPercentage: "350000",
        maximumDiscount: "12000",
        discountPrice: "35000",
        minimumPurchase: "150000",
        lastPurchase: "5",
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
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row.getValue("level")}</div>
        },
    },
    {
        accessorKey: "discountPercentage",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    درصد تخفیف
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div >{row.getValue("discountPercentage")} % </div>,
    },
    {
        accessorKey: "maximumDiscount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    مبلغ تخفیف
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div >{Number(row.getValue("maximumDiscount")).toLocaleString()}</div>,
    },
    {
        accessorKey: "discountPrice",
        header: ({ column }) => {
            return (
                <Button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}

                    variant="ghost"
                >
                    حداکثر ملبغ تخفیف
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div >{Number(row.getValue("discountPrice")).toLocaleString()}</div>
        },
    },
    {
        accessorKey: "minimumPurchase",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    حداقل میزان خرید
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div >{Number(row.getValue("minimumPurchase")).toLocaleString()}</div>,
    },
    {
        accessorKey: "lastPurchase",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    آخرین خرید
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div >{row.getValue("lastPurchase")} روز قبل</div>,
    },
]

const filters = [
    {
        value: "level",
        placeholder: "سطح"
    }
]

export default function ForgetScenario() {

    const navigate = useNavigate();

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
                    <h1 className='text-2xl font-bold tracking-tight'>سناریو های فراموشی</h1>
                    <Button className='px-5' onClick={() => navigate("edit")}>ویرایش</Button>
                </div>
                <DataTable data={data} columns={columns} filters={filters} />
            </Layout.Body>
        </Layout>
    )
}

const topNav = [
    {
        level: 'خانه',
        href: 'dashboard/overview',
        isActive: true,
    },
    {
        level: 'مشتریان',
        href: 'dashboard/customers',
        isActive: false,
    },
    {
        level: 'محصولات',
        href: 'dashboard/products',
        isActive: false,
    },
    {
        level: 'تنظیمات',
        href: 'dashboard/settings',
        isActive: false,
    },
]
