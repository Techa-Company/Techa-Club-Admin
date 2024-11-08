import Layout from '../layout/Layout'
import { UserNavbar } from '@/components/UserNavbar'
import { Search } from '@/components/Search'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/button'
import { DataTable } from '@/components/common/DataTable'
import { ArrowUpDown } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'


const data = [
    {
        id: 1,
        title: "کد تخفیف اول",
        mobile: "09195993264",
        type: "نوع اول",
        icon: "https://cdn.dribbble.com/users/1787323/screenshots/16687587/media/c3a6fa9c8f0779a0bdd4236fd7b4d63f.png",
        code: "100",
        from: "1403/05/15",
        to: "1403/05/15",

    },
    {
        id: 2,
        title: "کد تخفیف اول",
        mobile: "09195993264",
        type: "نوع دوم",
        icon: "https://cdn.dribbble.com/users/1787323/screenshots/16687587/media/c3a6fa9c8f0779a0bdd4236fd7b4d63f.png",
        code: "100",
        from: "1403/05/15",
        to: "1403/05/15",

    },
    {
        id: 3,
        title: "کد تخفیف اول",
        mobile: "09195993264",
        type: "نوع سوم",
        icon: "https://cdn.dribbble.com/users/1787323/screenshots/16687587/media/c3a6fa9c8f0779a0bdd4236fd7b4d63f.png",
        code: "100",
        from: "1403/05/15",
        to: "1403/05/15",

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
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row.getValue("title")}</div>
        },
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
        accessorKey: "type",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    نوع
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div >{row.getValue("type")}</div>,
    },
    {
        accessorKey: "code",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    کد تخفیف
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div >{row.getValue("code")}</div>,
    },
    {
        accessorKey: "icon",
        header: () => {
            return (
                <Button
                    variant="ghost"
                >
                    آیکون
                </Button>
            )
        },
        cell: ({ row }) => {
            return <img className="w-20 rounded" src={row.getValue("icon")} />
        },
    },
    {
        accessorKey: "from",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    تاریخ استفاده
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
                    تاریخ انقضا
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div >{row.getValue("to")}</div>,
    },
]

const filters = [
    {
        value: "title",
        placeholder: "عنوان"
    },
    {
        value: "type",
        placeholder: "نوع"
    }
]

export default function DiscountCode() {
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
                <Tabs
                    orientation='vertical'
                    defaultValue='active'
                    className='space-y-4'
                >
                    <div className='mb-2 flex items-center justify-between space-y-2'>
                        <h1 className='text-2xl font-bold tracking-tight'>کد های تخفیف</h1>
                        <div className='overflow-x-auto pb-2'>
                            <TabsList>
                                <TabsTrigger value='active'>فعال</TabsTrigger>
                                <TabsTrigger value='used'>استفاده شده</TabsTrigger>
                                <TabsTrigger value='expired'>منقضی شده</TabsTrigger>
                            </TabsList>
                        </div>
                    </div>
                    <TabsContent value="active" >
                        <DataTable data={data} columns={columns} filters={filters} />
                    </TabsContent>
                    <TabsContent value="used">
                        <DataTable data={data} columns={columns} filters={filters} />
                    </TabsContent>
                    <TabsContent value="expired">
                        <DataTable data={data} columns={columns} filters={filters} />
                    </TabsContent>
                </Tabs>
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
