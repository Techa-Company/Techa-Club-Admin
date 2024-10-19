// import { Button } from '@/components/custom/button'

import Layout from '../layout/Layout'
import { UserNavbar } from '@/components/UserNavbar'
import { Search } from '@/components/Search'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { useDropzone } from 'react-dropzone'
import { Card } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'


export default function AddPrizeShelf() {
    const navigate = useNavigate();
    const onDrop = (acceptedFiles) => {
        console.log(acceptedFiles); // You can handle your files here
    };

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });

    const [formData, setFormData] = useState({
        textInput: '',
        numberInput: '',
        textarea: '',
    });

    const handleChange = (e) => {
        console.log(e)
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        // Handle form submission logic here
    };



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
                <div className='mb-2'>
                    <h1 className='text-2xl font-bold tracking-tight'>ویرایش جایزه</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5 mt-10">
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>

                        <div>
                            <Label className="pr-3" htmlFor="title">عنوان</Label>
                            <Input
                                className="mt-1"
                                id="title"
                                name="title"
                                value={formData.textInput}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label className="pr-3" htmlFor="neededScore">امتیاز مورد نیاز</Label>
                            <Input
                                className="mt-1"
                                id="neededScore"
                                name="neededScore"
                                value={formData.textInput}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label className="pr-3" htmlFor="scoreTime">مدت اعتبار جایزه (روز)</Label>
                            <Input
                                className="mt-1"
                                id="scoreTime"
                                name="scoreTime"
                                type="number"
                                value={formData.numberInput}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex gap-5 justify-between pt-5'>
                            <div className="flex items-center" >
                                <Switch id="airplane-mode"
                                    checked={formData.switchChecked}
                                    onChange={handleChange}
                                    className="ml-2" style={{ direction: "ltr" }} />
                                <Label htmlFor="airplane-mode">آیا کالا هست ؟</Label>
                            </div>
                            <div className="flex items-center" >
                                <Switch id="airplane-mode"
                                    checked={formData.switchChecked}
                                    onChange={handleChange}
                                    className="ml-2" style={{ direction: "ltr" }} />
                                <Label htmlFor="airplane-mode">آیا درصد تخفیف است ؟</Label>
                            </div>
                        </div>
                        <div>
                            <Label className="pr-3" htmlFor="neededScore">درصد تخفیف</Label>
                            <Input
                                className="mt-1"
                                id="neededScore"
                                name="neededScore"
                                value={formData.textInput}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label className="pr-3" htmlFor="scoreTime">حداکثر مبلغ تخفیف (تومان)</Label>
                            <Input
                                className="mt-1"
                                id="scoreTime"
                                name="scoreTime"
                                type="number"
                                value={formData.numberInput}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>

                        <Card className="flex flex-col items-center justify-center border border-dashed p-4" {...getRootProps()}>
                            <input {...getInputProps()} />

                            <p >تصویر خود را بکشید و در اینجا رها کنید، یا کلیک کنید.</p>
                            <Button variant="default" className="mt-4">
                                کلیک کنید
                            </Button>
                            <p className='mt-5'>
                                {acceptedFiles[0]?.path}
                            </p>
                        </Card>
                        <div>
                            <Label htmlFor="textarea">توضیحات</Label>
                            <Textarea
                                id="textarea"
                                name="textarea"
                                className="mt-1"
                                rows="6"
                                value={formData.textarea}
                                onChange={handleChange}
                            />
                        </div>
                    </div>


                    <div className='flex gap-2'>
                        <Button className='px-5' type="submit">ویرایش</Button>
                        <Button className='px-5' variant='outline' type="button" onClick={() => navigate("/prize-shelf")}>لغو</Button>
                    </div>
                </form>
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
