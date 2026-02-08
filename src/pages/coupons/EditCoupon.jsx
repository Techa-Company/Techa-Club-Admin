import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Ticket, Save, ArrowRight, Calendar,
    Target, PenLine, Percent, Banknote, Power,
    FileText
} from 'lucide-react';

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import opacity from "react-element-popper/animations/opacity";
import DateObject from 'react-date-object';

import Layout from '../layout/Layout';
import { Button } from '@/components/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { LoadingSpinner } from '@/components/common/Loading';
import { toast } from 'react-toastify';

import {
    createAndUpdateCoupon,
    fetchCoupons,
    fetchCouponTypes
} from '@/features/coupon/couponActions';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

export default function EditCoupon() {
    const { id } = useParams();
    const isNew = id === 'new';
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { coupons, couponTypes } = useSelector(state => state.coupon);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        id: isNew ? 0 : Number(id),
        title: '',
        describe: '',
        Persent: '',
        Amount: '',
        minBuy: '',
        maxBuy: '',
        sDate: null,
        eDate: null,
        active: true,
        _typeCoupon: null,
    });

    useEffect(() => {
        dispatch(fetchCouponTypes());
    }, [dispatch]);

    useEffect(() => {
        if (!isNew && coupons.length > 0) {
            const coupon = coupons.find(c => c.id === Number(id));
            if (!coupon) return;

            setFormData({
                ...coupon,
                sDate: coupon.sDate
                    ? new DateObject({
                        date: new Date(coupon.sDate),
                        calendar: persian,
                        locale: persian_fa,
                    })
                    : null,
                eDate: coupon.eDate
                    ? new DateObject({
                        date: new Date(coupon.eDate),
                        calendar: persian,
                        locale: persian_fa,
                    })
                    : null,
            });
        } else if (!isNew && coupons.length === 0) {
            dispatch(fetchCoupons({ _Business: 3 }));
        }
    }, [id, coupons, isNew, dispatch]);

    // انحصار مبلغ و درصد
    const handleDiscountChange = (field, value) => {
        if (field === 'Persent') {
            setFormData(prev => ({ ...prev, Persent: value, Amount: '' }));
        } else {
            setFormData(prev => ({ ...prev, Amount: value, Persent: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title)
            return toast.error("عنوان کد تخفیف الزامی است");

        setIsSubmitting(true);

        try {
            const payload = {
                _Business: 3,
                ...formData,
                sDate: formData.sDate?.toDate?.().toISOString(),
                eDate: formData.eDate?.toDate?.().toISOString(),
            };

            const excludedFields = ['BusinessName', 'savedate', 'CouponTitle', 'icon'];
            excludedFields.forEach(f => delete payload[f]);
            if (!payload.Amount) {
                delete payload.Amount;
            }

            const result = await dispatch(createAndUpdateCoupon(payload));

            if (createAndUpdateCoupon.fulfilled.match(result)) {
                toast.success(isNew ? 'کد تخفیف ساخته شد' : 'ویرایش ذخیره شد');
                dispatch(fetchCoupons({ _Business: 3 }));
                navigate('/coupons');
            }
        } catch {
            toast.error('خطا در ثبت اطلاعات');
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
        backgroundColor: "#f8fafc",
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
                                <Ticket className="h-6 w-6 text-primary" />
                                {isNew ? 'تعریف کد تخفیف جدید' : 'ویرایش کد تخفیف'}
                            </h1>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Coupon Management System</span>
                        </div>
                    </div>

                    <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2 px-10 rounded-2xl shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 transition-all active:scale-95">
                        {isSubmitting ? <LoadingSpinner size="sm" /> : <Save className="h-4 w-4" />}
                        {isNew ? 'انتشار کوپن' : 'بروزرسانی'}
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[32px] overflow-hidden bg-white">
                            <div className="h-3 bg-gradient-to-r from-primary via-blue-400 to-indigo-500" />
                            <CardContent className="p-10 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                    {/* Title Input */}
                                    <div className="space-y-3">
                                        <Label className="text-sm font-black flex items-center gap-2 text-slate-700 mr-1">
                                            <PenLine className="h-4 w-4 text-primary" /> عنوان و نام تجاری کد
                                        </Label>
                                        <Input
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="h-14 border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all rounded-2xl text-lg font-bold"
                                            placeholder="مثلاً: تخفیف ویژه یلدا"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-sm font-black text-slate-700 mr-1">
                                            نوع کوپن
                                        </Label>

                                        <Select
                                            value={formData._typeCoupon?.toString()}
                                            onValueChange={(val) =>
                                                setFormData({ ...formData, _typeCoupon: Number(val) })
                                            }
                                        >
                                            <SelectTrigger className="h-14 rounded-2xl bg-slate-50">
                                                <SelectValue placeholder="انتخاب نوع کوپن" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {couponTypes?.map(type => (
                                                    <SelectItem key={type.id} value={type.id.toString()}>
                                                        {type.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                {/* Value Inputs */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="relative group">
                                        <Label className="text-sm font-black text-emerald-600 mb-3 flex items-center gap-1 mr-1">
                                            <Percent className="h-4 w-4" /> میزان درصد تخفیف
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                disabled={!!formData.Amount}
                                                value={formData.Persent}
                                                onChange={(e) => handleDiscountChange('Persent', e.target.value)}
                                                className={`h-14 font-mono text-center text-xl rounded-2xl transition-all border-2 ${formData.Amount ? 'bg-slate-50 opacity-30 grayscale' : 'bg-emerald-50/30 border-emerald-100 focus:border-emerald-500 focus:ring-emerald-100'}`}
                                                placeholder="0"
                                            />
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 font-black">%</span>
                                        </div>
                                    </div>

                                    <div className="relative group">
                                        <Label className="text-sm font-black text-blue-600 mb-3 flex items-center gap-1 mr-1">
                                            <Banknote className="h-4 w-4" /> مبلغ تخفیف (تومان)
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                disabled={!!formData.Persent}
                                                value={formData.Amount}
                                                onChange={(e) => handleDiscountChange('Amount', e.target.value)}
                                                className={`h-14 font-mono text-center text-xl rounded-2xl transition-all border-2 ${formData.Persent ? 'bg-slate-50 opacity-30 grayscale' : 'bg-blue-50/30 border-blue-100 focus:border-blue-500 focus:ring-blue-100'}`}
                                                placeholder="0"
                                            />
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-xs font-bold">Toman</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-3">
                                    <Label className="text-sm font-black flex items-center gap-2 text-slate-700 mr-1">
                                        <FileText className="h-4 w-4 text-slate-400" /> توضیحات و شرایط استفاده
                                    </Label>
                                    <Textarea
                                        value={formData.describe}
                                        onChange={(e) => setFormData({ ...formData, describe: e.target.value })}
                                        className="min-h-[160px] border-slate-100 bg-slate-50/50 rounded-[24px] focus:bg-white p-5 resize-none transition-all"
                                        placeholder="توضیحات مربوط به نحوه استفاده از این کد تخفیف را اینجا بنویسید..."
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-8">

                        {/* Status Switch */}
                        <Card className="border-none shadow-xl rounded-[24px] bg-white group overflow-hidden">
                            <CardContent className="p-6 flex items-center justify-between relative">
                                <div className={`absolute right-0 top-0 w-1.5 h-full transition-colors ${formData.active ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                                <div className="flex items-center gap-3 mr-2">
                                    <div className={`p-3 rounded-2xl transition-colors ${formData.active ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-slate-400'}`}>
                                        <Power className="h-5 w-5" />
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <span className="text-sm font-black text-slate-700">وضعیت انتشار</span>
                                        <span className="text-[10px] text-slate-400 font-bold italic">Visibility Status</span>
                                    </div>
                                </div>
                                <Switch checked={formData.active} onCheckedChange={(val) => setFormData({ ...formData, active: val })} />
                            </CardContent>
                        </Card>

                        {/* Usage Rules */}
                        <Card className="border-none shadow-xl rounded-[24px] bg-white overflow-hidden">
                            <div className="bg-slate-50 p-4 border-b flex items-center gap-2 text-rose-500">
                                <Target className="h-4 w-4" />
                                <span className="text-xs font-black uppercase tracking-widest">محدودیت‌های خرید</span>
                            </div>
                            <CardContent className="p-6 space-y-5">
                                <div className="space-y-2">
                                    <Label className="text-[11px] font-black text-slate-500 mr-1">حداقل مبلغ فاکتور (تومان)</Label>
                                    <Input
                                        type="number"
                                        value={formData.minBuy}
                                        onChange={(e) => setFormData({ ...formData, minBuy: e.target.value })}
                                        className="h-11 font-mono rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white text-center"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[11px] font-black text-slate-500 mr-1">حداکثر تخفیف / سقف خرید</Label>
                                    <Input
                                        type="number"
                                        value={formData.maxBuy}
                                        onChange={(e) => setFormData({ ...formData, maxBuy: e.target.value })}
                                        className="h-11 font-mono rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white text-center"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Persian Date Range */}
                        <Card className="border-none shadow-xl rounded-[24px] bg-white overflow-visible">
                            <div className="bg-slate-50 p-4 border-b flex items-center gap-2 text-indigo-500">
                                <Calendar className="h-4 w-4" />
                                <span className="text-xs font-black uppercase tracking-widest">بازه زمانی اعتبار</span>
                            </div>
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[11px] font-black text-slate-500 mr-1">تاریخ شروع فعالیت</Label>
                                    <DatePicker
                                        calendar={persian}
                                        locale={persian_fa}
                                        style={datePickerStyle}
                                        value={formData.sDate}
                                        onChange={(date) =>
                                            setFormData(prev => ({ ...prev, sDate: date }))
                                        }
                                        animations={[opacity()]}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[11px] font-black text-slate-500 mr-1">تاریخ انقضا (پایان اعتبار)</Label>
                                    <DatePicker
                                        calendar={persian}
                                        locale={persian_fa}
                                        style={datePickerStyle}
                                        value={formData.eDate}
                                        onChange={(date) =>
                                            setFormData(prev => ({ ...prev, eDate: date }))
                                        }
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



