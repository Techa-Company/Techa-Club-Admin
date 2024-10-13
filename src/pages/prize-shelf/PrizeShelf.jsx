// import { Button } from '@/components/custom/button'

import Layout from '../layout/Layout'
import { UserNavbar } from '@/components/UserNavbar'
import { Search } from '@/components/Search'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/button'
// import ThemeSwitch from '@/components/theme-switch'
// import { RecentSales } from './components/recent-sales'
// import { Overview } from './components/overview'




export default function PrizeShelf() {
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
                    <h1 className='text-2xl font-bold tracking-tight'>لیست جایزه ها</h1>
                    <div className='flex items-center space-x-2'>
                        <Button>ایجاد جایزه</Button>
                    </div>
                </div>

                <>
                    <div className="md:hidden">
                        <img
                            src="/examples/tasks-light.png"
                            width={1280}
                            height={998}
                            alt="Playground"
                            className="block dark:hidden"
                        />
                        <img
                            src="/examples/tasks-dark.png"
                            width={1280}
                            height={998}
                            alt="Playground"
                            className="hidden dark:block"
                        />
                    </div>
                    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                        <div className="flex items-center justify-between space-y-2">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                                <p className="text-muted-foreground">
                                    Here&apos;s a list of your tasks for this month!
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <UserNav />
                            </div>
                        </div>
                        <DataTable data={tasks} columns={columns} />
                    </div>
                </>
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
