import { Button } from "@/components/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

const Step1 = () => {

    const [date, setDate] = useState()
    const [dropdown, setDropdown] = useState("price")
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-10 font-medium">
            <div className="grid flex-1 gap-2">
                <Input placeholder="عنوان" />
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
                <Select className="w-full"
                    value={dropdown}
                    onValueChange={e => setDropdown(e)}
                >
                    <SelectTrigger className="w-full text-gray-500">
                        <SelectValue placeholder="نوع تخفیف" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="price">مبلغ</SelectItem>
                        <SelectItem value="percent">درصد</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {
                dropdown === "price" ?
                    <>
                        <div className="grid flex-1 gap-2">
                            <Input type="number" placeholder="مبلغ تخفیف" />
                        </div>
                        <div className="grid flex-1 gap-2">
                            <Input type="number" placeholder="حداقل میزان خرید" />
                        </div>
                    </>
                    :
                    <>
                        <div className="grid flex-1 gap-2">
                            <Input type="number" placeholder="درصد تخفیف" />
                        </div>
                        <div className="grid flex-1 gap-2">
                            <Input type="number" placeholder="حداکثر مبلغ تخفیف (تومان)" />
                        </div>
                    </>
            }
        </div>
    );
};

export default Step1;