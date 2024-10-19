import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Pencil } from "lucide-react"


export function EditSMSTemplate() {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Pencil className="text-primary cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader >
                    <DialogTitle>ویرایش قالب پیامکی</DialogTitle>
                    {/* <DialogDescription>
                        شماره های مورد نظر را انتخاب کنید و پیام مورد نظر خود را ارسال کنید.
                    </DialogDescription> */}
                </DialogHeader>
                <div className="grid gap-5 mt-5">
                    <Input type="text" placeholder="عنوان پیام" />

                    <Textarea
                        id="textarea"
                        name="textarea"
                        placeholder="متن پیام"
                        rows="6"
                    // value={formData.textarea}
                    // onChange={handleChange}
                    />
                    <Button type="button" className="px-10">
                        ویرایش
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}
