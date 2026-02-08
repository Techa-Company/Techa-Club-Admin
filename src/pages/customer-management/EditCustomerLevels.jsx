import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Save, ArrowRight, Trophy, Star, Medal, Award, User,
    Crown, Link as LinkIcon, Info
} from 'lucide-react';

import Layout from '../layout/Layout';
import { Button } from '@/components/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoadingSpinner, PageLoader } from '@/components/common/Loading';
import { toast } from 'react-toastify';
import {
    createAndUpdateLevel,
    fetchLevels
} from '@/features/customer-level/customerLevelActions';

export default function EditCustomerLevels() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { levels, loading } = useSelector((state) => state.customerLevel);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState([]);

    /* -------------------- Normalize API → UI -------------------- */
    useEffect(() => {
        if (levels && levels.length > 0) {
            const item = levels[0];

            const normalizedLevels = [
                { id: 1, title: "عادی", from: 0, to: item.boronzi },
                { id: 2, title: "برنزی", from: item.boronzi, to: item.nogrei },
                { id: 3, title: "نقره ای", from: item.nogrei, to: item.talaei },
                { id: 4, title: "طلایی", from: item.talaei, to: item.vige },
                { id: 5, title: "ویژه", from: item.vige, to: null },
            ];

            setFormData(normalizedLevels);
        } else {
            dispatch(fetchLevels());
        }
    }, [levels, dispatch]);

    /* -------------------- Chain Logic -------------------- */
    const handleValueChange = (index, value) => {
        const numericValue = Number(value) || 0;
        const updated = [...formData];

        updated[index].to = numericValue;

        if (updated[index + 1]) {
            updated[index + 1].from = numericValue;
        }

        setFormData(updated);
    };

    const handleTitleChange = (index, value) => {
        const updated = [...formData];
        updated[index].title = value;
        setFormData(updated);
    };

    /* -------------------- Denormalize UI → API -------------------- */
    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            const payload = {
                id: levels[0].id,
                _Business: levels[0]._Business,
                boronzi: formData[1]?.to ?? 0,
                nogrei: formData[2]?.to ?? 0,
                talaei: formData[3]?.to ?? 0,
                vige: formData[4]?.from ?? 0,
            };

            const result = await dispatch(createAndUpdateLevel(payload));

            if (createAndUpdateLevel.fulfilled.match(result)) {
                toast.success('سطح‌بندی با موفقیت ذخیره شد');
                navigate('/customer-level');
            }
        } catch {
            toast.error('خطا در ذخیره‌سازی');
        } finally {
            setIsSubmitting(false);
        }
    };

    const levelIcons = [<User />, <Award />, <Medal />, <Star />, <Crown />];
    const levelColors = [
        "text-slate-400 bg-slate-50",
        "text-orange-500 bg-orange-50",
        "text-zinc-400 bg-zinc-50",
        "text-amber-500 bg-amber-50",
        "text-purple-500 bg-purple-50"
    ];

    if (loading && !formData.length) return <PageLoader />;

    return (
        <Layout>
            <Layout.Body className="max-w-4xl mx-auto space-y-8 pb-20 text-right" dir="rtl">

                {/* Header */}
                <div className="flex items-center justify-between bg-white p-6 rounded-[2.5rem] border shadow-sm sticky top-0 z-50">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                            <ArrowRight />
                        </Button>
                        <div>
                            <h1 className="text-xl font-black">تنظیم زنجیره سطوح</h1>
                            <p className="text-[10px] text-slate-400 font-bold tracking-widest">
                                CUSTOMER LEVEL CHAIN
                            </p>
                        </div>
                    </div>

                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="gap-2 px-10 rounded-2xl bg-slate-900"
                    >
                        {isSubmitting ? <LoadingSpinner size="sm" /> : <Save className="h-4 w-4" />}
                        ذخیره
                    </Button>
                </div>

                {/* Info */}
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-3xl flex gap-3">
                    <Info className="text-amber-600" />
                    <p className="text-xs font-bold text-amber-800">
                        حداقل خرید هر سطح به صورت خودکار برابر با حداکثر سطح قبلی تنظیم می‌شود.
                    </p>
                </div>

                {/* Levels */}
                <div className="space-y-4">
                    {formData.map((level, index) => (
                        <div key={level.id}>
                            <Card className="rounded-[2rem] shadow-lg">
                                <CardContent className="p-6 grid md:grid-cols-12 gap-6 items-center">

                                    {/* Icon & Title */}
                                    <div className="md:col-span-4 flex gap-4 items-center">
                                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${levelColors[index]}`}>
                                            {levelIcons[index]}
                                        </div>

                                        <div className="w-full">
                                            <Label className="text-[10px] font-bold">عنوان سطح</Label>
                                            <Input
                                                value={level.title}
                                                onChange={(e) => handleTitleChange(index, e.target.value)}
                                                className="bg-slate-50 border-none rounded-xl font-bold"
                                            />
                                        </div>
                                    </div>

                                    {/* From */}
                                    <div className="md:col-span-3">
                                        <Label className="text-[10px] font-bold text-emerald-600">از</Label>
                                        <Input
                                            value={level.from}
                                            disabled
                                            className="bg-slate-100 border-none rounded-xl font-mono text-center"
                                        />
                                    </div>

                                    {/* To */}
                                    <div className="md:col-span-4">
                                        <Label className="text-[10px] font-bold text-primary">تا</Label>
                                        <Input
                                            type="number"
                                            value={level.to ?? ""}
                                            onChange={(e) => handleValueChange(index, e.target.value)}
                                            className="bg-slate-50 border-none rounded-xl font-mono text-center"
                                        />
                                    </div>

                                    {/* Index */}
                                    <div className="md:col-span-1 text-right">
                                        <span className="text-2xl font-black text-slate-100">
                                            0{index + 1}
                                        </span>
                                    </div>

                                </CardContent>
                            </Card>

                            {index < formData.length - 1 && (
                                <div className="flex justify-center -my-2">
                                    <div className="bg-white p-1 rounded-full shadow border">
                                        <LinkIcon className="text-primary animate-bounce" />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </Layout.Body>
        </Layout>
    );
}
