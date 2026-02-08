import {
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconHexagonNumber4,
  IconHexagonNumber5,
  IconHexagonNumber6,
  IconHexagonNumber7,
} from "@tabler/icons-react";
import { Archive, Crown, FerrisWheel, Gift, Infinity, LayoutDashboard, Mail, Settings, TicketPercent, Trophy, Users } from "lucide-react";

export const sidelinks = [
  {
    title: "داشبورد",
    label: "",
    href: "/",
    icon: <LayoutDashboard size={18} />,
  },

  {
    title: "مدیریت امتیازات",
    label: "",
    href: "/score-eshel",
    icon: <Trophy size={18} />,
  },
  {
    title: "قفسه جوایز",
    label: "",
    href: "/prize-shelf",
    icon: <Gift size={18} />,
  },
  {
    title: "کد های تخفیف",
    label: "",
    href: "/coupons",
    icon: <TicketPercent size={18} />,
  },
  {
    title: "سناریوی فراموشی",
    label: "",
    href: "/forget-scenario",
    icon: <Infinity size={18} />,

  },
  {
    title: "مدیریت مشتریان",
    label: "",
    href: "",
    icon: <Users size={18} />,
    sub: [
      {
        title: "سطح بندی مشتریان",
        label: "",
        href: "/customer-level",
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: "لیست مشتریان",
        label: "",
        href: "/customers",
        icon: <IconHexagonNumber2 size={18} />,
      },
      {
        title: "لیست خرید مشتریان",
        label: "",
        href: "/customer-purchases",
        icon: <IconHexagonNumber3 size={18} />,
      },
      {
        title: "لیست امتیاز کاربران",
        label: "",
        href: "/customer-scores",
        icon: <IconHexagonNumber4 size={18} />,
      },
      {
        title: "لیست جوایز کاربر",
        label: "",
        href: "/customer-prizes",
        icon: <IconHexagonNumber5 size={18} />,
      },
      {
        title: "لیست تخفیفات مشتریان",
        label: "",
        href: "/customer-coupons",
        icon: <IconHexagonNumber6 size={18} />,
      },
      // {
      //   title: "لیست سناریو مشتریان",
      //   label: "",
      //   href: "/customer-scenarios",
      //   icon: <IconHexagonNumber7 size={18} />,
      // },
    ],
  },
  {
    title: "گردونه شانس",
    label: "",
    href: "/lucky-wheel",
    icon: <FerrisWheel size={18} />,
  },
  {
    title: "مدیریت پیامک ها",
    label: "",
    href: "",
    icon: <Mail size={18} />,
    sub: [
      {
        title: "گزارش پیامک ها",
        label: "",
        href: "/sms-management",
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: "خرید بسته",
        label: "",
        href: "/buy-sms",
        icon: <IconHexagonNumber2 size={18} />,
      },
      {
        title: "کمپین های فروش",
        label: "",
        href: "/sales-campaign",
        icon: <Crown size={18} />,
      },
      {
        title: "لیست هزینه ها",
        label: "",
        href: "/expenses",
        icon: <IconHexagonNumber3 size={18} />,
      },
      {
        title: "قالب پیامکی",
        label: "",
        href: "/sms-template",
        icon: <IconHexagonNumber4 size={18} />,
      },
    ],
  },
  {
    title: "نظرسنجی",
    label: "",
    href: "/poll",
    icon: <Archive size={18} />,
  },
  {
    title: "تنظیمات",
    label: "",
    href: "",
    icon: <Settings size={18} />,
    sub: [
      {
        title: "بنر پنل مشتریان",
        label: "",
        href: "setting/banner",
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: "تنظیمات پنل مشتریان",
        label: "",
        href: "/setting/setting",
        icon: <IconHexagonNumber2 size={18} />,
      },
    ],
  },
];