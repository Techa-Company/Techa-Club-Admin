
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ChartNoAxesCombined } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"


const allData = [
    { label: "شنبه", value: 5 },
    { label: "یکشنبه", value: 6 },
    { label: "دوشنبه", value: 4 },
    { label: "سه شنبه", value: 5 },
    { label: "چهارشنبه", value: 7 },
    { label: "پنجشنبه", value: 8 },
    { label: "جعمه", value: 11 },
]

const chartConfig = {
    views: {
        label: "شرکت کنندگان",
    },
    all: {
        label: "همه کاربران",
        color: "hsl(var(--primary))",
    },
}

export function PollStatistics() {



    return (
        <Dialog>
            <DialogTrigger asChild>
                <ChartNoAxesCombined className="text-green-500 cursor-pointer w-7 h-7" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader >
                    <DialogTitle>آمار نظرسنجی</DialogTitle>
                </DialogHeader>
                <div>
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[250px] w-full"
                    >
                        <BarChart
                            accessibilityLayer
                            data={[...allData].reverse()}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="label"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                minTickGap={32}
                                tickFormatter={(value) => value}
                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        className="w-[150px]"
                                        nameKey="views"
                                        labelFormatter={(value) => value}
                                    />
                                }
                            />
                            <Bar className="cursor-pointer" dataKey="value" fill={`#22c55e`} />
                        </BarChart>
                    </ChartContainer>
                </div>
                <div className="flex justify-end gap-5 mt-5">
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
