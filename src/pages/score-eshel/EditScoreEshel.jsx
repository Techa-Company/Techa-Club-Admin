// CreateAndUpdateScore.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
    Save,
    ArrowRight,
    ShoppingBag,
    Trophy,
    UserPlus,
    Users,
    UserCheck,
    Send,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';

import Layout from '../layout/Layout';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

// اکشن‌ها (فرض بر این است که این اکشن در ریداکس شما تعریف شده است)
import { createAndUpdateScore, fetchScores } from '@/features/score-eshel/scoreEshelActions';
import { LoadingSpinner } from '@/components/common/Loading';
import { toast } from 'react-toastify';

const topNav = [
    { title: 'خانه', href: '/dashboard/overview', isActive: false },
    { title: 'قوانین امتیاز', href: '/dashboard/scores', isActive: true },
];

export default function EditScoreEshel() {
    const { id } = useParams();
    const isEditMode = !!id;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // استیت ریداکس
    const { loading, scores, error } = useSelector(state => state.scoreEshel || {});
    console.log(scores)
    // تنظیمات فرم
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            ScoreBuy: '',
            ScoreBuyOne: '',
            ScoreRegisterFriend: '',
            ScoreBuyFriend: '',
            ScoreFullProfile: '',
            ScoreEitaa: '',
        }
    });

    useEffect(() => {
        if (isEditMode) {
            dispatch(fetchScores({ "_Business": 3 }));
        }
    }, [dispatch, id, isEditMode]);

    useEffect(() => {
        if (isEditMode && scores) {
            reset({
                ScoreBuy: scores[0].ScoreBuy,
                ScoreBuyOne: scores[0].ScoreBuyOne,
                ScoreRegisterFriend: scores[0].ScoreRegisterFriend,
                ScoreBuyFriend: scores[0].ScoreBuyFriend,
                ScoreFullProfile: scores[0].ScoreFullProfile,
                ScoreEitaa: scores[0].ScoreEitaa,
            });
        }
    }, [scores, isEditMode, reset]);

    const onSubmit = async (data) => {
        try {
            // تبدیل مقادیر استرینگ به عدد (چون اینپوت نامبر استرینگ برمی‌گرداند)
            const payload = {
                id: id,
                _Business: 3, // برای ایجاد معمولا 0 یا null می‌فرستند
                ScoreBuy: Number(data.ScoreBuy),
                ScoreBuyOne: Number(data.ScoreBuyOne),
                ScoreRegisterFriend: Number(data.ScoreRegisterFriend),
                ScoreBuyFriend: Number(data.ScoreBuyFriend),
                ScoreFullProfile: Number(data.ScoreFullProfile),
                ScoreEitaa: Number(data.ScoreEitaa),
                // _Business معمولا سمت بکند از توکن خوانده می‌شود، اما اگر لازم است اینجا اضافه کنید
            };
            const resultAction = await dispatch(createAndUpdateScore(payload));

            if (createAndUpdateScore.fulfilled.match(resultAction)) {
                toast.success(isEditMode ? 'قانون با موفقیت ویرایش شد' : 'قانون جدید با موفقیت ثبت شد');
                navigate('/score-eshel');
            } else {
                toast.error(resultAction.payload || 'خطا در انجام عملیات');
            }
        } catch (err) {
            toast.error('خطا در ارتباط با سرور');
            console.error(err);
        }
    };

    // کامپوننت کمکی برای رندر کردن فیلدها
    const ScoreInput = ({ name, label, icon: Icon, colorClass, placeholder }) => (
        <div className="space-y-2">
            <Label htmlFor={name} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                <div className={`p-1.5 rounded-md ${colorClass} bg-opacity-10`}>
                    <Icon className={`h-4 w-4 ${colorClass.replace('bg-', 'text-')}`} />
                </div>
                {label}
            </Label>
            <div className="relative">
                <Input
                    id={name}
                    type="number"
                    placeholder={placeholder}
                    className={`pl-12 transition-all duration-200 focus:ring-2 focus:ring-offset-0 ${errors[name] ? 'border-destructive focus:ring-destructive/20' : 'focus:ring-primary/20'}`}
                    {...register(name, {
                        required: "این فیلد الزامی است",
                        min: { value: 0, message: "مقدار نمی‌تواند منفی باشد" }
                    })}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
                    امتیاز
                </span>
            </div>
            {errors[name] && (
                <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors[name].message}
                </p>
            )}
        </div>
    );

    if (isEditMode && loading && !scores) {
        return <LoadingSpinner />;
    }

    return (
        <Layout>
            <Layout.Header>
                <Navbar links={topNav} />
            </Layout.Header>

            <Layout.Body>
                <div className="max-w-4xl mx-auto pb-10">
                    {/* Breadcrumb & Back */}
                    <div className="flex items-center gap-4 mb-6">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-full h-8 w-8 p-0"
                            onClick={() => navigate(-1)}
                        >
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                {isEditMode ? 'ویرایش قانون امتیاز' : 'تعریف قانون امتیاز جدید'}
                            </h1>
                            <p className="text-muted-foreground text-sm">
                                مقادیر امتیاز برای فعالیت‌های مختلف کاربران را تعیین کنید.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Card className="border-t-4 border-t-primary shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                    تنظیمات مقادیر
                                </CardTitle>
                                <CardDescription>
                                    به ازای هر فعالیت، کاربر چه مقدار امتیاز دریافت کند؟
                                </CardDescription>
                            </CardHeader>
                            <Separator />

                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                    {/* بخش خرید */}
                                    <div className="space-y-6">
                                        <h3 className="font-semibold text-sm text-muted-foreground mb-4 border-b pb-2 flex items-center gap-2">
                                            <ShoppingBag className="h-4 w-4" />
                                            بخش فروش
                                        </h3>
                                        <ScoreInput
                                            name="ScoreBuy"
                                            label="امتیاز خرید عادی"
                                            icon={ShoppingBag}
                                            colorClass="bg-emerald-500 text-emerald-600"
                                            placeholder="مثلا: 100"
                                        />
                                        <ScoreInput
                                            name="ScoreBuyOne"
                                            label="امتیاز اولین خرید"
                                            icon={Trophy}
                                            colorClass="bg-amber-500 text-amber-600"
                                            placeholder="مثلا: 500"
                                        />
                                    </div>

                                    {/* بخش اجتماعی و دوستان */}
                                    <div className="space-y-6">
                                        <h3 className="font-semibold text-sm text-muted-foreground mb-4 border-b pb-2 flex items-center gap-2">
                                            <Users className="h-4 w-4" />
                                            شبکه‌سازی و دوستان
                                        </h3>
                                        <ScoreInput
                                            name="ScoreRegisterFriend"
                                            label="امتیاز دعوت از دوست"
                                            icon={UserPlus}
                                            colorClass="bg-blue-500 text-blue-600"
                                            placeholder="مثلا: 200"
                                        />
                                        <ScoreInput
                                            name="ScoreBuyFriend"
                                            label="امتیاز خرید دوست"
                                            icon={Users}
                                            colorClass="bg-indigo-500 text-indigo-600"
                                            placeholder="مثلا: 50"
                                        />
                                    </div>

                                    {/* بخش تعاملات */}
                                    <div className="space-y-6 md:col-span-2">
                                        <h3 className="font-semibold text-sm text-muted-foreground mb-4 border-b pb-2 flex items-center gap-2">
                                            <UserCheck className="h-4 w-4" />
                                            تعاملات کاربری
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <ScoreInput
                                                name="ScoreFullProfile"
                                                label="امتیاز تکمیل پروفایل"
                                                icon={UserCheck}
                                                colorClass="bg-purple-500 text-purple-600"
                                                placeholder="مثلا: 150"
                                            />
                                            <ScoreInput
                                                name="ScoreEitaa"
                                                label="امتیاز عضویت در ایتا"
                                                icon={Send}
                                                colorClass="bg-sky-500 text-sky-600"
                                                placeholder="مثلا: 300"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>

                            <div className="bg-muted/30 p-6 flex items-center justify-end gap-3 border-t">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate(-1)}
                                    disabled={loading || isSubmitting}
                                >
                                    انصراف
                                </Button>
                                <Button
                                    type="submit"
                                    className="min-w-[140px]"
                                    disabled={loading || isSubmitting}
                                >
                                    {(loading || isSubmitting) ? (
                                        <>
                                            <LoadingSpinner size="sm" className="ml-2" />
                                            در حال ثبت...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="ml-2 h-4 w-4" />
                                            {isEditMode ? 'ذخیره تغییرات' : 'ایجاد قانون'}
                                        </>
                                    )}
                                </Button>
                            </div>
                        </Card>
                    </form>
                </div>
            </Layout.Body>
        </Layout>
    );
}