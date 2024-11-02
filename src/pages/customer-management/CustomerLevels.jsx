import Layout from '../layout/Layout'
import { UserNavbar } from '@/components/UserNavbar'
import { Search } from '@/components/Search'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/button'
import { DataTable } from '@/components/common/DataTable'
import { ArrowUpDown } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AddCustomerLevel } from './components/AddCustomerLevel'


const data = [
    {
        id: 1,
        title: "عادی",
        from: 0,
        to: 10000,
    },
    {
        id: 2,
        title: "برنزی",
        from: 10000,
        to: 500000,
    },
    {
        id: 3,
        title: "نقره ای",
        from: 500000,
        to: 1000000,
    },
    {
        id: 4,
        title: "طلایی",
        from: 1000000,
        to: 5000000,
    },
    {
        id: 5,
        title: "ویژه",
        from: 5000000,
        to: 10000000,
    },
]


const columns = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ردیف
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            )
        },
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
                    عنوان سطح
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className='pr-3'>{row.getValue("title")}</div>,
    },
    {
        accessorKey: "from",
        header: () => <div >حداقل خرید</div>,
        cell: ({ row }) => {


            return <div className="text-right font-medium">{Number(row.getValue("from")).toLocaleString()} </div>
        },
    },
    {
        accessorKey: "to",
        header: () => {
            return (
                <Button
                    variant="ghost"
                >
                    حداکثر خرید
                </Button>
            )
        },
        cell: ({ row }) => <div className='pr-5'>{Number(row.getValue("to")).toLocaleString()}</div>,
    },

]

const filters = [];

export default function CustomerLevels() {
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
                <div className='mb-2 flex flex-wrap items-center justify-between'>
                    <h1 className='text-2xl font-bold tracking-tight'>سطح بندی مشتریان</h1>
                    <AddCustomerLevel />
                </div>
                <div className='flex items-center gap-2 font-medium text-sm sm:text-[16px] mt-5'>
                    بر اساس میزان خرید
                    <Select defaultValue='apple'>
                        <SelectTrigger className="w-[110px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>بازه زمانی</SelectLabel>
                                <SelectItem value="apple" >ماهانه</SelectItem>
                                <SelectItem value="banana">سه ماهه</SelectItem>
                                <SelectItem value="blueberry">شش ماهه</SelectItem>
                                <SelectItem value="grapes">سالانه</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    مشتری (تومان)
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
