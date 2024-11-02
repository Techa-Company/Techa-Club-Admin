import Layout from '../layout/Layout'
import { UserNavbar } from '@/components/UserNavbar'
import { Search } from '@/components/Search'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/button'
import { DataTable } from '@/components/common/DataTable'
import { ArrowUpDown, Trash2 } from 'lucide-react'
import { AddSetting } from './components/AddSetting'


const data = [
    {
        id: 1,
        logo: "https://cdn.dribbble.com/users/1787323/screenshots/16687587/media/1ba604e54d89af7d66ee78e927a72f7e.png",
        description: "به پنل ما خوش آمدید",
        keywords: "رامین، جوشنگ، باشگاه مشتریان"
    }
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
        accessorKey: "logo",
        header: () => {
            return (
                <Button
                    variant="ghost"
                >
                    لوگو
                </Button>
            )
        },
        cell: ({ row }) => {
            return <img className="w-20" src={row.getValue("logo")} />
        },
    },
    {
        accessorKey: "description",
        header: "توضیحات",
        cell: ({ row }) => <div >{row.getValue("description")}</div>,
    },
    {
        accessorKey: "keywords",
        header: "کلمات کلیدی",
        cell: ({ row }) => <div >{row.getValue("keywords")}</div>,
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

]

export default function Setting() {
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
                    <h1 className='text-2xl font-bold tracking-tight'>تنظیمات مشتریان</h1>
                    <div className='flex items-center gap-3'>
                        {/* <Button >برسی کد جایزه</Button> */}
                        <AddSetting />
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
