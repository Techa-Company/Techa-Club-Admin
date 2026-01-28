import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"

// کانفیگ رنگ‌ها (استفاده از متغیرهای CSS یا کدهای رنگی جذاب)
const chartConfig = {
    "بدون سطح": { label: "بدون سطح", colorStart: "#94a3b8", colorEnd: "#475569" }, // Slate
    "عادی": { label: "عادی", colorStart: "#3b82f6", colorEnd: "#1d4ed8" }, // Blue
    "برنزی": { label: "برنزی", colorStart: "#d97706", colorEnd: "#92400e" }, // Amber/Bronze
    "نقره ای": { label: "نقره ای", colorStart: "#9ca3af", colorEnd: "#4b5563" }, // Gray/Silver
    "طلائی": { label: "طلایی", colorStart: "#eab308", colorEnd: "#a16207" }, // Yellow/Gold
    "ویژه": { label: "ویژه", colorStart: "#ef4444", colorEnd: "#b91c1c" }, // Red
}

// تابع کمکی برای حذف کاما و تبدیل به عدد
const parseNum = (str) => Number(str?.toString().replace(/,/g, '')) || 0;

function DashboardChart({ data }) {
    // پردازش دیتا
    const chartData = React.useMemo(() => {
        if (!data || !Array.isArray(data)) return [];
        return data.map(item => ({
            name: item.f1,
            count: parseNum(item.f3),
            // مقادیر رنگ برای گرادینت
            colorStart: chartConfig[item.f1]?.colorStart || "#3b82f6",
            colorEnd: chartConfig[item.f1]?.colorEnd || "#1d4ed8",
        }));
    }, [data]);

    const totalUsers = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.count, 0);
    }, [chartData]);

    // کامپوننت تولتیپ سفارشی و خفن
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const percentage = totalUsers > 0 ? ((data.count / totalUsers) * 100).toFixed(1) : 0;

            return (
                <div className="bg-popover/95 backdrop-blur-sm border border-border p-3 rounded-lg shadow-xl outline-none">
                    <p className="font-bold text-foreground mb-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: data.colorStart }}></span>
                        {label}
                    </p>
                    <div className="flex flex-col gap-1 text-sm">
                        <div className="flex justify-between gap-4">
                            <span className="text-muted-foreground">تعداد:</span>
                            <span className="font-mono font-bold">{data.count.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                            <span className="text-muted-foreground">سهم:</span>
                            <span className="font-mono font-bold text-emerald-500">{percentage}%</span>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="shadow-sm border-border/50 overflow-hidden h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b bg-muted/20">
                <div className="flex flex-col gap-1">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        توزیع کاربران
                    </CardTitle>
                    <CardDescription>نمودار سطح‌بندی مشتریان فروشگاه</CardDescription>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">مجموع کاربران</span>
                    <span className="text-2xl font-bold font-mono text-primary">
                        {totalUsers.toLocaleString()}
                    </span>
                </div>
            </CardHeader>
            <CardContent className="p-1 sm:p-6">
                <div className="h-[300px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} barSize={40}>
                            {/* تعریف گرادینت‌ها */}
                            <defs>
                                {chartData.map((entry, index) => (
                                    <linearGradient key={`grad-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={entry.colorStart} stopOpacity={1} />
                                        <stop offset="100%" stopColor={entry.colorEnd} stopOpacity={1} />
                                    </linearGradient>
                                ))}
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />

                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tickMargin={15}
                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                            />

                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(value) => `${value}`}
                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                            />

                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted)/0.2)' }} />

                            <Bar dataKey="count" radius={[8, 8, 0, 0]} animationDuration={1500}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

export default DashboardChart;