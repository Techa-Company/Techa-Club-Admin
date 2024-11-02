import Layout from '../layout/Layout'
import { UserNavbar } from '@/components/UserNavbar'
import { Search } from '@/components/Search'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/button'
import { DataTable } from '@/components/common/DataTable'
import { ArrowUpDown, Trash2 } from 'lucide-react'
import { AddBanner } from './components/AddBanner'
import { EditBanner } from './components/EditBanner'


const data = [
    {
        id: 1,
        image: "https://d39l2hkdp2esp1.cloudfront.net/img/photo/276766/276766_00_2x.jpg?20230817094604",
        link: "techa.me",
        status: true,
    },
    {
        id: 2,
        image: "https://d39l2hkdp2esp1.cloudfront.net/img/photo/276856/276856_00_2x.jpg?20230824115607",
        link: "techa.me",
        status: false,
    },
    {
        id: 3,
        image: "https://d39l2hkdp2esp1.cloudfront.net/img/photo/276770/276770_00_2x.jpg?20230817094521",
        link: "techa.me",
        status: false,
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
        accessorKey: "image",
        header: () => {
            return (
                <Button
                    variant="ghost"
                >
                    تصویر
                </Button>
            )
        },
        cell: ({ row }) => {
            return <img className="w-96 rounded" src={row.getValue("image")} />
        },
    },
    {
        accessorKey: "link",
        header: "لینک",
        cell: ({ row }) => <div >{row.getValue("link")}</div>,
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
        cell: ({ row }) => <div>{row.getValue("status") ? "فعال" : "غیرفعال"}</div>,
    },

    {
        id: "actions",
        enableHiding: false,
        header: () => <div >عملیات</div>,

        cell: () => (
            <div className='flex gap-2 items-center'>
                <EditBanner />
                <Trash2 className='cursor-pointer text-red-500' />
            </div>
        )
    },
]

const filters = [
    {
        value: "status",
        placeholder: "وضعیت"
    }
]

export default function Banners() {
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
                    <h1 className='text-2xl font-bold tracking-tight'>بنر ها</h1>
                    <div className='flex items-center gap-3'>
                        {/* <Button >برسی کد جایزه</Button> */}
                        <AddBanner />
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
