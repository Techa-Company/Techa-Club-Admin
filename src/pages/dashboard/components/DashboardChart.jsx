import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
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

const allData = [
    { label: "کاربران عادی", value: 500 },
    { label: "کاربران برنزی", value: 200 },
    { label: "کاربران نقره ای", value: 300 },
    { label: "کاربران طلایی", value: 700 },
    { label: "کاربران ویژه", value: 500 },
]

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
]


export const description = "An interactive bar chart"



const chartConfig = {
    views: {
        label: "تعداد کاربران",
    },
    all: {
        label: "همه کاربران",
        color: "hsl(var(--primary))",
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
    const [activeChart, setActiveChart] = React.useState("all")

    const total = React.useMemo(
        () => ({
            all: chartData.reduce((acc, curr) => acc + curr.normal + curr.bronze + curr.silver + curr.golden + curr.special, 0),
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
                    {["all", "normal", "bronze", "silver", "golden", "special"].map((key) => {
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
                {
                    activeChart === "all" ?
                        <ChartContainer
                            config={chartConfig}
                            className="aspect-auto h-[250px] w-full"
                        >
                            <BarChart
                                accessibilityLayer
                                data={allData}
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
                                <Bar className="cursor-pointer" dataKey="value" fill={`var(--color-${activeChart})`} />
                            </BarChart>
                        </ChartContainer>
                        :
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
                                    tickMargin={10}
                                    minTickGap={32}
                                    tickFormatter={(value) => {
                                        const [year, month, day] = value.split('-');
                                        // const persianMonth = persianMonths[Number(month) - 1]; // Convert month index to month name
                                        console.log(year)
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
                                <Bar className="cursor-pointer" dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                            </BarChart>
                        </ChartContainer>
                }
            </CardContent>
        </Card>
    )
}

export default DashboardChart;