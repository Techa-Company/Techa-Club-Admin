import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { bronze, golden, normal, silver, special } from '@/data/tableData';

const DashboardTable = () => {
    return (
        <Tabs
            orientation='vertical'
            defaultValue='normal'
            className='space-y-4'
        >
            <div className='w-full overflow-x-auto pb-2'>
                <TabsList>
                    <TabsTrigger value='normal'>عادی</TabsTrigger>
                    <TabsTrigger value='bronze'>برنزی</TabsTrigger>
                    <TabsTrigger value='silver'>نقره ای</TabsTrigger>
                    <TabsTrigger value='golden'>طلایی</TabsTrigger>
                    <TabsTrigger value='special'>ویژه</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="normal">
                <Table>
                    <TableCaption>لیستی از کاربران سطح عادی</TableCaption>
                    <TableHeader >
                        <TableRow>
                            <TableHead className="text-right font-semibold px-0 pr-3">شروع مبلغ ماهانه</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">پایان مبلغ ماهانه</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">تعداد مشتریان</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">سطح</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {normal.map((data) => (
                            <TableRow key={data.from}>
                                <TableCell className="font-medium px-5">{data.from.toLocaleString()}</TableCell>
                                <TableCell className="px-5">{data.to.toLocaleString()}</TableCell>
                                <TableCell className="px-5">{data.users}</TableCell>
                                <TableCell className="px-5">{data.level}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TabsContent>
            <TabsContent value="bronze">
                <Table>
                    <TableCaption>لیستی از کاربران سطح برنزی</TableCaption>
                    <TableHeader >
                        <TableRow>
                            <TableHead className="text-right font-semibold px-0 pr-3">شروع مبلغ ماهانه</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">پایان مبلغ ماهانه</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">تعداد مشتریان</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">سطح</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bronze.map((data) => (
                            <TableRow key={data.from}>
                                <TableCell className="font-medium px-5">{data.from.toLocaleString()}</TableCell>
                                <TableCell className="px-5">{data.to.toLocaleString()}</TableCell>
                                <TableCell className="px-5">{data.users}</TableCell>
                                <TableCell className="px-5">{data.level}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TabsContent>
            <TabsContent value="silver">
                <Table>
                    <TableCaption>لیستی از کاربران سطح نقره ای</TableCaption>
                    <TableHeader >
                        <TableRow>
                            <TableHead className="text-right font-semibold px-0 pr-3">شروع مبلغ ماهانه</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">پایان مبلغ ماهانه</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">تعداد مشتریان</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">سطح</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {silver.map((data) => (
                            <TableRow key={data.from}>
                                <TableCell className="font-medium px-5">{data.from.toLocaleString()}</TableCell>
                                <TableCell className="px-5">{data.to.toLocaleString()}</TableCell>
                                <TableCell className="px-5">{data.users}</TableCell>
                                <TableCell className="px-5">{data.level}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TabsContent>
            <TabsContent value="golden">
                <Table>
                    <TableCaption>لیستی از کاربران سطح طلایی</TableCaption>
                    <TableHeader >
                        <TableRow>
                            <TableHead className="text-right font-semibold px-0 pr-3">شروع مبلغ ماهانه</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">پایان مبلغ ماهانه</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">تعداد مشتریان</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">سطح</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {golden.map((data) => (
                            <TableRow key={data.from}>
                                <TableCell className="font-medium px-5">{data.from.toLocaleString()}</TableCell>
                                <TableCell className="px-5">{data.to.toLocaleString()}</TableCell>
                                <TableCell className="px-5">{data.users}</TableCell>
                                <TableCell className="px-5">{data.level}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TabsContent>
            <TabsContent value="special">
                <Table>
                    <TableCaption>لیستی از کاربران سطح ویژه</TableCaption>
                    <TableHeader >
                        <TableRow>
                            <TableHead className="text-right font-semibold px-0 pr-3">شروع مبلغ ماهانه</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">پایان مبلغ ماهانه</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">تعداد مشتریان</TableHead>
                            <TableHead className="text-right font-semibold px-0 pr-3">سطح</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {special.map((data) => (
                            <TableRow key={data.from}>
                                <TableCell className="font-medium px-5">{data.from.toLocaleString()}</TableCell>
                                <TableCell className="px-5">{data.to.toLocaleString()}</TableCell>
                                <TableCell className="px-5">{data.users}</TableCell>
                                <TableCell className="px-5">{data.level}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TabsContent>
        </Tabs>
    );
};

export default DashboardTable;