
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"

export function AddLuckyWheel() {
    const [date, setDate] = useState()


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="px-5">افزودن گزینه</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader >
                    <DialogTitle>افزودن گزینه جدید</DialogTitle>
                    <DialogDescription>
                        اطلاعت گزینه مورد نظر خود را وارد کنید.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 items-center gap-5">
                    <div className="grid flex-1 gap-2">
                        <Input placeholder="عنوان" />
                    </div>
                    <div className="grid flex-1 gap-2">
                        <Input type="color" placeholder="رنگ" />
                    </div>
                    <div className="grid flex-1 gap-2">
                        <Input placeholder="نوع" />
                    </div>
                    <div className="grid flex-1 gap-2">
                        <Input type="number" placeholder="امتیاز" />
                    </div>
                    <div className="grid flex-1 gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        // !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>تاریخ شروع</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid flex-1 gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        // !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>تاریخ پایان</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid flex-1 gap-2">
                        <Input type="number" placeholder="درصد" />
                    </div>
                    <div className="grid flex-1 gap-2">
                        <Input type="number" placeholder="مبلغ" />
                    </div>
                    <div className="grid flex-1 gap-2">
                        <Input type="number" placeholder="حداقل مبلغ" />
                    </div>
                    <div className="grid flex-1 gap-2">
                        <Input type="number" placeholder="حداکثر مبلغ" />
                    </div>
                    <div className="grid flex-1 gap-2 col-span-2">
                        <Textarea rows="5" placeholder="توضیحات" />
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
