
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"

export function AddCustomer() {
    const [date, setDate] = useState()


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="px-5">افزودن مشتری</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader >
                    <DialogTitle>افزودن مشتری جدید</DialogTitle>
                    <DialogDescription>
                        اطلاعات مشتری را کامل وارد کنید.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 items-center gap-5">
                    <div className="grid flex-1 gap-2">
                        <Input placeholder="نام" />
                    </div>
                    <div className="grid flex-1 gap-2">
                        <Input placeholder="نام خانوادگی" />
                    </div>
                    <div className="grid flex-1 gap-2">
                        <Input placeholder="شماره همراه" />
                    </div>
                    <div className="grid flex-1 gap-2">
                        <Select className="w-full">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="جنسیت" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="man">مرد</SelectItem>
                                <SelectItem value="woman">زن</SelectItem>
                            </SelectContent>
                        </Select>
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
                                    {date ? format(date, "PPP") : <span>تاریخ تولد</span>}
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
                                    {date ? format(date, "PPP") : <span>تاریخ ازدواج</span>}
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
