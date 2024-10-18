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


export default function AddPrizeShelf() {

    const onDrop = (acceptedFiles) => {
        console.log(acceptedFiles); // You can handle your files here
    };

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });

    const [formData, setFormData] = useState({
        textInput: '',
        numberInput: '',
        textarea: '',
        switchChecked: false,
    });

    const handleChange = (e) => {
        console.log(e)
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
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
                    <h1 className='text-2xl font-bold tracking-tight'>افزودن جایزه جدید</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5 mt-10">
                    <div className='grid grid-cols-3 gap-5'>

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
                    </div>
                    <div className="flex items-center" >
                        <Switch id="airplane-mode"
                            checked
                            className="ml-2" style={{ direction: "ltr" }} />
                        <Label htmlFor="airplane-mode">آیا کالا هست ؟</Label>
                    </div>
                    <div className='grid grid-cols-2 gap-5'>

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



                    <Button type="submit">Submit</Button>
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
