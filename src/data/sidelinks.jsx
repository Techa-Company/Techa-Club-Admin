import {
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconHexagonNumber4,
} from "@tabler/icons-react";
import { Archive, ChartColumnBig, Crown, FerrisWheel, Gift, Image, Infinity, LayoutDashboard, Mail, RectangleEllipsis, Settings, Settings2, ShoppingBasket, Slack, TicketPercent, Trophy, Users } from "lucide-react";

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
    href: "/discount-code",
    icon: <TicketPercent size={18} />,
  },
  {
    title: "سناریوی فراموشی",
    label: "",
    href: "",
    icon: <Infinity size={18} />,
    sub: [
      {
        title: "لیست سناریو ها",
        label: "",
        href: "/forget-scenario",
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: "تنظیم سناریوی فراموشی",
        label: "",
        href: "/forget-scenario/edit",
        icon: <IconHexagonNumber2 size={18} />,
      },
    ],
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
        href: "/customer-shopping-list",
        icon: <IconHexagonNumber3 size={18} />,
      },
    ],
  },
  {
    title: "کمپین های فروش",
    label: "",
    href: "/chats",
    icon: <Crown size={18} />,
  },

  {
    title: "مدیریت امتیازات",
    label: "",
    href: "/apps",
    icon: <Trophy size={18} />,
  },

  {
    title: "گردونه شانس",
    label: "",
    href: "/lucky-wheel",
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
    title: "تنظیمات",
    label: "",
    href: "",
    icon: <Settings size={18} />,
    sub: [
      {
        title: "توضیحات داشبورد مشتریان",
        label: "",
        href: "/users",
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: "بنر داشبورد مشتریان",
        label: "",
        href: "/analysis",
        icon: <IconHexagonNumber2 size={18} />,
      },
      {
        title: "لوگوی کسب و کار",
        label: "",
        href: "/analysis",
        icon: <IconHexagonNumber3 size={18} />,
      },
    ],
  },

];