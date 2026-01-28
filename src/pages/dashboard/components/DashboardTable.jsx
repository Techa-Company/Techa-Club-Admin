import React, { useMemo } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// کانفیگ سطوح
const LEVEL_CONFIG = {
    '5': { key: 'none', label: 'بدون سطح', color: 'bg-slate-500', text: 'text-slate-500' },
    '0': { key: 'normal', label: 'عادی', color: 'bg-blue-500', text: 'text-blue-500' },
    '1': { key: 'bronze', label: 'برنزی', color: 'bg-orange-600', text: 'text-orange-600' },
    '2': { key: 'silver', label: 'نقره ای', color: 'bg-gray-400', text: 'text-gray-400' },
    '3': { key: 'golden', label: 'طلایی', color: 'bg-yellow-500', text: 'text-yellow-500' },
    '4': { key: 'special', label: 'ویژه', color: 'bg-red-500', text: 'text-red-500' },
};

// تابع کمکی برای تبدیل عدد رشته‌ای (مثل 1,000,000) به عدد جاوااسکریپت
const parsePrice = (str) => {
    if (!str) return 0;
    if (typeof str === 'number') return str;
    return Number(str.toString().replace(/,/g, '')) || 0;
};

const DashboardTable = ({ data }) => {
    // 1. گروه‌بندی و مرتب‌سازی دیتا
    console.log(data)
    const groupedData = useMemo(() => {
        if (!data || !Array.isArray(data)) return {};

        const groups = {};
        Object.keys(LEVEL_CONFIG).forEach(id => {
            const levelKey = LEVEL_CONFIG[id].key;

            // فیلتر: پیدا کردن تمام آیتم‌هایی که f4 آن‌ها برابر id سطح است
            let items = data.filter(item => String(item.f4) === String(id));

            // مرتب‌سازی: چیدن بازه‌ها از مبلغ کم به زیاد بر اساس f1
            items.sort((a, b) => parsePrice(a.f1) - parsePrice(b.f1));

            groups[levelKey] = items;
        });
        return groups;
    }, [data]);

    // محاسبه ماکزیمم برای پروگرس بار
    const maxUsers = useMemo(() => {
        if (!data) return 100;
        return Math.max(...data.map(d => Number(d.f3) || 0));
    }, [data]);

    const LevelTableContent = ({ items, levelInfo }) => {
        if (!items || items.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground bg-muted/10 rounded-lg border border-dashed">
                    <p>هیچ بازه خرید برای این سطح یافت نشد</p>
                </div>
            );
        }

        return (
            <ScrollArea className="h-[350px] w-full pr-3">
                <Table>
                    <TableHeader className="sticky top-0 bg-background z-10 shadow-sm">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="text-right w-[30%] h-10">شروع بازه</TableHead>
                            <TableHead className="text-right w-[30%] h-10">پایان بازه</TableHead>
                            <TableHead className="text-center w-[40%] h-10">تراکم کاربران</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((item, index) => {
                            const count = Number(item.f3) || 0;
                            // محاسبه درصد برای نمایش گرافیکی
                            const percentage = maxUsers > 0 ? (count / maxUsers) * 100 : 0;
                            const isInfinity = item.f2 === "بینهایت" || item.f2 === "infinity";

                            return (
                                <TableRow key={index} className="group hover:bg-muted/40 transition-all duration-200">
                                    <TableCell className="font-medium font-mono text-muted-foreground group-hover:text-foreground">
                                        {parsePrice(item.f1).toLocaleString()}
                                        <span className="text-[10px] mr-1 opacity-70">تومان</span>
                                    </TableCell>

                                    <TableCell className="font-medium font-mono text-muted-foreground group-hover:text-foreground">
                                        {isInfinity ? (
                                            <span className="text-xl leading-none">∞</span>
                                        ) : (
                                            <>
                                                {parsePrice(item.f2).toLocaleString()}
                                                <span className="text-[10px] mr-1 opacity-70">تومان</span>
                                            </>
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex flex-col gap-1.5 px-2">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="font-bold text-foreground">{count.toLocaleString()} نفر</span>
                                            </div>
                                            {/* پروگرس بار برای نمایش حجم مشتری در این بازه */}
                                            <Progress
                                                value={percentage}
                                                className="h-2 w-full bg-secondary/50"
                                                // استفاده از استایل inline برای رنگ سفارشی چون indicatorClassName در برخی نسخه‌ها مشکل دارد
                                                style={{
                                                    '--progress-background': levelInfo.color.replace('bg-', 'var(--')
                                                }}
                                                indicatorClassName={levelInfo.color}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </ScrollArea>
        );
    };

    return (
        <Tabs orientation='vertical' defaultValue='normal' className='space-y-4'>
            {/* لیست تب‌ها */}
            <div className='w-full overflow-x-auto pb-2 scrollbar-hide'>
                <TabsList className="inline-flex h-10 items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-auto min-w-full sm:min-w-fit">
                    {Object.values(LEVEL_CONFIG).map((level) => (
                        <TabsTrigger
                            key={level.key}
                            value={level.key}
                            className="min-w-[80px] px-4 font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all"
                        >
                            {level.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </div>

            <div className="rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden">
                {Object.entries(LEVEL_CONFIG).map(([id, info]) => (
                    <TabsContent key={info.key} value={info.key} className="m-0 p-0 focus-visible:outline-none">
                        <LevelTableContent items={groupedData[info.key]} levelInfo={info} />
                    </TabsContent>
                ))}
            </div>
        </Tabs>
    );
};

export default DashboardTable;