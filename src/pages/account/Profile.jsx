// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Avatar } from "@/components/ui/avatar";
// import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { Search } from "@/components/Search";
import { UserNavbar } from "@/components/UserNavbar";
import Layout from "../layout/Layout";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Profile() {
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
                <Card>
                    <CardHeader className="px-4 space-y-6 md:px-6">
                        <header className="space-y-1.5">
                            <div className="flex items-center gap-4">
                                <Avatar className='h-20 w-20'>
                                    <AvatarImage src='https://avatars.githubusercontent.com/u/91675032?v=4' alt='رامین' />
                                    <AvatarFallback className="text-3xl">RJ</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1.5">
                                    <h1 className="text-2xl font-bold">رامین جوشنگ</h1>
                                    <p className="text-gray-500 dark:text-gray-400">برنامه نویس</p>
                                </div>
                            </div>
                        </header>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold">اطلاعات شخصی</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="name">نام</Label>
                                    <Input id="name" placeholder="نام خود را وارد کنید" defaultValue="رامین جوشنگ" />
                                </div>
                                <div>
                                    <Label htmlFor="email">ایمیل</Label>
                                    <Input id="email" placeholder="ایمیل خود را وارد کنید" type="email" />
                                </div>
                                <div>
                                    <Label htmlFor="phone">تلفن </Label>
                                    <Input id="phone" placeholder="تلفن خود را وارد کنید" type="tel" />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold">تغییر رمز عبور</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="current-password">رمز عبور فعلی</Label>
                                    <Input id="current-password" placeholder="رمز عبور فعلی را وارد کنید" type="password" />
                                </div>
                                <div>
                                    <Label htmlFor="new-password">رمز عبور جدید</Label>
                                    <Input id="new-password" placeholder="رمز عبور جدید را وارد کنید" type="password" />
                                </div>
                                <div>
                                    <Label htmlFor="confirm-password">تکرار رمز عبور جدید</Label>
                                    <Input id="confirm-password" placeholder="تکرار رمز عبور جدید را وارد کنید" type="password" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <Button className="px-5">ذخیره</Button>
                        </div>
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>

    );
};


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
