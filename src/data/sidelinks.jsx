import {
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconHexagonNumber4,
} from "@tabler/icons-react";
import { Archive, ChartColumnBig, Crown, FerrisWheel, Gift, Image, Infinity, LayoutDashboard, Mail, RectangleEllipsis, ShoppingBasket, Slack, TicketPercent, Trophy, Users } from "lucide-react";

export const sidelinks = [
  {
    title: "داشبورد",
    label: "",
    href: "/",
    icon: <LayoutDashboard size={18} />,
  },
  {
    title: "قفسه جوایز",
    label: "",
    href: "",
    icon: <Gift size={18} />,
    sub: [
      {
        title: "ایجاد جایزه",
        label: "",
        href: "/prize-shelf/new",
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: "لیست جایزه ها",
        label: "",
        href: "/prize-shelf",
        icon: <IconHexagonNumber2 size={18} />,
      },
    ],
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
    title: "کد های تخفیف",
    label: "",
    href: "",
    icon: <TicketPercent size={18} />,
    sub: [
      {
        title: "استفاده شده",
        label: "",
        href: "/sign-in",
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: "فعال",
        label: "",
        href: "/sign-in-2",
        icon: <IconHexagonNumber2 size={18} />,
      },
      {
        title: "منقضی شده",
        label: "",
        href: "/sign-up",
        icon: <IconHexagonNumber3 size={18} />,
      }
    ],
  },
  {
    title: "سناریوی فراموشی",
    label: "",
    href: "",
    icon: <Infinity size={18} />,
    sub: [
      {
        title: "کد های تخفیف",
        label: "",
        href: "/sign-in",
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: "تنظیم سناریوی فراموشی",
        label: "",
        href: "/sign-in-2",
        icon: <IconHexagonNumber2 size={18} />,
      },
    ],
  },
  {
    title: "مدیریت اعضا",
    label: "3",
    href: "/tasks",
    icon: <Users size={18} />,
  },
  {
    title: "کمپین های فروش",
    label: "9",
    href: "/chats",
    icon: <Crown size={18} />,
  },
  {
    title: "خرید مشتریان",
    label: "",
    href: "/apps",
    icon: <ShoppingBasket size={18} />,
  },
  {
    title: "مدیریت امتیازات",
    label: "",
    href: "/apps",
    icon: <Trophy size={18} />,
  },
  {
    title: "سطح بندی مشتریان",
    label: "",
    href: "/apps",
    icon: <ChartColumnBig size={18} />,
  },
  {
    title: "گردونه شانس",
    label: "",
    href: "/apps",
    icon: <FerrisWheel size={18} />,
  },
  {
    title: "نظرسنجی",
    label: "",
    href: "",
    icon: <Archive size={18} />,
    sub: [
      {
        title: "افزودن نظر سنجی",
        label: "",
        href: "/sign-in",
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: "لیست نظر سنجی",
        label: "",
        href: "/sign-in-2",
        icon: <IconHexagonNumber2 size={18} />,
      },
    ],
  },
  {
    title: "توضیحات داشبورد مشتریان",
    label: "",
    href: "/users",
    icon: <RectangleEllipsis size={18} />,
  },
  {
    title: "بنر داشبورد مشتریان",
    label: "",
    href: "/analysis",
    icon: <Image size={18} />,
  },
  {
    title: "لوگوی کسب و کار",
    label: "",
    href: "/analysis",
    icon: <Slack size={18} />,
  },
];
