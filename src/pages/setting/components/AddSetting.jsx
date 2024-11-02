
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { useDropzone } from "react-dropzone"

export function AddSetting() {

    const onDrop = (acceptedFiles) => {
        console.log(acceptedFiles); // You can handle your files here
    };

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="px-5">افزودن تنظیمات</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader >
                    <DialogTitle>ایجاد یا ویرایش تنظیمات</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 items-center gap-5 mt-5">
                    <div className="grid flex-1 gap-2">
                        <Input placeholder="توضیحات" />
                    </div>
                    <div className="grid flex-1 gap-2">
                        <Input placeholder="کلمات کلیدی" />
                    </div>
                    <div className="grid flex-1 gap-2 col-span-2">
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
                    </div>
                </div>
                <div className="flex justify-end gap-5 mt-5">
                    <Button className="px-5" type="button">
                        ثبت
                    </Button>
                    <DialogClose asChild>
                        <Button className="px-5" type="button" variant="outline" >
                            بستن
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}
