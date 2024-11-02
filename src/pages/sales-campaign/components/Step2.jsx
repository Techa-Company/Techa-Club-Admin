import { MultiSelect } from "@/components/common/MultiSelect";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const levels = [
    {
        value: "next.js",
        label: "بدون سطح",
    },
    {
        value: "sveltekit",
        label: "عادی",
    },
    {
        value: "nuxt.js",
        label: "برنزی",
    },
    {
        value: "remix",
        label: "نقره ای",
    },
    {
        value: "astro",
        label: "طلایی",
    },
    {
        value: "d",
        label: "ویژه",
    },
]

const Step2 = () => {

    const [value, setValue] = useState("")

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 font-medium">
            <div className="grid flex-1 gap-2">
                <MultiSelect
                    options={levels}
                    onValueChange={e => setValue(e.target.value)}
                    defaultValue={value}
                    placeholder="لیست مشتریان"
                    variant="inverted"
                    animation={2}
                    maxCount={2}
                />
            </div>
            <div className="grid flex-1 gap-2">
                <Select className="w-full"
                >
                    <SelectTrigger className="w-full text-gray-500">
                        <SelectValue placeholder="قالب پیامک" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="birthday">هدیه تولد</SelectItem>
                        <SelectItem value="teacher">روز معلم</SelectItem>
                        <SelectItem value="women">روز زن</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid flex-1 gap-2">
                <Textarea
                    id="textarea"
                    name="textarea"
                    placeholder="متن پیام"
                    rows="6"

                />
            </div>

        </div>
    );
};

export default Step2;