import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { activeDiscounts, expiredDiscounts, usedDiscounts } from '@/data/tableData';

const DashboardDiscount = () => {
    return (
        <Tabs
            orientation='vertical'
            defaultValue='active'
            className='space-y-4'
        >
            <div className='w-full overflow-x-auto pb-2'>
                <TabsList>
                    <TabsTrigger value='active'>فعال</TabsTrigger>
                    <TabsTrigger value='used'>استفاده شده</TabsTrigger>
                    <TabsTrigger value='expired'>منقضی شده</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="active">
                <Table>
                    <TableCaption>آخرین کد های تخفیف فعال</TableCaption>
                    <TableHeader >
                        <TableRow>
                            <TableHead className="text-right font-semibold px-0 pr-3">ردیف</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">عنوان</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">نوع</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">کد تخفیف</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">تاریخ استفاده</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">تاریخ انقضا</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activeDiscounts.map((data) => (
                            <TableRow key={data.id}>
                                <TableCell className="font-medium px-5">{data.id}</TableCell>
                                <TableCell className="px-5">{data.title}</TableCell>
                                <TableCell className="px-5">{data.type}</TableCell>
                                <TableCell className="px-5">{data.code}</TableCell>
                                <TableCell className="px-5">{data.from}</TableCell>
                                <TableCell className="px-5">{data.to}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TabsContent>
            <TabsContent value="used">
                <Table>
                    <TableCaption>آخرین کد های تخفیف استفاده شده</TableCaption>
                    <TableHeader >
                        <TableRow>
                            <TableHead className="text-right font-semibold px-0 pr-3">ردیف</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">عنوان</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">نوع</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">کد تخفیف</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">تاریخ استفاده</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">تاریخ انقضا</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {usedDiscounts.map((data) => (
                            <TableRow key={data.id}>
                                <TableCell className="font-medium px-5">{data.id}</TableCell>
                                <TableCell className="px-5">{data.title}</TableCell>
                                <TableCell className="px-5">{data.type}</TableCell>
                                <TableCell className="px-5">{data.code}</TableCell>
                                <TableCell className="px-5">{data.from}</TableCell>
                                <TableCell className="px-5">{data.to}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TabsContent>
            <TabsContent value="expired">
                <Table>
                    <TableCaption>آخرین کد های تخفیف منقضی شده</TableCaption>
                    <TableHeader >
                        <TableRow>
                            <TableHead className="text-right font-semibold px-0 pr-3">ردیف</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">عنوان</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">نوع</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">کد تخفیف</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">تاریخ استفاده</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">تاریخ انقضا</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {expiredDiscounts.map((data) => (
                            <TableRow key={data.id}>
                                <TableCell className="font-medium px-5">{data.id}</TableCell>
                                <TableCell className="px-5">{data.title}</TableCell>
                                <TableCell className="px-5">{data.type}</TableCell>
                                <TableCell className="px-5">{data.code}</TableCell>
                                <TableCell className="px-5">{data.from}</TableCell>
                                <TableCell className="px-5">{data.to}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TabsContent>
        </Tabs>
    );
};

export default DashboardDiscount;