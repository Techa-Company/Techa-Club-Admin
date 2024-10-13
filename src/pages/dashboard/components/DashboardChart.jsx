import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const persianMonths = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
];

const chartData = [
    { date: "1403-1-1", normal: 10, bronze: 5, silver: 5, golden: 10, special: 120 },
    { date: "1403-2-1", normal: 20, bronze: 10, silver: 10, golden: 20, special: 110 },
    { date: "1403-3-1", normal: 30, bronze: 15, silver: 20, golden: 30, special: 100 },
    { date: "1403-4-1", normal: 40, bronze: 20, silver: 10, golden: 40, special: 90 },
    { date: "1403-5-1", normal: 50, bronze: 25, silver: 5, golden: 50, special: 80 },
    { date: "1403-6-1", normal: 60, bronze: 30, silver: 10, golden: 60, special: 70 },
    { date: "1403-7-1", normal: 70, bronze: 35, silver: 20, golden: 60, special: 60 },
    { date: "1403-8-1", normal: 20, bronze: 40, silver: 10, golden: 50, special: 50 },
    { date: "1403-9-1", normal: 40, bronze: 45, silver: 5, golden: 40, special: 40 },
    { date: "1403-10-1", normal: 60, bronze: 50, silver: 10, golden: 30, special: 30 },
    { date: "1403-11-1", normal: 80, bronze: 75, silver: 20, golden: 20, special: 20 },
    { date: "1403-12-1", normal: 100, bronze: 100, silver: 10, golden: 10, special: 10 },
    // { date: "2024-04-08", normal: 409, bronze: 320 },
    // { date: "2024-04-09", normal: 59, bronze: 110 },
    // { date: "2024-04-10", normal: 261, bronze: 190 },
    // { date: "2024-04-11", normal: 327, bronze: 350 },
    // { date: "2024-04-12", normal: 292, bronze: 210 },
    // { date: "2024-04-13", normal: 342, bronze: 380 },
    // { date: "2024-04-14", normal: 137, bronze: 220 },
    // { date: "2024-04-15", normal: 120, bronze: 170 },
    // { date: "2024-04-16", normal: 138, bronze: 190 },
    // { date: "2024-04-17", normal: 446, bronze: 360 },
    // { date: "2024-04-18", normal: 364, bronze: 410 },
    // { date: "2024-04-19", normal: 243, bronze: 180 },
    // { date: "2024-04-20", normal: 89, bronze: 150 },
    // { date: "2024-04-21", normal: 137, bronze: 200 },
    // { date: "2024-04-22", normal: 224, bronze: 170 },
    // { date: "2024-04-23", normal: 138, bronze: 230 },
    // { date: "2024-04-24", normal: 387, bronze: 290 },
    // { date: "2024-04-25", normal: 215, bronze: 250 },
    // { date: "2024-04-26", normal: 75, bronze: 130 },
    // { date: "2024-04-27", normal: 383, bronze: 420 },
    // { date: "2024-04-28", normal: 122, bronze: 180 },
    // { date: "2024-04-29", normal: 315, bronze: 240 },
    // { date: "2024-04-30", normal: 454, bronze: 380 },
    // { date: "2024-05-01", normal: 165, bronze: 220 },
    // { date: "2024-05-02", normal: 293, bronze: 310 },
    // { date: "2024-05-03", normal: 247, bronze: 190 },
    // { date: "2024-05-04", normal: 385, bronze: 420 },
    // { date: "2024-05-05", normal: 481, bronze: 390 },
    // { date: "2024-05-06", normal: 498, bronze: 520 },
    // { date: "2024-05-07", normal: 388, bronze: 300 },
    // { date: "2024-05-08", normal: 149, bronze: 210 },
    // { date: "2024-05-09", normal: 227, bronze: 180 },
    // { date: "2024-05-10", normal: 293, bronze: 330 },
    // { date: "2024-05-11", normal: 335, bronze: 270 },
    // { date: "2024-05-12", normal: 197, bronze: 240 },
    // { date: "2024-05-13", normal: 197, bronze: 160 },
    // { date: "2024-05-14", normal: 448, bronze: 490 },
    // { date: "2024-05-15", normal: 473, bronze: 380 },
    // { date: "2024-05-16", normal: 338, bronze: 400 },
    // { date: "2024-05-17", normal: 499, bronze: 420 },
    // { date: "2024-05-18", normal: 315, bronze: 350 },
    // { date: "2024-05-19", normal: 235, bronze: 180 },
    // { date: "2024-05-20", normal: 177, bronze: 230 },
    // { date: "2024-05-21", normal: 82, bronze: 140 },
    // { date: "2024-05-22", normal: 81, bronze: 120 },
    // { date: "2024-05-23", normal: 252, bronze: 290 },
    // { date: "2024-05-24", normal: 294, bronze: 220 },
    // { date: "2024-05-25", normal: 201, bronze: 250 },
    // { date: "2024-05-26", normal: 213, bronze: 170 },
    // { date: "2024-05-27", normal: 420, bronze: 460 },
    // { date: "2024-05-28", normal: 233, bronze: 190 },
    // { date: "2024-05-29", normal: 78, bronze: 130 },
    // { date: "2024-05-30", normal: 340, bronze: 280 },
    // { date: "2024-05-31", normal: 178, bronze: 230 },
    // { date: "2024-06-01", normal: 178, bronze: 200 },
    // { date: "2024-06-02", normal: 470, bronze: 410 },
    // { date: "2024-06-03", normal: 103, bronze: 160 },
    // { date: "2024-06-04", normal: 439, bronze: 380 },
    // { date: "2024-06-05", normal: 88, bronze: 140 },
    // { date: "2024-06-06", normal: 294, bronze: 250 },
    // { date: "2024-06-07", normal: 323, bronze: 370 },
    // { date: "2024-06-08", normal: 385, bronze: 320 },
    // { date: "2024-06-09", normal: 438, bronze: 480 },
    // { date: "2024-06-10", normal: 155, bronze: 200 },
    // { date: "2024-06-11", normal: 92, bronze: 150 },
    // { date: "2024-06-12", normal: 492, bronze: 420 },
    // { date: "2024-06-13", normal: 81, bronze: 130 },
    // { date: "2024-06-14", normal: 426, bronze: 380 },
    // { date: "2024-06-15", normal: 307, bronze: 350 },
    // { date: "2024-06-16", normal: 371, bronze: 310 },
    // { date: "2024-06-17", normal: 475, bronze: 520 },
    // { date: "2024-06-18", normal: 107, bronze: 170 },
    // { date: "2024-06-19", normal: 341, bronze: 290 },
    // { date: "2024-06-20", normal: 408, bronze: 450 },
    // { date: "2024-06-21", normal: 169, bronze: 210 },
    // { date: "2024-06-22", normal: 317, bronze: 270 },
    // { date: "2024-06-23", normal: 480, bronze: 530 },
    // { date: "2024-06-24", normal: 132, bronze: 180 },
    // { date: "2024-06-25", normal: 141, bronze: 190 },
    // { date: "2024-06-26", normal: 434, bronze: 380 },
    // { date: "2024-06-27", normal: 448, bronze: 490 },
    // { date: "2024-06-28", normal: 149, bronze: 200 },
    // { date: "2024-06-29", normal: 103, bronze: 160 },
    // { date: "2024-06-30", normal: 446, bronze: 400 },
]


export const description = "An interactive bar chart"



const chartConfig = {
    views: {
        label: "تعداد کاربران",
    },
    normal: {
        label: "کاربران عادی",
        color: "hsl(var(--primary))",
    },
    bronze: {
        label: "کاربران برنزی",
        color: "hsl(var(--chart-1))",
    },
    silver: {
        label: "کاربران نقره ای",
        color: "hsl(var(--chart-4))",
    },
    golden: {
        label: "کاربران طلایی",
        color: "hsl(var(--chart-2))",
    },
    special: {
        label: "کاربران ویژه",
        color: "hsl(var(--chart-3))",
    },
}

function DashboardChart() {
    const [activeChart, setActiveChart] = React.useState("normal")

    const total = React.useMemo(
        () => ({
            normal: chartData.reduce((acc, curr) => acc + curr.normal, 0),
            bronze: chartData.reduce((acc, curr) => acc + curr.bronze, 0),
            silver: chartData.reduce((acc, curr) => acc + curr.silver, 0),
            golden: chartData.reduce((acc, curr) => acc + curr.golden, 0),
            special: chartData.reduce((acc, curr) => acc + curr.special, 0),
        }),
        []
    )

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0">

                <div className="flex flex-wrap">
                    {["normal", "bronze", "silver", "golden", "special"].map((key) => {
                        const chart = key
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="relative z-30 flex flex-1 min-w-fit flex-col justify-center items-center gap-1 border-t px-5 py-4 even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-xs text-muted-foreground">
                                    {chartConfig[chart].label}
                                </span>
                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                    {/* {total[key].toLocaleString()} */}
                                    {total[key]?.toLocaleString()}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </CardHeader>
            <CardContent className="p-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const [year, month, day] = value.split('-');
                                const persianMonth = persianMonths[Number(month) - 1]; // Convert month index to month name
                                console.log(value, month, persianMonth)
                                return `${day}  ${persianMonths[Number(month) - 1]}`
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        const [year, month, day] = value.split('-');
                                        const persianMonth = persianMonths[Number(month) - 1]; // Convert month index to month name
                                        console.log(value, month, persianMonth)
                                        return `${day}  ${persianMonths[Number(month) - 1]} ${year}`
                                    }}
                                />
                            }
                        />
                        <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default DashboardChart;