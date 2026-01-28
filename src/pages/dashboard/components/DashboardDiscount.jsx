import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Ticket } from 'lucide-react';

const DashboardDiscount = ({ data }) => {
    if (!data || data.length === 0) {
        return <div className="text-center py-8 text-muted-foreground">کوپن یا مناسبتی یافت نشد.</div>;
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableCaption className="pb-4">گزارش وضعیت کوپن‌ها و مناسبت‌های تعریف شده</TableCaption>
                <TableHeader>
                    <TableRow className="bg-muted/50">
                        <TableHead className="text-right w-[50px] font-bold">#</TableHead>
                        <TableHead className="text-right min-w-[120px] font-bold">عنوان</TableHead>
                        <TableHead className="text-center font-bold">تعداد صادر شده</TableHead>
                        <TableHead className="text-center font-bold">استفاده کل</TableHead>
                        <TableHead className="text-center font-bold text-emerald-600">استفاده (۷ روز)</TableHead>
                        <TableHead className="text-center font-bold">وضعیت</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, index) => {
                        // محاسبه درصد استفاده
                        const issued = Number(item.f2?.toString().replace(/,/g, '')) || 0;
                        const used = Number(item.f3?.toString().replace(/,/g, '')) || 0;
                        const usageRate = issued > 0 ? Math.round((used / issued) * 100) : 0;

                        return (
                            <TableRow key={index}>
                                <TableCell className="font-medium text-muted-foreground">{index + 1}</TableCell>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                        <Ticket className="w-4 h-4 text-orange-500" />
                                        {item.title || item.f1}
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    {issued === 0 ? <span className="text-muted-foreground">-</span> : item.f2}
                                </TableCell>
                                <TableCell className="text-center">
                                    {used === 0 ? <span className="text-muted-foreground">-</span> : item.f3}
                                </TableCell>
                                <TableCell className="text-center font-mono font-bold text-emerald-600">
                                    {Number(item.f4) > 0 ? `+${item.f4}` : <span className="text-muted-foreground font-sans text-xs">بدون تغییر</span>}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge variant="outline" className={`${usageRate > 50 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-50'}`}>
                                        {usageRate}% جذب
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default DashboardDiscount;