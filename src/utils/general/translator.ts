const dictionary = {
  id: "شناسه",
  code: "کد",
  name: "نام",
  title: "عنوان",
  slug: "اسلاگ",
  price: "قیمت",
  discount_price: "قیمت با تخفیف",
  description: "توضیحات",
  state: "وضعیت",
  meta_keywords: "کلمات کلیدی متا",
  meta_description: "توضیحات متا",
  brand_id: "آیدی برند",
  brand: "برند",
  sold: "فروخته شده",
  trend: "ترند",
  category_id: "آیدی دسته بندی",
  summary: "خلاصه",
  site_main_picture: "تصویر اصلی محصول",
  meta_title: "عنوان متا",
  title_page: "عنوان صفحه",
  onesize: "تک سایز",
  Enable: "فعال",
  collection_id: "آیدی مجموعه",
  media: "تصاویر",
  discount_exp: "پایان تخفیف",
  updated_at: "تاریخ آخرین بروزرسانی",
  created_at: "تاریخ ساخت",
  type: "نوع",
  platform: "پلتفرم",
  content: "محتوا",
  content_color: "رنگ محتوا",
  title_color: "رنگ عنوان",
  link: "لینک",
  priority: "اولویت",
  active: "فعال",
  desktop: "دسکتاپ",
  mobile: "موبایل",
  stand: "ایستاده",
  slide: "اسلاید",
  paid: "پرداخت شده",
  delivered: "تحویل داده شده",
  address_id: "شناسه آدرس",
  admin_check: "بررسی ادمین",
  coupon_id: "شناسه کد تخفیف",
  deleted_at: "زمان حذف",
  delivery: "تحویل",
  Events: "جشنواره ها",
  newprice: "قیمت جدید",
  notes: "یادداشت ها",
  number: "شماره",
  payable: "قابل پرداخت",
  payment_id: "شناسه پرداخت",
  post_fee: "فی ارسال",
  status: "وضعیت",
  typesell: "نوع فروش",
  user_id: "شناسه کاربر",
  role: "نقش",
  admin: "ادمین",
  desc: "توضیحات",
  writer: "نویسنده",
  show_categories: "دسته بندی های نمایش",
  labels: "برچسب",
  comments: "نظرات",
  thumb: "تصویر کوچک",
  endimage: "پایانه تصویر",
  endtitle: "پایانه عنوان",
  endalt: "پایانه جایگزین",
  endtext: "پایانه متن",
  isboard: "isboard",
  ishighlight: "ishighlight",
  istop: "istop",
  isvideo: "isvideo",
  iscast: "iscast",
  srcvideo: "منبع ویدیو",
  headers: "هدر ها",
  is_news: "is_news",
  rating: "رتبه بندی",
  comfort: "راحتی",
  quality: "کیفیت",
  size: "سایز",
  width: "عرض",
  product_id: "شناسه محصول",
  product: "محصول",
  banner: "بنر",
  purchased: "خریداری شده",
  phone: "شماره تلفن",
  lastname: "نام خانوادگی",
  email: "ایمیل",
  password: "رمز عبور",
  points: "امتیاز ها",
  decription: "توضیحات",
  amount: "مقدار",
  start: "شروع",
  expiration: "انقضاء",
  min_to_execute: "حداقل برای شروع",
  max: "بیشینه",
  deny_off: "فقط محصولات فروش ویژه",
  limit: "محدودیت",
  count: "تعداد",
  discount_type: "نوع تخفیف",
  discount_amount: "مقدار تخفیف",
  discount_start: "شروع تخفیف",
  discount_end: "پایان تخفیف",
  disc: "توضیحات",
  tag: "برچسب",
  tagtext: "متن برچسب",
  inStock: "فقط محصولات موجود",
  true: "بله",
  false: "خیر",
  items: "موارد",
  picture: "تصویر",
  point: "امتیاز",
  key: "کلید",
  value: "مقدار",
  city: "شهر",
  province: "استان",
  address: "آدرس",
  postalcode: "کد پستی",
  order_id: "شناسه سفارش",
  quantity: "تعداد",
  stock_id: "شناسه انبار",
  post: "پست شده",
  waiting: "در انتظار پرداخت",
  process: "در حال پردازش",
  discount_amout: "مقدار تخفسف",
  cash: "نقدی",
  percent: "درصدی",
  "top-site": "بالای صفحه",
  ad: "تبلیغات",
  "bottom-site": "پایین صفحه",
  "bottom-site-descriptions": "توضیحات پایین صفحه",
  "bottom-site-descrpitions": "توضیحات پایین صفحه",
  "products-bottom-site-menu": "منوی پایین صفحه (مختص صفحه محصولات)",
  invoice: "شماره فاکتور",
  item: "موارد",
  "post-code": "کد پستی",
  "verification-code": "کد تایید",
  permissions: "مجوز ها",
  priceAfterDiscount: "قیمت پس از تخفیف",
  port: "درگاه",
  ref_id: "شناسه مرجع",
  tracking_code: "کد پیگیری",
  card_number: "شماره کارت",
  ip: "آی پی",
  payment_date: "تاریخ پرداخت",
};

export const translator = (target: string) => {
  for (const [key, value] of Object.entries(dictionary)) {
    if (key === target) {
      return value;
    }
  }
  return target;
};
