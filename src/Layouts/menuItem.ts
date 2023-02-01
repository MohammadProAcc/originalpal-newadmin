import { MenuItemType } from "@paljs/ui/types";

const items: MenuItemType[] = [
  {
    title: "داشبورد",
    link: { href: "/dashboard" },
  },
  {
    title: "عمومی",
    children: [
      {
        title: "منو",
        link: { href: "/menu" },
      },
      {
        title: "بخش های صفحه اصلی",
        link: { href: "/main-page-sections" },
      },
    ],
  },
  {
    title: "بنر ها",
    children: [
      {
        title: "بنر های ایستاده",
        link: { href: "/banners" },
      },
      {
        title: "اسلایدر ها",
        link: { href: "/main-page" },
      },
    ],
  },
  {
    title: "انبار",
    children: [
      {
        title: "برند ها",
        link: { href: "/brands" },
      },
      {
        title: "برچسب ها",
        link: { href: "/tags" },
      },
      {
        title: "محصولات",
        link: { href: "/products" },
      },
      {
        title: "انبار",
        link: { href: "/stock" },
      },
      {
        title: "کوپن ها",
        link: { href: "/coupons" },
      },
    ],
  },
  {
    title: "کاربران",
    children: [
      {
        title: "کاربران",
        link: { href: "/users" },
      },
      {
        title: "سفارشات",
        link: { href: "/orders" },
      },
      {
        title: "پرداخت ها",
        link: { href: "/payments" },
      },
      {
        title: "آدرس ها",
        link: { href: "/address" },
      },
      {
        title: "نظرات",
        link: { href: "/comments" },
      },
      {
        title: "نقش ها",
        link: { href: "/roles" },
      },
    ],
  },
  {
    title: "وبلاگ و اخبار",
    children: [
      {
        title: "دسته بندی وبلاگ ها",
        link: { href: "/blog-categories" },
      },
      {
        title: "وبلاگ",
        link: { href: "/blog" },
      },
    ],
  },
  {
    title: "ابزار",
    children: [
      {
        title: "فهرست تخفیفات",
        link: { href: "/coupons/aggregate" },
      },
      {
        title: "ارسال پیامک",
        link: { href: "/sms" },
      },
      {
        title: "جستجوی کاربران",
        link: { href: "/user-details" },
      },
      {
        title: "گرفتن خروجی",
        link: { href: "/export" },
      },
    ],
  },
];

export default items;
export type CurrentItems = typeof items;
