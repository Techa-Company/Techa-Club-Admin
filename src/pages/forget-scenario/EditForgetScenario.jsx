import Layout from '../layout/Layout'
import { UserNavbar } from '@/components/UserNavbar'
import { Search } from '@/components/Search'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/button'
import { ArrowUpDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { EditableDataTable } from '@/components/common/EditableDataTable'


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
        cell: ({ row }) => <Input value={row.getValue("discountPercentage")} />,
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
        cell: ({ row }) => <Input value={row.getValue("maximumDiscount")} />,
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
            return <Input value={row.getValue("discountPrice")} />
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
        cell: ({ row }) => <Input value={row.getValue("minimumPurchase")} />,
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
        cell: ({ row }) => <Input value={row.getValue("lastPurchase")} />,
    },
]



export default function EditForgetScenario() {
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
                    <h1 className='text-2xl font-bold tracking-tight'>ویرایش سناریو های فراموشی</h1>
                </div>
                <EditableDataTable data={data} columns={columns} />
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
