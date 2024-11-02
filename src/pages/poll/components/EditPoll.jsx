
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Pencil, PlusIcon, TrashIcon } from "lucide-react"
import { useState } from "react"

export function EditPoll() {
    const [date, setDate] = useState()

    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    const addTask = () => {
        if (task.trim()) {
            setTasks([...tasks, task]);
            setTask(''); // Clear the input field
        }
    };

    const removeTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Pencil className="text-primary cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader >
                    <DialogTitle>ویرایش نظرسنجی</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 items-center gap-5">
                    <div className="grid flex-1 gap-2">
                        <Input placeholder="عنوان" />
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
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="ml-2 h-4 w-4 text-gray-500" />
                                    {date ? format(date, "PPP") : <span className="text-gray-500">تاریخ انقضا</span>}
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
                        <div className="relative inline-block">
                            <Input
                                type="text"
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                placeholder="افزودن سوال"
                                className="pl-10" // Make space for the button
                            />
                            <Button
                                onClick={addTask}
                                className="absolute left-0 top-0 h-full rounded-r-none flex items-center justify-center">
                                <PlusIcon className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                    <div className="grid flex-1 gap-2 col-span-2">
                        <Textarea rows="5" placeholder="توضیحات" />
                    </div>
                    <div className="grid flex-1 gap-2 col-span-2">
                        <ul className="space-y-2 overflow-y-auto max-h-48">
                            {tasks.map((task, index) => (
                                <li key={index} className="flex justify-between items-center border px-5 p-2 rounded-lg">
                                    <span>{task}</span>


                                    <TrashIcon className="w-5 h-5 text-red-500 cursor-pointer" onClick={() => removeTask(index)} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex justify-end gap-5 mt-5">
                    <Button className="px-5" type="button">
                        ویرایش
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
