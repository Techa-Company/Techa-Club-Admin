import { Button } from "@/components/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

const Step3 = () => {

    const [date, setDate] = useState()
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-10 font-medium">
            <div className="grid flex-1 gap-2">
                <Input placeholder="عنوان" disabled />
            </div>
            <div className="grid flex-1 gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            disabled
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                // !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="ml-2 h-4 w-4 text-gray-500" />
                            {date ? format(date, "PPP") : <span className="text-gray-500">تاریخ شروع</span>}
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
                            disabled
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="ml-2 h-4 w-4 text-gray-500" />
                            {date ? format(date, "PPP") : <span className="text-gray-500">تاریخ پایان</span>}
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
                <Input type="number" placeholder="درصد تخفیف" disabled />
            </div>
            <div className="grid flex-1 gap-2">
                <Input type="number" placeholder="حداکثر مبلغ تخفیف (تومان)" disabled />
            </div>
            <div className="grid flex-1 gap-2">
                <Input type="number" placeholder="تعداد کاربران" disabled />
            </div>
            <div className="grid flex-1 gap-2">
                <Input type="number" placeholder="متن پیام" disabled />
            </div>
            <div className="grid flex-1 gap-2">
                <Label className="flex items-center gap-2 cursor-pointer">
                    <Input type="checkbox" className='w-5 h-5 accent-primary' />
                    <span>
                        با شرایط و ضوابط موافقم.
                    </span>
                </Label>
            </div>
        </div>
    );
};

export default Step3;