import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Save, ArrowRight, History, Zap, Target, Clock,
    ShieldCheck, Banknote, Percent, Info, Award,
    Medal, Star, Gem, Crown
} from 'lucide-react';

import Layout from '../layout/Layout';
import { Button } from '@/components/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoadingSpinner, PageLoader } from '@/components/common/Loading';
import { toast } from 'react-toastify';
import { createAndUpdateScenario, fetchScenarios } from '@/features/forgot-scenario/forgotScenarioActions';

// فرض بر این است که اکشن آپدیت را دارید

export default function EditForgetScenario() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { scenarios, loading } = useSelector((state) => state.forgotScenario);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (scenarios && scenarios.length > 0) {
            setFormData({ ...scenarios[0] });
        } else {
            dispatch(fetchScenarios());
        }
    }, [scenarios, dispatch]);

    const handleFieldChange = (prefix, field, value) => {
        const key = `${prefix}_${field}`;
        setFormData(prev => {
            const newState = { ...prev, [key]: value };

            // انحصار متقابل درصد و مبلغ
            if (field === 'Persent' && value > 0) newState[`${prefix}_Amount`] = 0;
            if (field === 'Amount' && value > 0) newState[`${prefix}_Persent`] = 0;

            return newState;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // پاکسازی دیتا و اطمینان از وجود بیزنس آیدی
            const payload = { ...formData, _Business: 3 };

            const resultAction = await dispatch(createAndUpdateScenario(payload));
            if (createAndUpdateScenario.fulfilled.match(resultAction)) {
                toast.success('تنظیمات سناریو با موفقیت بروزرسانی شد');
                navigate('/forget-scenario');
            }
        } catch (error) {
            toast.error('خطا در ذخیره‌سازی تغییرات');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!formData) return <PageLoader />;

    const renderLevelForm = (prefix, title, icon, colorClass) => (
        <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
            <CardHeader className={`border-b border-slate-50 ${colorClass} bg-opacity-5`}>
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-white shadow-sm ${colorClass}`}>
                        {icon}
                    </div>
                    <div>
                        <CardTitle className="text-lg font-black">{title}</CardTitle>
                        <CardDescription>تنظیمات پاداش بازگشت برای این سطح</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* روزهای انتظار */}
                    <div className="space-y-3">
                        <Label className="text-sm font-bold flex items-center gap-2">
                            <History className="h-4 w-4 text-rose-500" /> چند روز بعد از آخرین خرید؟
                        </Label>
                        <div className="relative">
                            <Input
                                type="number"
                                value={formData[`${prefix}_Day`]}
                                onChange={(e) => handleFieldChange(prefix, 'Day', e.target.value)}
                                className="h-12 font-mono text-center rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-rose-200"
                            />
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">روز</span>
                        </div>
                    </div>

                    {/* درصد تخفیف */}
                    <div className="space-y-3">
                        <Label className="text-sm font-bold flex items-center gap-2 text-emerald-600">
                            <Percent className="h-4 w-4" /> درصد تخفیف هدیه
                        </Label>
                        <div className="relative">
                            <Input
                                type="number"
                                value={formData[`${prefix}_Persent`]}
                                onChange={(e) => handleFieldChange(prefix, 'Persent', e.target.value)}
                                className={`h-12 font-mono text-center rounded-2xl transition-all ${formData[`${prefix}_Amount`] > 0 ? 'bg-slate-100 opacity-30 cursor-not-allowed' : 'bg-emerald-50/30 border-emerald-100'}`}
                                disabled={formData[`${prefix}_Amount`] > 0}
                            />
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 font-black">%</span>
                        </div>
                    </div>

                    {/* مبلغ ثابت */}
                    <div className="space-y-3">
                        <Label className="text-sm font-bold flex items-center gap-2 text-blue-600">
                            <Banknote className="h-4 w-4" /> یا مبلغ ثابت هدیه
                        </Label>
                        <Input
                            type="number"
                            value={formData[`${prefix}_Amount`]}
                            onChange={(e) => handleFieldChange(prefix, 'Amount', e.target.value)}
                            className={`h-12 font-mono text-center rounded-2xl transition-all ${formData[`${prefix}_Persent`] > 0 ? 'bg-slate-100 opacity-30 cursor-not-allowed' : 'bg-blue-50/30 border-blue-100'}`}
                            disabled={formData[`${prefix}_Persent`] > 0}
                            placeholder="تومان"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-slate-50">
                    <div className="space-y-3">
                        <Label className="text-[11px] font-black text-slate-400 uppercase tracking-wider mr-1">حداقل خرید مشتری</Label>
                        <Input
                            type="number"
                            value={formData[`${prefix}_minBuy`]}
                            onChange={(e) => handleFieldChange(prefix, 'minBuy', e.target.value)}
                            className="h-11 font-mono text-center rounded-xl bg-slate-50/50 border-none"
                        />
                    </div>
                    <div className="space-y-3">
                        <Label className="text-[11px] font-black text-slate-400 uppercase tracking-wider mr-1">سقف تخفیف (Max Buy)</Label>
                        <Input
                            type="number"
                            value={formData[`${prefix}_maxBuy`]}
                            onChange={(e) => handleFieldChange(prefix, 'maxBuy', e.target.value)}
                            className="h-11 font-mono text-center rounded-xl bg-slate-50/50 border-none"
                        />
                    </div>
                    <div className="space-y-3">
                        <Label className="text-[11px] font-black text-slate-400 uppercase tracking-wider mr-1">اعتبار پس از صدور</Label>
                        <div className="relative">
                            <Input
                                type="number"
                                value={formData[`${prefix}_ExpireDayCount`]}
                                onChange={(e) => handleFieldChange(prefix, 'ExpireDayCount', e.target.value)}
                                className="h-11 font-mono text-center rounded-xl bg-slate-50/50 border-none"
                            />
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-300" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <Layout>
            <Layout.Body className="max-w-6xl mx-auto space-y-8 pb-20 text-right" dir="rtl">

                {/* Header */}
                <div className="flex items-center justify-between bg-white/80 backdrop-blur-xl p-5 rounded-[2rem] border shadow-sm sticky top-0 z-50">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => navigate(-1)} className="rounded-2xl border-slate-200">
                            <ArrowRight className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-xl font-black text-slate-800">ویرایش سناریوها</h1>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Automated Retention Logic</p>
                        </div>
                    </div>
                    <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2 px-10 rounded-2xl bg-slate-900 shadow-xl shadow-slate-200">
                        {isSubmitting ? <LoadingSpinner size="sm" /> : <Save className="h-4 w-4" />}
                        ذخیره تنظیمات کلی
                    </Button>
                </div>

                {/* Tabs برای ۵ سطح */}
                <Tabs defaultValue="SF0" className="space-y-8">
                    <div className="bg-slate-100/50 p-1.5 rounded-[2rem] border w-fit mx-auto sticky top-24 z-40 backdrop-blur-md">
                        <TabsList className="bg-transparent h-12 gap-2">
                            <TabsTrigger value="SF0" className="rounded-[1.5rem] px-6 data-[state=active]:bg-white data-[state=active]:shadow-md font-bold text-xs">
                                <Award className="h-4 w-4 ml-2 text-orange-600" /> سطح ۱
                            </TabsTrigger>
                            <TabsTrigger value="SF1" className="rounded-[1.5rem] px-6 data-[state=active]:bg-white data-[state=active]:shadow-md font-bold text-xs">
                                <Medal className="h-4 w-4 ml-2 text-slate-400" /> سطح ۲
                            </TabsTrigger>
                            <TabsTrigger value="SF2" className="rounded-[1.5rem] px-6 data-[state=active]:bg-white data-[state=active]:shadow-md font-bold text-xs">
                                <Star className="h-4 w-4 ml-2 text-amber-500" /> سطح ۳
                            </TabsTrigger>
                            <TabsTrigger value="SF3" className="rounded-[1.5rem] px-6 data-[state=active]:bg-white data-[state=active]:shadow-md font-bold text-xs">
                                <Zap className="h-4 w-4 ml-2 text-indigo-500" /> سطح ۴
                            </TabsTrigger>
                            <TabsTrigger value="SF4" className="rounded-[1.5rem] px-6 data-[state=active]:bg-white data-[state=active]:shadow-md font-bold text-xs">
                                <Crown className="h-4 w-4 ml-2 text-cyan-500" /> سطح ۵
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="SF0">{renderLevelForm("SF0", "سطح برنزی (Level 1)", <Award />, "text-orange-600")}</TabsContent>
                    <TabsContent value="SF1">{renderLevelForm("SF1", "سطح نقره‌ای (Level 2)", <Medal />, "text-slate-400")}</TabsContent>
                    <TabsContent value="SF2">{renderLevelForm("SF2", "سطح طلایی (Level 3)", <Star />, "text-amber-500")}</TabsContent>
                    <TabsContent value="SF3">{renderLevelForm("SF3", "سطح پلاتین (Level 4)", <Zap />, "text-indigo-500")}</TabsContent>
                    <TabsContent value="SF4">{renderLevelForm("SF4", "سطح الماس (Level 5)", <Crown />, "text-cyan-500")}</TabsContent>
                </Tabs>

                {/* Footer Tip */}
                <div className="flex items-center gap-3 bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100">
                    <div className="bg-indigo-500 p-2 rounded-xl text-white">
                        <Info className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-bold text-indigo-900 leading-relaxed">
                        نکته: سیستم به صورت هوشمند مشتریانی که در هر یک از بازه‌های زمانی فوق خریدی نداشته باشند را شناسایی کرده و پاداش تعیین شده را برای آن‌ها ارسال می‌کند.
                    </p>
                </div>
            </Layout.Body>
        </Layout>
    );
}