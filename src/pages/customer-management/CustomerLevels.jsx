import Layout from '../layout/Layout'
import { UserNavbar } from '@/components/UserNavbar'
import { Search } from '@/components/Search'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/button'
import { Input } from '@/components/ui/input'
import { EditableDataTable } from '@/components/common/EditableDataTable'


const data = [
    {
        bronze: "1000000",
        silver: "5000000",
        golden: "15000000",
        special: "20000000",
    },
]


const columns = [
    {
        accessorKey: "bronze",
        header: () => {
            return (
                <Button
                    variant="ghost"
                >
                    برنزی
                </Button>
            )
        },
        cell: ({ row }) => {
            return <Input value={row.getValue("bronze")} />
        },
    },
    {
        accessorKey: "silver",
        header: () => {
            return (
                <Button
                    variant="ghost"
                >
                    نقره ای
                </Button>
            )
        },
        cell: ({ row }) => <Input value={row.getValue("silver")} />,
    },
    {
        accessorKey: "golden",
        header: () => {
            return (
                <Button
                    variant="ghost"
                >
                    طلایی
                </Button>
            )
        },
        cell: ({ row }) => <Input value={row.getValue("golden")} />,
    },
    {
        accessorKey: "special",
        header: () => {
            return (
                <Button
                    variant="ghost"
                >
                    ویژه
                </Button>
            )
        },
        cell: ({ row }) => {
            return <Input value={row.getValue("special")} />
        },
    },

]



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
                <div className='mb-2 flex items-center justify-between space-y-2'>
                    <h1 className='text-2xl font-bold tracking-tight'>سطح بندی مشتریان</h1>
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
