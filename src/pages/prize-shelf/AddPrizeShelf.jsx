import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Trophy, Save, ArrowRight, Sparkles, Calendar,
    Target, PenLine, Percent, Banknote, Power,
    FileText, Gift
} from 'lucide-react';

// پکیج تاریخ شمسی
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import opacity from "react-element-popper/animations/opacity";

import Layout from '../layout/Layout';
import { Button } from '@/components/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { LoadingSpinner } from '@/components/common/Loading';
import { toast } from 'react-toastify';
import { createAndUpdatePrize, fetchPrizes, fetchPrizeTypes } from '@/features/prize-shelf/prizeShelfActions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AddPrizeShelf() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { prizeTypes } = useSelector(state => state.prizeShelf);

    // مقادیر اولیه برای جایزه جدید
    const [formData, setFormData] = useState({
        id: 0,
        title: '',
        describe: '',
        minusScore: '',
        Persent: '',
        Amount: '',
        minBuy: '',
        maxBuy: '',
        sDate: new Date().toISOString(),
        eDate: new Date().toISOString(),
        active: true,
        _typePrize: null
    });

    useEffect(() => {
        dispatch(fetchPrizeTypes());
    }, [dispatch]);

    // هندل کردن تغییر درصد یا مبلغ (انحصار متقابل)
    const handleDiscountChange = (field, value) => {
        if (field === 'Persent') {
            setFormData(prev => ({ ...prev, Persent: value, Amount: '' }));
        } else {
            setFormData(prev => ({ ...prev, Amount: value, Persent: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title) return toast.error("لطفاً عنوان جایزه را وارد کنید");

        setIsSubmitting(true);
        try {
            const payload = {
                _Business: 3,
            };

            Object.keys(formData).forEach(key => {
                const value = formData[key];
                if (value !== null && value !== undefined && value !== '') {
                    payload[key] = value;
                }
            });

            console.log("Creating New Prize:", payload);

            const resultAction = await dispatch(createAndUpdatePrize(payload));

            if (createAndUpdatePrize.fulfilled.match(resultAction)) {
                toast.success('جایزه جدید با موفقیت ایجاد شد');
                dispatch(fetchPrizes({ "_Business": 3 }));
                navigate('/prize-shelf');
            }
        } catch (error) {
            toast.error('خطایی در ثبت جایزه رخ داد');
        } finally {
            setIsSubmitting(false);
        }
    };

    const datePickerStyle = {
        width: "100%",
        height: "44px",
        borderRadius: "12px",
        padding: "0 12px",
        fontSize: "14px",
        border: "1px solid #e2e8f0",
        backgroundColor: "#f8fafc"
    };

    return (
        <Layout>
            <Layout.Body className="max-w-7xl mx-auto space-y-6 pb-20 min-h-screen text-right" dir="rtl">

                {/* Header Section */}
                <div className="flex items-center justify-between bg-white/80 backdrop-blur-xl p-4 rounded-3xl border shadow-sm sticky top-0 z-50">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => navigate(-1)} className="rounded-2xl hover:bg-slate-50">
                            <ArrowRight className="h-5 w-5" />
                        </Button>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-black text-slate-800 flex items-center gap-2">
                                <Gift className="h-6 w-6 text-primary animate-pulse" />
                                تعریف جایزه جدید
                            </h1>
                            <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mr-8">Create New Prize Asset</span>
                        </div>
                    </div>

                    <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2 px-10 rounded-2xl shadow-xl shadow-primary/20 bg-primary hover:scale-105 transition-all active:scale-95 font-bold">
                        {isSubmitting ? <LoadingSpinner size="sm" /> : <Save className="h-4 w-4" />}
                        ثبت و انتشار
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* بخش اصلی: محتوا */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[32px] overflow-hidden bg-white">
                            <div className="h-3 bg-gradient-to-l from-primary via-amber-400 to-yellow-400" />
                            <CardContent className="p-10 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                    <div className="space-y-3 text-right">
                                        <Label className="text-sm font-black flex items-center gap-2 text-slate-700 mr-1">
                                            <PenLine className="h-4 w-4 text-primary" /> عنوان جایزه
                                        </Label>
                                        <Input
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="h-14 border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all rounded-2xl text-lg font-bold"
                                            placeholder="مثلاً: جایزه ویژه اعضای جدید"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-sm font-black text-slate-700 mr-1">
                                            نوع جایزه
                                        </Label>

                                        <Select
                                            value={formData._typePrize?.toString()}
                                            onValueChange={(val) =>
                                                setFormData({ ...formData, _typePrize: Number(val) })
                                            }
                                        >
                                            <SelectTrigger className="h-14 rounded-2xl bg-slate-50">
                                                <SelectValue placeholder="انتخاب نوع جایزه" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {prizeTypes?.map(type => (
                                                    <SelectItem key={type.id} value={type.id.toString()}>
                                                        {type.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="space-y-3">
                                        <Label className="text-sm font-black text-amber-600 flex items-center gap-1 mr-1">
                                            <Sparkles className="h-4 w-4" /> امتیاز لازم
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                value={formData.minusScore}
                                                onChange={(e) => setFormData({ ...formData, minusScore: e.target.value })}
                                                className="h-14 font-mono text-center text-xl rounded-2xl border-2 transition-all bg-amber-50/30 border-amber-100 focus:border-amber-500"
                                                placeholder="0"
                                            />
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500 font-black">امتیاز</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-sm font-black text-emerald-600 flex items-center gap-1 mr-1">
                                            <Percent className="h-4 w-4" /> درصد تخفیف (%)
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                disabled={!!formData.Amount}
                                                value={formData.Persent}
                                                onChange={(e) => handleDiscountChange('Persent', e.target.value)}
                                                className={`h-14 font-mono text-center text-xl rounded-2xl border-2 transition-all ${formData.Amount ? 'bg-slate-50 opacity-30 select-none' : 'bg-emerald-50/30 border-emerald-100 focus:border-emerald-500'}`}
                                                placeholder="0"
                                            />
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 font-black">%</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-sm font-black text-blue-600 flex items-center gap-1 mr-1">
                                            <Banknote className="h-4 w-4" /> مبلغ ثابت (تومان)
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                disabled={!!formData.Persent}
                                                value={formData.Amount}
                                                onChange={(e) => handleDiscountChange('Amount', e.target.value)}
                                                className={`h-14 font-mono text-center text-xl rounded-2xl border-2 transition-all ${formData.Persent ? 'bg-slate-50 opacity-30 select-none' : 'bg-blue-50/30 border-blue-100 focus:border-blue-500'}`}
                                                placeholder="0"
                                            />
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-xs font-bold">Toman</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 text-right">
                                    <Label className="text-sm font-black flex items-center gap-2 text-slate-700 mr-1">
                                        <FileText className="h-4 w-4 text-slate-400" /> متن توضیحات و قوانین
                                    </Label>
                                    <Textarea
                                        value={formData.describe}
                                        onChange={(e) => setFormData({ ...formData, describe: e.target.value })}
                                        className="min-h-[160px] border-slate-100 bg-slate-50/50 rounded-[24px] focus:bg-white p-5 resize-none transition-all"
                                        placeholder="شرایط استفاده از این جایزه را برای مشتریان شرح دهید..."
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* سایدبار: تنظیمات کنترلی */}
                    <div className="space-y-8">

                        <Card className="border-none shadow-xl rounded-[24px] bg-white group overflow-hidden">
                            <CardContent className="p-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`p-3 rounded-2xl transition-all ${formData.active ? 'bg-emerald-50 text-emerald-500 shadow-inner' : 'bg-slate-50 text-slate-400'}`}>
                                        <Power className="h-5 w-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black text-slate-700">وضعیت جایزه</span>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase italic">Active Status</span>
                                    </div>
                                </div>
                                <Switch checked={formData.active} onCheckedChange={(val) => setFormData({ ...formData, active: val })} />
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-xl rounded-[24px] bg-white overflow-hidden">
                            <div className="bg-slate-50/80 p-4 border-b flex items-center gap-2 text-rose-500">
                                <Target className="h-4 w-4" />
                                <span className="text-xs font-black uppercase tracking-widest">محدودیت‌های سیستمی</span>
                            </div>
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[11px] font-black text-slate-500 mr-1">حداقل مبلغ خرید (تومان)</Label>
                                    <Input
                                        type="number"
                                        value={formData.minBuy}
                                        onChange={(e) => setFormData({ ...formData, minBuy: e.target.value })}
                                        className="h-11 font-mono rounded-xl bg-slate-50/50 border-slate-100 text-center"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[11px] font-black text-slate-500 mr-1">سقف تخفیف (تومان)</Label>
                                    <Input
                                        type="number"
                                        value={formData.maxBuy}
                                        onChange={(e) => setFormData({ ...formData, maxBuy: e.target.value })}
                                        className="h-11 font-mono rounded-xl bg-slate-50/50 border-slate-100 text-center"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-xl rounded-[24px] bg-white overflow-visible">
                            <div className="bg-slate-50/80 p-4 border-b flex items-center gap-2 text-indigo-500">
                                <Calendar className="h-4 w-4" />
                                <span className="text-xs font-black uppercase tracking-widest">زمان‌بندی اعتبار</span>
                            </div>
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[11px] font-black text-slate-500 mr-1">تاریخ شروع نمایش</Label>
                                    <DatePicker
                                        calendar={persian}
                                        locale={persian_fa}
                                        style={datePickerStyle}
                                        value={formData.sDate}
                                        onChange={(date) => setFormData({ ...formData, sDate: date?.toDate?.().toISOString() })}
                                        animations={[opacity()]}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[11px] font-black text-slate-500 mr-1">تاریخ انقضای خودکار</Label>
                                    <DatePicker
                                        calendar={persian}
                                        locale={persian_fa}
                                        style={datePickerStyle}
                                        value={formData.eDate}
                                        onChange={(date) => setFormData({ ...formData, eDate: date?.toDate?.().toISOString() })}
                                        animations={[opacity()]}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Layout.Body>
        </Layout>
    );
}