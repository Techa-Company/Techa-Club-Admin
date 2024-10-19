import { MultiSelect } from "@/components/common/MultiSelect"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"


const frameworks = [
    {
        value: "next.js",
        label: "رامین جوشنگ",
    },
    {
        value: "sveltekit",
        label: "امیرحسین چگینی",
    },
    {
        value: "nuxt.js",
        label: "مهدی هوشمندی",
    },
    {
        value: "remix",
        label: "محسن مردانی فر",
    },
    {
        value: "astro",
        label: "امیررضا رمضانی",
    },
]

export function SendSMS() {

    const [value, setValue] = useState("")

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button >ارسال پیامک جدید</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader >
                    <DialogTitle>ارسال پیامک</DialogTitle>
                    <DialogDescription>
                        شماره های مورد نظر را انتخاب کنید و پیام مورد نظر خود را ارسال کنید.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-5 mt-5">
                    <Label htmlFor="link" className="sr-only">
                        سلام
                    </Label>
                    <MultiSelect
                        options={frameworks}
                        onValueChange={e => setValue(e.target.value)}
                        defaultValue={value}
                        placeholder="لیست مشتریان"
                        variant="inverted"
                        animation={2}
                        maxCount={2}
                    />
                    <Textarea
                        id="textarea"
                        name="textarea"
                        placeholder="متن پیام"
                        rows="6"
                    // value={formData.textarea}
                    // onChange={handleChange}
                    />
                    <Button type="button" className="px-10">
                        ارسال
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}
