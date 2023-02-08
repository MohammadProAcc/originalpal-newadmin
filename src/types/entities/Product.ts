export interface Media {
  t: string;
  a: string;
  s: number;
  u: string;
  p: number;
}

export interface ProductBrand {
  id: number;
  name: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ProductStock {
  id: number;
  product_id: number;
  count: number;
  size: string;
  created_at: string;
  updated_at: string;
  price: string;
  discount_type: string;
  discount_amout: string;
  discount_start: string;
  discount_end: string;
  code: string;
  disc: string;
  priceAfterDiscount: string;
}

export interface Product {
  id: number;
  code: string;
  name: string;
  title: string;
  slug: string;
  price: string;
  discount_price: string;
  description: string;
  state: string;
  meta_keywords: string;
  meta_description: string;
  brand_id: number;
  sold: string;
  trend: number;
  category_id: number;
  summary: string;
  site_main_picture: Media;
  meta_title: string;
  title_page: string;
  onesize: string;
  Enable: number;
  collection_id: number;
  media: Media[];
  discount_exp: number;
  updated_at: string;
  created_at: string;
  url: string;
  tags: [];
  brand: ProductBrand[];
  collection: null;
  category: ProductCategory;
  stock: ProductStock[];
}

export const MOCK_PRODUCT = {
  id: 91,
  code: "MRT580TH",
  name: "کفش نیو بالانس ورزشی ری‌ اینجینیرد New Balance Re Engineered MRT580TH",
  title: "کفش نیو بالانس ورزشی ری‌ اینجینیرد",
  slug: null,
  price: "3885000",
  discount_price: null,
  description:
    '<h2>کفش جدید نیو بالانس دخترانه پسرانه اسپرت مخصوص ورزش</h2>\r\n<p><span style="color: #727272; font-family: BKoodak; font-size: 15px; text-align: justify;">&nbsp;</span></p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; line-height: 1.82;"><span style="color: #000001; font-family: BKoodak;"><span style="font-size: 15px;"><span style="color: #727272;">کتونی</span><span style="color: #000001;">&nbsp;نیو بالانس ری&zwnj;اینجینیرد یک&nbsp;</span></span></span><span style="color: #727272; font-family: BKoodak;"><span style="font-size: 15px;"><strong><span dir="RTL" lang="AR-SA" style="font-size: 11.5pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;">کفش اسپرت زنانه و مردانه جدید</span></strong>&nbsp;از <span style="text-decoration: underline;"><strong><a title="تاریخچه کمپانی نیو بالانس" href="https://originalpal.com/blog-single/69/">کمپانی آمریکایی نیوبالانس</a></strong></span> است. این&nbsp;</span></span><span style="color: #727272; font-family: BKoodak;"><span style="font-size: 15px;"><strong><span dir="RTL" lang="AR-SA" style="font-size: 10.5pt; line-height: 107%; font-family: Arial, sans-serif; color: #444444; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-weight: normal;">کتانی روزمره نیوبالانس</span></strong>&nbsp;نمونه کاملی از ترکیب خلاقیت و فناوری در&nbsp;</span></span><span style="color: #727272; font-family: BKoodak; font-size: 15px;">تولیدات اخیر نیو بالانس (New Balance)</span><span style="color: #727272; font-family: BKoodak;"><span style="font-size: 15px;">&nbsp;است. نیوبالانس برای تولید این کفش سنگ تمام گذاشته است.</span></span></p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">برای بررسی این کتونی شیک با <span style="text-decoration: underline;"><strong><a title="فروشگاه اینترنتی کفش و کتونی اورجینال" href="https://originalpal.com/">اورجینال پل</a></strong></span> همراه باشید.</p>\r\n<p>&nbsp;</p>\r\n<h2>بررسی تخصصی کفش نیو بالانس ورزشی ری&zwnj;اینجینیرد MRT580TH</h2>\r\n<p>&nbsp;</p>\r\n<p>&nbsp;</p>\r\n<ul>\r\n<li>\r\n<h3>رویه کفش</h3>\r\n</li>\r\n</ul>\r\n<p>&nbsp;</p>\r\n<h4>خداحافظی با عرق کردن پا</h4>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; -webkit-tap-highlight-color: transparent; color: #727272; font-weight: 300; letter-spacing: normal; outline: 0px !important;"><span lang="AR-SA"><strong style="color: #727272; font-size: 15px; font-weight: 300; letter-spacing: normal;"><strong style="color: #444444; font-size: 14px;"><span dir="RTL" lang="AR-SA" style="font-size: 12pt; line-height: 107%; font-family: Arial, sans-serif; color: #727272; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-weight: normal;">کفش نیوبالانس راحتی پسرانه </span></strong><strong style="color: #444444; font-size: 14px;"><span style="font-size: 12pt; line-height: 107%; font-family: Verdana, sans-serif; color: #727272; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-weight: normal;">MRT580TH</span></strong>&nbsp;</strong></span><span lang="AR-SA" style="-webkit-tap-highlight-color: transparent; outline: 0px !important;">از ترکیب <strong>الیاف مصنوعی</strong>، <strong>جیر</strong> و <span style="text-decoration: underline;"><strong><a title="فناوری مش (Mesh) در رویه کفش های اورجینال" href="https://originalpal.com/blog-single/179/ ">مش (Mesh)</a></strong></span> ساخته شده است. استفاده از الیاف مصنوعی در&nbsp;<span style="text-decoration: underline;"><strong><a style="color: #000001; text-decoration: underline; transition: color 0.2s ease 0s; -webkit-tap-highlight-color: transparent; outline: 0px !important;" title="ساختار رویه کتانی اورجینال" href="https://originalpal.com/blog-single/10/">رویه&zwnj;ی کتونی</a></strong></span>&nbsp;انعطاف&zwnj;پذیری بالایی را به این <span style="text-decoration: underline;"><strong><a title="نحوه انتخاب کفش ورزشی مناسب" href="https://originalpal.com/blog-single/81/">کفش ورزشی</a></strong></span> اورجینال داده است که موجب کاهش فشار&zwnj;های وارده به پا می&zwnj;شود. مش موجود در رویه&zwnj;ی این کتونی سبب می&zwnj;شود تا پای شما در هوای گرم و یا پس از فعالیت&zwnj;های طولانی مدت دم نکند. با سیستم گردش هوای این کتانی، احساس خوشایندی به شما دست خواهد داد چرا که محیط داخلی کفش به محیطی خشک و خنک تبدیل می&zwnj;شود. تعریق پا در هنگام پیاده&zwnj;روی روزمره موجب مشکلاتی چون تاول زدن پا، خستگی و <span style="text-decoration: underline;"><strong><a title="راه های ساده از بیم بردن کفش و کتونی" href="https://originalpal.com/blog-single/80/">بو گرفتن کفش</a></strong></span> و پای شما می&zwnj;گردد.&nbsp;کمپانی نیو بالانس با آگاهی از مسائلی مانند دَم کردن پا و بو گرفتن کتانی، متریال درجه یکی را برای این&nbsp;<span dir="RTL" lang="AR-SA" style="font-size: 12pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;">کفش نیو بالانس زنانه مردانه</span>&nbsp;به کار برده&lrm;&zwnj; و با فناوری&zwnj;های به روز، تمام این مشکلات را برطرف کرده است.</span></p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">&nbsp;</p>\r\n<h4 style="margin: 9.5px 0px; font-family: BKoodak; line-height: 1.2; color: #34353e; text-rendering: optimizelegibility; font-size: 18px; -webkit-font-smoothing: antialiased; letter-spacing: -0.03em; text-align: right;">به زیبایی و راحتی سلام کنید</h4>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; line-height: 1.82;"><span lang="AR-SA"><span style="color: #727272; font-family: BKoodak;"><span style="font-size: 15px;">&nbsp;به کار بردن الیاف مصنوعی در این&nbsp;<span dir="RTL" lang="AR-SA" style="font-size: 12pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;"><strong>کفش کلاسیک</strong> پسرانه نیو بالانس</span>&nbsp;سبب آزادی عمل بیشتر پا به هنگام <span style="text-decoration: underline;"><strong><a title="کفش مناسب پیاده روی و بررسی ویژگی های آن" href="https://originalpal.com/blog-single/181/ ">پیاده&zwnj;روی</a></strong></span></span></span><span style="color: #727272; font-family: BKoodak;"><span style="font-size: 15px;">&nbsp;و <span style="text-decoration: underline;"><strong><a title="کفش مخصوص دویدن" href="https://originalpal.com/blog-single/205/ ">دویدن</a></strong></span></span></span><span style="color: #727272; font-family: BKoodak;"><span style="font-size: 15px;">&nbsp;در مسافت&zwnj;های طولانی شده و مانع از خستگی شما می&zwnj;شود. این کفش به محض پوشیدن با فرم پای شما هماهنگ می&zwnj;شود و به انگشتان شما فشاری وارد نمی&zwnj;کند.&nbsp;</span></span></span><span lang="AR-SA" style="color: #727272; font-family: BKoodak; font-size: 15px;">طبق سنت همیشگی نیو بالانس، در کناره، پشت و بر روی زبانه&zwnj;ی این کتونی از <strong>حرف</strong></span><strong><span dir="LTR" style="color: #727272; font-family: BKoodak; font-size: 15px;">&nbsp;(N)&nbsp;</span></strong><span lang="AR-SA" style="color: #727272; font-family: BKoodak; font-size: 15px;">که کلمه اول نام این برند می&zwnj;باشد، استفاده شده است. این عمل سبب می&zwnj;شود تا مخاطبان در <span style="text-decoration: underline;"><strong><a title="تشخیص کفش اصل و فیک" href="https://originalpal.com/blog-single/58/">تشخیص کفش اصل از کپی و های کپی (HighCopy)</a></strong></span></span><span dir="LTR" style="color: #727272; font-family: BKoodak; font-size: 15px;">&nbsp;</span><span lang="AR-SA" style="color: #727272; font-family: BKoodak; font-size: 15px;">دچار مشکل نشوند. البته ما&nbsp;<strong><span style="text-decoration: underline;"><span style="text-decoration-line: underline;"><a style="color: #000001; text-decoration: underline; transition: color 0.2s ease 0s; -webkit-tap-highlight-color: transparent; outline: 0px !important;" title="چگونه کفش اصل را از تقلبی تشخیص دهیم؟" href="https://originalpal.com/blog-single/187/">راهکارهای تشخیص اصالت کفش </a></span></span></strong>&nbsp;را برای شما د وبلاگ توضیح داده&zwnj;ایم.&nbsp;</span></p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; line-height: 1.82;"><span style="color: #727272; font-family: BKoodak;"><span style="font-size: 15px;">اهل ورزش و دویدن نیستید؟! پس شما را به مطالعه&zwnj;ی مقاله </span></span><span style="text-decoration: underline;"><strong><a title="دویدن سلامتی شما را تضمین خواهد کرد!" href="https://originalpal.com/blog-single/125/">کلید سلامت روح و جسم</a></strong></span><span style="color: #727272; font-family: BKoodak;"><span style="font-size: 15px;">&nbsp;دعوت می&zwnj;کنیم.</span></span></p>\r\n<p>&nbsp;</p>\r\n<p>&nbsp;</p>\r\n<ul>\r\n<li>\r\n<h3>لایه میانی</h3>\r\n</li>\r\n</ul>\r\n<p>&nbsp;</p>\r\n<h4><strong>تکنولوژی رولایت</strong></h4>\r\n<p>لایه میانی&nbsp;<span dir="RTL" lang="AR-SA" style="font-size: 10.5pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;">کتونی نیوبالانس زنانه مردانه کلاسیک</span>&nbsp;یکی از منعطف&zwnj;ترین نمونه&zwnj;های تولید شده توسط این کمپانی می&zwnj;باشد. دلیل این موضوع نیز بهره بردن از&nbsp;<strong>تکنولوژی رولایت (&reg; REVlite)</strong>&nbsp;در لایه میانی این کتانی اورجینال است. از طرفی استفاده از این تکنولوژی با توجه به ضربه&zwnj;گیری خوبی که دارد موجب کاهش فشار&zwnj;های وارده به پا در پیاده&zwnj;روی می&zwnj;شود. شما می&zwnj;توانید با خیالی آسوده به پیاده&zwnj;روی&zwnj;های طولانی مدت رفته و یا با این کتانی به انجام فعالیت&zwnj;های ورزشی بپردازید. هم&zwnj;چنین تکنولوژی رولایت موجب <strong>سبک و راحت بودن کفش</strong> می&zwnj;شود. به طوری که طبق نظرسنجی&zwnj;ها تعداد زیادی از خریداران کفش نیو بالانس ورزشی MRT580TH، از راحتی کتونی شگفت زده شده&zwnj;اند.</p>\r\n<p>&nbsp;</p>\r\n<h4 style="margin: 9.5px 0px; font-family: BKoodak; line-height: 1.2; color: #34353e; text-rendering: optimizelegibility; font-size: 18px; -webkit-font-smoothing: antialiased; letter-spacing: -0.03em; text-align: right;"><span style="text-align: justify;">قدم زدن با لذتی باورنکردنی</span></h4>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;"><span lang="AR-SA">لایه&zwnj;ی میانی<strong>&nbsp;</strong><strong><span dir="RTL" lang="AR-SA" style="font-size: 14pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-weight: normal;">کفش دخترانه پسرانه اسپرت </span><span dir="RTL" lang="AR-SA" style="font-size: 14pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;"><span style="text-decoration: underline;"><a title="کتونی رانینگ مناسب چه ویژگی هایی دارد؟" href="https://originalpal.com/blog-single/205/">مناسب رانینگ</a></span></span><span dir="RTL" lang="AR-SA" style="font-size: 14pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-weight: normal;"> نیوبالانس</span></strong>&nbsp;با داشتن خاصیت جذب&zwnj;کنندگی بالا میزان زیادی از فشار&zwnj;های وارده از سمت زمین را به خود جذب کرده و مانع از آسیب رسیدن به پای شما می&zwnj;شود. این لایه به قدری نرم و منعطف است که اکثر ضرباتی که سطوح مختلف به کفش وارد می&zwnj;کنند را جذب می&zwnj;کند تا از فشار اضافه به کف پاهای شما جلوگیری شود. این&nbsp;<strong><span dir="RTL" lang="AR-SA" style="font-size: 12pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;">کتونی طبی و راحت نیوبالانس </span><span style="font-size: 12pt; line-height: 107%; font-family: BKoodak, serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;">MRT580TH</span></strong>&nbsp;برای کسانی که از خار پاشنه رنج می&zwnj;برند هم ایده&zwnj;آل است. ما در <span style="text-decoration: underline;"><strong><a title="وبلاگ علمی تخصصی اورجینال" href="https://originalpal.com/blog/">وبلاگ اورجینال پَل</a></strong></span> مقاله مفصلی در ارتباط با<span style="text-decoration: underline;"><span style="text-decoration-line: underline;"><a style="color: #000001; text-decoration-line: none; transition: color 0.2s ease 0s; -webkit-tap-highlight-color: transparent; outline: 0px !important;" title="عارضه خار پاشنه و معرفی کفش&zwnj;های طبی مناسب" href="https://originalpal.com/blog-single/75/"><strong>&nbsp;خار پاشنه</strong></a></span></span>&nbsp;قرار داده&zwnj;ایم که می&zwnj;توانید با مطالعه&zwnj;ی آن&zwnj; اطلاعات خوبی را به دست بیاورید. فراموش نکنید که&nbsp;<span style="text-decoration-line: underline;"><span style="text-decoration: underline;"><strong><a style="color: #000001; transition: color 0.2s ease 0s; -webkit-tap-highlight-color: transparent; outline: 0px !important; text-decoration: underline;" title="راهنمای انتخاب کفش و کتانی مناسب" href="https://originalpal.com/blog-single/62/">انتخاب کفش مناسب</a></strong></span></span>&nbsp;هم در تسکین دردهای خار پاشنه بسیار موثر می&zwnj;باشد.</span></p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">&nbsp;</p>\r\n<h4 style="margin: 9.5px 0px; font-family: BKoodak; line-height: 1.2; color: #34353e; text-rendering: optimizelegibility; font-size: 18px; -webkit-font-smoothing: antialiased; letter-spacing: -0.03em; text-align: right;">نگران فرم پاهای خود نباشید</h4>\r\n<p style="margin: 9.5px 0px; font-family: BKoodak; line-height: 1.2; color: #34353e; text-rendering: optimizelegibility; font-size: 18px; -webkit-font-smoothing: antialiased; letter-spacing: -0.03em; text-align: right;">کمپانی نیو بالانس در طراحی لایه میانی این کفش دقت بالایی به کار برده تا برای انواع پاها مناسب باشد. کتونی&nbsp;ری اینجینیرد&nbsp;نیوبالانس با <span style="text-decoration: underline;"><strong><a title="اهمیت زیره طبی و ارگونومی کفش" href="https://originalpal.com/blog-single/201/">ارگونومی</a></strong></span> فوق&zwnj;العاده&zwnj;ی خود با فرم پنجه&zwnj; و پاشنه&zwnj;ی پای شما مطابق می&zwnj;شود و راحتی بی&zwnj;نظیری را به شما می&zwnj;دهد. ویژگی&zwnj;های ارگونومیک این کفش از آسیب رسیدن به پاها و کمر در درازمدت جلوگیری می&zwnj;کند. به همین دلیل کتانی نیو بالانس مخصوص پیاده روی و دویدن مدل&nbsp;<strong><span style="color: #444444; font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; text-align: start;">ری&zwnj;اینجینیرد MRT580TH،&nbsp;</span></strong>یک کفش ورزشی از برند نیو بالانس برای انجام حرکات&nbsp;حرفه&zwnj;ای&nbsp;و سنگین ورزشی می باشد.</p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">&nbsp;</p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">&nbsp;</p>\r\n<ul>\r\n<li>\r\n<h3>زیره کفش</h3>\r\n</li>\r\n</ul>\r\n<p>&nbsp;</p>\r\n<h4 style="margin: 9.5px 0px; font-family: BKoodak; line-height: 1.2; color: #34353e; text-rendering: optimizelegibility; font-size: 18px; -webkit-font-smoothing: antialiased; letter-spacing: -0.03em; text-align: justify;">بسیار نرم و راحت</h4>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;"><span lang="AR-SA">زیره&zwnj;ی بیرونی کتانی&nbsp;</span><span style="color: #444444; font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; text-align: start;">دخترانه پسرانه ری اینجینیرد MRT580TH</span>&nbsp;از جنس&nbsp;لاستیک فشرده&nbsp;می&zwnj;باشد. این لایه با داشتن شیارهایی در خود مانع از لیز خوردن شما می&zwnj;شود و با داشتن مقاومت زیاد در برابر فرسودگی به عمر کتانی می&zwnj;افزاید. <span style="text-decoration: underline;"><strong><a title="چرا در زیره کفش های اورجینال از لاستیک طبیعی استفاده می کنند؟" href="https://originalpal.com/blog-single/59/">لاستیک طبیعی</a></strong></span> که در این&nbsp;<span dir="RTL" lang="AR-SA" style="font-size: 12pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;">کتونی طبی مخصوص ورزش نیوبالانس</span>&nbsp;به کار رفته دارای خواص شگفت انگیزی است که ترکیب این خواص با لایه&zwnj;ی میانی کتونی باعث می&zwnj;شود که شما نرمی بسیار زیادی را در هنگام دویدن احساس کنید. این کتونی برای انجام فعالیت&zwnj;های ورزشی و پیاده روی ایده&zwnj;آل است.</p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">&nbsp;</p>\r\n<h4 style="margin: 9.5px 0px; font-family: BKoodak; line-height: 1.2; color: #34353e; text-rendering: optimizelegibility; font-size: 18px; -webkit-font-smoothing: antialiased; letter-spacing: -0.03em; text-align: right;"><span style="text-align: justify;">چسبندگی زیره&nbsp; ری اینجینیرد روی همه&zwnj;ی سطوح</span></h4>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">زیره&zwnj;ی این <strong>کفش نیو بالانس اسپرت</strong>&nbsp;چسبندگی بسیار زیادی دارد. این چسبندگی هنگام دویدن روی سطوح خیس و ناهموار به کمک شما می&zwnj;آید و هنگام تغییر دادن مسیر و یا تغییر جهت ناگهانی باعث ثبات شما در هنگام دویدن می&zwnj;شود. اگر از لیز خوردن هنگام دویدن در سالن ورزشی گلایه دارید نیو بالانس با ایجاد شیارهای خاص در زیره&zwnj;ی کتونی این مساله را به طور کامل حل کرده است تا شما نهایت لذت را از ورزش در کنار دوستانتان ببرید.</p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">&nbsp;</p>\r\n<h4 style="margin: 9.5px 0px; font-family: BKoodak; line-height: 1.2; color: #34353e; text-rendering: optimizelegibility; font-size: 18px; -webkit-font-smoothing: antialiased; letter-spacing: -0.03em; text-align: right;">عناصر ارگونومیک در زیره کتانی</h4>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">زیره و لایه&zwnj;ی میانی این&nbsp;کتانی&nbsp;به گونه ای طراحی و ساخته شده است که فشار را از روی کمر و ستون فقرات بر می&zwnj;دارد و باعث می&zwnj;شود تا ضربات وارده از سمت زمین به زانو و مچ پای شما آسیبی وارد نکند. این ویژگی باعث می&zwnj;شود که شما در پیاده روی های طولانی مدت و ورزش&zwnj;های سنگین دچار آسیب دیدگی در زانو و مچ نشوید. فراموش نکنید که داشتن یک کتانی مناسب برای جلوگیری از آسیب دیدن مفاصل و تاندون های بدن الزامی است، چرا که هیچ کسی دوست ندارد در حین <span style="text-decoration: underline;"><a title="ورزش و دویدن بهترین راه کاهش وزن برای خانم ها و اقایان" href="https://originalpal.com/blog-single/125/"><strong>ورزش</strong> </a></span>یا پیاده روی آسیب ببیند. لازم به به ذکر است که ما مطلب مفصلی در مورد&nbsp;<span style="text-decoration: underline;"><span style="text-decoration-line: underline;"><strong><a style="color: #000001; transition: color 0.2s ease 0s; -webkit-tap-highlight-color: transparent; outline: 0px !important; text-decoration: underline;" title="نکات طلایی برای انجام ورزش پیاده روی" href="https://originalpal.com/blog-single/114/">اصول پیاده روی و فواید آن</a></strong></span></span>&nbsp;را در وبلاگ مان قرار داده&zwnj;ایم که خواندن آن اطلاعات مفیدی را در اختیارتان قرار می&zwnj;دهد.</p>\r\n<p>&nbsp;</p>\r\n<p>&nbsp;</p>\r\n<ul>\r\n<li>\r\n<h3>جمع&zwnj;بندی</h3>\r\n</li>\r\n</ul>\r\n<p>&nbsp;</p>\r\n<p>کتونی نیو بالانس ری&zwnj;اینجینیرد زنانه مردانه اسپرت MRT580TH همان&zwnj;طور که از اسمش پیداس یکی از کفش&zwnj;هایی است که برند نیو بالانس اقدام به تولید مجدد آن کرده است. این کتونی که با تجربه نیوبالانس و <span style="text-decoration: underline;"><strong><a title="تکنولوژی کفش های اورجینال" href="https://originalpal.com/blog/technology-shoes/">فناوری&zwnj;های جدید دنیای کفش و کتانی</a></strong></span> آمیخته شده است. یکی از بهترین کتونی&zwnj;ها برای دویدن و پیاده&zwnj;روی شما می&zwnj;باشد. گفتن این نکته نیز خالی از لطف نیست که این <strong>کتونی حرفه ای</strong> یکی از راحت&zwnj;ترین کفش&zwnj;های تولید شده توسط این کمپانی می&zwnj;باشد.</p>\r\n<p><strong>شما می&zwnj;توانید با خرید اینترنتی این کفش از فرشگاه آنلاین&nbsp;اورجینال پَل ضمن اطمینان از اصل (اورجینال) بودن کفش، از خرید خود مطمئن بوده و لذت ببرید.</strong></p>\r\n<p>&nbsp;</p>\r\n<p>&nbsp;جهت <span style="text-decoration: underline;"><strong><a title="اخبار برندهای کتونی های اورجینال" href="https://originalpal.com/blog/brandsnews/">اطلاع از آخرین اخبار برندها</a></strong></span> و مشاهده سایر کتونی های اورجینال پَل به فروشگاه آنلاین اورجینال پل مراجعه نمایید.</p>\r\n<p>&nbsp;</p>\r\n<ul>\r\n<li>\r\n<h3>مشخصات اجمالی</h3>\r\n</li>\r\n</ul>\r\n<h3>کفش نیو بالانس ری&zwnj;اینجینیرد New Balance Re Engineered MRT580TH</h3>\r\n<ul>\r\n<li>\r\n<h5>نوع کتانی: پیاده&zwnj;روی / رانینگ / ورزش / روزمره</h5>\r\n</li>\r\n<li>\r\n<h5>آرت نامبر: MRT580TH</h5>\r\n</li>\r\n<li>\r\n<h5>متریال ساخت: الیاف مصنوعی / جیر / مش</h5>\r\n</li>\r\n<li>\r\n<h5>رنگ: سورمه ای/ سفید</h5>\r\n</li>\r\n<li>\r\n<h5>صاحب برند: نیو بالانس (NewBalance)</h5>\r\n</li>\r\n<li>\r\n<h5>نام کفش به فارسی: نیوبالانس ری&zwnj;اینجینیرد MRT580TH</h5>\r\n</li>\r\n<li>\r\n<h5>نام کفش به لاتین:&nbsp;New Balance ReEngineered MRT580TH</h5>\r\n</li>\r\n</ul>',
  state: "موجود در انبار",
  meta_keywords:
    "کتونی نیوبالانس,کفش نیوبالانس,کتانی برند نیوبالانس,خرید اینترنتی کتونی,فروشگاه کفش آنلاین,پرفروش ترین کفش نیو بالانس,کتانی زیره لاستیکی فوتبال و فوتسال,کفش سالنی با کیفیت,کفش والیبال قابل شست و شو,کتونی بسکتبال مقاوم,کتانی مخصوص پریدن",
  meta_description: null,
  brand_id: "4",
  sold: null,
  trend: "9972",
  category_id: "1",
  summary:
    "کتونی نیوبالانس کلاسیک مدل MRT580TH یک کفش لوکس پسرانه و دخترانه است. این مدل با الهام از کفش‌های قبلی محبوب این کمپانی طراحی شده است. این کفش نیو بالانس با ظاهری زیبا و جذاب، رنگ بندی کلاسیک و کیفیت بالای مواد به کار رفته در ساخت، یک کتانی ایده آل برای استفاده در پیاده روی روزمره و ورزش است.",
  site_main_picture: {
    t: "کفش نیوبالانس اصل",
    a: "کفش نیوبالانس",
    s: 1,
    u: "products/October2019/tkYPNhXcP9hFadrGCWQ1.jpg",
    p: 0,
  },
  meta_title:
    "امروزه کفش های اسپرت کلاسیک طرفداران زیادی بخصوص جوانان خوش استایل را جذب خود کرده است. از این رو کمپانی ابر قدرت نیو بالانس تصمیم به تولید یکی از بهترین کتونی های خود به نام ری اینجینیرد MRT580TH گرفته است. اگر شما هم جزء دسته شیک پوشان و اسپرت استایل هستید پیشنهاد می کنیم از این کتونی نیو بالانس استفاده کنید",
  title_page: "کفش نیو بالانس ورزشی &#8208 کتانی اسپرت مردانه و زنانه",
  onesize: "0",
  Enable: "1",
  collection_id: null,
  media: [
    {
      t: "",
      a: "",
      s: 1,
      u: "products/October2019/yxbxh4NgBvLQjAxjzQIn.jpg",
      p: 0,
      l: "",
    },
    {
      t: "",
      a: "",
      s: 1,
      u: "products/October2019/CU1odf4iTBlFCnZNa19Q.jpg",
      p: 0,
      l: "",
    },
    {
      t: "",
      a: "",
      s: 1,
      u: "products/October2019/Q4a1H0NlEJ1IJNq1S9vr.jpg",
      p: 0,
      l: "",
    },
    {
      t: "",
      a: "",
      s: 1,
      u: "products/October2019/FOR85lxBIU7HIpZn7qF2.jpg",
      p: 0,
      l: "",
    },
    {
      t: "",
      a: "",
      s: 1,
      u: "products/October2019/3F4EP4MRnkug51F6Kn9H.jpg",
      p: 0,
      l: "",
    },
    {
      t: "",
      a: "",
      s: 1,
      u: "products/October2019/t64wueOLPzFoXzhBxk7U.jpg",
      p: 0,
      l: "",
    },
    {
      t: "",
      a: "",
      s: 1,
      u: "products/October2019/jI3TxKQJiVabd4QkicGV.jpg",
      p: 0,
      l: "",
    },
    {
      t: "",
      a: "",
      s: 1,
      u: "products/October2019/uY9qs88X0TlLqlsEq56d.jpg",
      p: 0,
      l: "",
    },
    {
      t: "",
      a: "",
      s: 1,
      u: "products/October2019/HqToiQqRI1uZU3sIpbbt.jpg",
      p: 0,
      l: "",
    },
    {
      t: "",
      a: "",
      s: 1,
      u: "products/October2019/ZdvOtHWpwE85kUguXKPU.jpg",
      p: 0,
      l: "",
    },
    {
      t: "",
      a: "",
      s: 1,
      u: "/products/2023/January/UV8tw09xXX6UgbDzy4zE.jpg",
      p: 0,
    },
  ],
  discount_exp: "0000-00-00 00:00:00",
  updated_at: "2023-01-24T14:03:20.000000Z",
  created_at: "2018-10-29T07:58:00.000000Z",
  video: null,
  comments_stat: [
    {
      "avg(rating)": null,
      "avg(comfort)": null,
      "avg(quality)": null,
      replies: [],
    },
  ],
  url: "/products/NewBalance/91/کفش-نیو-بالانس-ورزشی-ری-اینجینیرد-new-balance-re-engineered-mrt580th",
  stock: [
    {
      id: 190,
      product_id: "91",
      count: "3",
      size: "43",
      created_at: "2018-10-31T10:06:00.000000Z",
      updated_at: "2021-07-24T11:53:30.000000Z",
      price: "3885000",
      discount_type: null,
      discount_amout: null,
      discount_start: null,
      discount_end: null,
      code: "MRT580TH",
      disc: "US=9.1/2__ UK=9__ EUR=43__CM=275",
      priceAfterDiscount: "3885000",
      product: {
        id: 91,
        code: "MRT580TH",
        name: "کفش نیو بالانس ورزشی ری‌ اینجینیرد New Balance Re Engineered MRT580TH",
        title: "کفش نیو بالانس ورزشی ری‌ اینجینیرد",
        slug: null,
        price: "3885000",
        discount_price: null,
        description:
          '<h2>کفش جدید نیو بالانس دخترانه پسرانه اسپرت مخصوص ورزش</h2>\r\n<p><span style="color: #727272; font-family: BKoodak; font-size: 15px; text-align: justify;">&nbsp;</span></p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; line-height: 1.82;"><span style="color: #000001; font-family: BKoodak;"><span style="font-size: 15px;"><span style="color: #727272;">کتونی</span><span style="color: #000001;">&nbsp;نیو بالانس ری&zwnj;اینجینیرد یک&nbsp;</span></span></span><span style="color: #727272; font-family: BKoodak;"><span style="font-size: 15px;"><strong><span dir="RTL" lang="AR-SA" style="font-size: 11.5pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;">کفش اسپرت زنانه و مردانه جدید</span></strong>&nbsp;از <span style="text-decoration: underline;"><strong><a title="تاریخچه کمپانی نیو بالانس" href="https://originalpal.com/blog-single/69/">کمپانی آمریکایی نیوبالانس</a></strong></span> است. این&nbsp;</span></span><span style="color: #727272; font-family: BKoodak;"><span style="font-size: 15px;"><strong><span dir="RTL" lang="AR-SA" style="font-size: 10.5pt; line-height: 107%; font-family: Arial, sans-serif; color: #444444; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-weight: normal;">کتانی روزمره نیوبالانس</span></strong>&nbsp;نمونه کاملی از ترکیب خلاقیت و فناوری در&nbsp;</span></span><span style="color: #727272; font-family: BKoodak; font-size: 15px;">تولیدات اخیر نیو بالانس (New Balance)</span><span style="color: #727272; font-family: BKoodak;"><span style="font-size: 15px;">&nbsp;است. نیوبالانس برای تولید این کفش سنگ تمام گذاشته است.</span></span></p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">برای بررسی این کتونی شیک با <span style="text-decoration: underline;"><strong><a title="فروشگاه اینترنتی کفش و کتونی اورجینال" href="https://originalpal.com/">اورجینال پل</a></strong></span> همراه باشید.</p>\r\n<p>&nbsp;</p>\r\n<h2>بررسی تخصصی کفش نیو بالانس ورزشی ری&zwnj;اینجینیرد MRT580TH</h2>\r\n<p>&nbsp;</p>\r\n<p>&nbsp;</p>\r\n<ul>\r\n<li>\r\n<h3>رویه کفش</h3>\r\n</li>\r\n</ul>\r\n<p>&nbsp;</p>\r\n<h4>خداحافظی با عرق کردن پا</h4>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; -webkit-tap-highlight-color: transparent; color: #727272; font-weight: 300; letter-spacing: normal; outline: 0px !important;"><span lang="AR-SA"><strong style="color: #727272; font-size: 15px; font-weight: 300; letter-spacing: normal;"><strong style="color: #444444; font-size: 14px;"><span dir="RTL" lang="AR-SA" style="font-size: 12pt; line-height: 107%; font-family: Arial, sans-serif; color: #727272; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-weight: normal;">کفش نیوبالانس راحتی پسرانه </span></strong><strong style="color: #444444; font-size: 14px;"><span style="font-size: 12pt; line-height: 107%; font-family: Verdana, sans-serif; color: #727272; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-weight: normal;">MRT580TH</span></strong>&nbsp;</strong></span><span lang="AR-SA" style="-webkit-tap-highlight-color: transparent; outline: 0px !important;">از ترکیب <strong>الیاف مصنوعی</strong>، <strong>جیر</strong> و <span style="text-decoration: underline;"><strong><a title="فناوری مش (Mesh) در رویه کفش های اورجینال" href="https://originalpal.com/blog-single/179/ ">مش (Mesh)</a></strong></span> ساخته شده است. استفاده از الیاف مصنوعی در&nbsp;<span style="text-decoration: underline;"><strong><a style="color: #000001; text-decoration: underline; transition: color 0.2s ease 0s; -webkit-tap-highlight-color: transparent; outline: 0px !important;" title="ساختار رویه کتانی اورجینال" href="https://originalpal.com/blog-single/10/">رویه&zwnj;ی کتونی</a></strong></span>&nbsp;انعطاف&zwnj;پذیری بالایی را به این <span style="text-decoration: underline;"><strong><a title="نحوه انتخاب کفش ورزشی مناسب" href="https://originalpal.com/blog-single/81/">کفش ورزشی</a></strong></span> اورجینال داده است که موجب کاهش فشار&zwnj;های وارده به پا می&zwnj;شود. مش موجود در رویه&zwnj;ی این کتونی سبب می&zwnj;شود تا پای شما در هوای گرم و یا پس از فعالیت&zwnj;های طولانی مدت دم نکند. با سیستم گردش هوای این کتانی، احساس خوشایندی به شما دست خواهد داد چرا که محیط داخلی کفش به محیطی خشک و خنک تبدیل می&zwnj;شود. تعریق پا در هنگام پیاده&zwnj;روی روزمره موجب مشکلاتی چون تاول زدن پا، خستگی و <span style="text-decoration: underline;"><strong><a title="راه های ساده از بیم بردن کفش و کتونی" href="https://originalpal.com/blog-single/80/">بو گرفتن کفش</a></strong></span> و پای شما می&zwnj;گردد.&nbsp;کمپانی نیو بالانس با آگاهی از مسائلی مانند دَم کردن پا و بو گرفتن کتانی، متریال درجه یکی را برای این&nbsp;<span dir="RTL" lang="AR-SA" style="font-size: 12pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;">کفش نیو بالانس زنانه مردانه</span>&nbsp;به کار برده&lrm;&zwnj; و با فناوری&zwnj;های به روز، تمام این مشکلات را برطرف کرده است.</span></p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">&nbsp;</p>\r\n<h4 style="margin: 9.5px 0px; font-family: BKoodak; line-height: 1.2; color: #34353e; text-rendering: optimizelegibility; font-size: 18px; -webkit-font-smoothing: antialiased; letter-spacing: -0.03em; text-align: right;">به زیبایی و راحتی سلام کنید</h4>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; line-height: 1.82;"><span lang="AR-SA"><span style="color: #727272; font-family: BKoodak;"><span style="font-size: 15px;">&nbsp;به کار بردن الیاف مصنوعی در این&nbsp;<span dir="RTL" lang="AR-SA" style="font-size: 12pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;"><strong>کفش کلاسیک</strong> پسرانه نیو بالانس</span>&nbsp;سبب آزادی عمل بیشتر پا به هنگام <span style="text-decoration: underline;"><strong><a title="کفش مناسب پیاده روی و بررسی ویژگی های آن" href="https://originalpal.com/blog-single/181/ ">پیاده&zwnj;روی</a></strong></span></span></span><span style="color: #727272; font-family: BKoodak;"><span style="font-size: 15px;">&nbsp;و <span style="text-decoration: underline;"><strong><a title="کفش مخصوص دویدن" href="https://originalpal.com/blog-single/205/ ">دویدن</a></strong></span></span></span><span style="color: #727272; font-family: BKoodak;"><span style="font-size: 15px;">&nbsp;در مسافت&zwnj;های طولانی شده و مانع از خستگی شما می&zwnj;شود. این کفش به محض پوشیدن با فرم پای شما هماهنگ می&zwnj;شود و به انگشتان شما فشاری وارد نمی&zwnj;کند.&nbsp;</span></span></span><span lang="AR-SA" style="color: #727272; font-family: BKoodak; font-size: 15px;">طبق سنت همیشگی نیو بالانس، در کناره، پشت و بر روی زبانه&zwnj;ی این کتونی از <strong>حرف</strong></span><strong><span dir="LTR" style="color: #727272; font-family: BKoodak; font-size: 15px;">&nbsp;(N)&nbsp;</span></strong><span lang="AR-SA" style="color: #727272; font-family: BKoodak; font-size: 15px;">که کلمه اول نام این برند می&zwnj;باشد، استفاده شده است. این عمل سبب می&zwnj;شود تا مخاطبان در <span style="text-decoration: underline;"><strong><a title="تشخیص کفش اصل و فیک" href="https://originalpal.com/blog-single/58/">تشخیص کفش اصل از کپی و های کپی (HighCopy)</a></strong></span></span><span dir="LTR" style="color: #727272; font-family: BKoodak; font-size: 15px;">&nbsp;</span><span lang="AR-SA" style="color: #727272; font-family: BKoodak; font-size: 15px;">دچار مشکل نشوند. البته ما&nbsp;<strong><span style="text-decoration: underline;"><span style="text-decoration-line: underline;"><a style="color: #000001; text-decoration: underline; transition: color 0.2s ease 0s; -webkit-tap-highlight-color: transparent; outline: 0px !important;" title="چگونه کفش اصل را از تقلبی تشخیص دهیم؟" href="https://originalpal.com/blog-single/187/">راهکارهای تشخیص اصالت کفش </a></span></span></strong>&nbsp;را برای شما د وبلاگ توضیح داده&zwnj;ایم.&nbsp;</span></p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; line-height: 1.82;"><span style="color: #727272; font-family: BKoodak;"><span style="font-size: 15px;">اهل ورزش و دویدن نیستید؟! پس شما را به مطالعه&zwnj;ی مقاله </span></span><span style="text-decoration: underline;"><strong><a title="دویدن سلامتی شما را تضمین خواهد کرد!" href="https://originalpal.com/blog-single/125/">کلید سلامت روح و جسم</a></strong></span><span style="color: #727272; font-family: BKoodak;"><span style="font-size: 15px;">&nbsp;دعوت می&zwnj;کنیم.</span></span></p>\r\n<p>&nbsp;</p>\r\n<p>&nbsp;</p>\r\n<ul>\r\n<li>\r\n<h3>لایه میانی</h3>\r\n</li>\r\n</ul>\r\n<p>&nbsp;</p>\r\n<h4><strong>تکنولوژی رولایت</strong></h4>\r\n<p>لایه میانی&nbsp;<span dir="RTL" lang="AR-SA" style="font-size: 10.5pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;">کتونی نیوبالانس زنانه مردانه کلاسیک</span>&nbsp;یکی از منعطف&zwnj;ترین نمونه&zwnj;های تولید شده توسط این کمپانی می&zwnj;باشد. دلیل این موضوع نیز بهره بردن از&nbsp;<strong>تکنولوژی رولایت (&reg; REVlite)</strong>&nbsp;در لایه میانی این کتانی اورجینال است. از طرفی استفاده از این تکنولوژی با توجه به ضربه&zwnj;گیری خوبی که دارد موجب کاهش فشار&zwnj;های وارده به پا در پیاده&zwnj;روی می&zwnj;شود. شما می&zwnj;توانید با خیالی آسوده به پیاده&zwnj;روی&zwnj;های طولانی مدت رفته و یا با این کتانی به انجام فعالیت&zwnj;های ورزشی بپردازید. هم&zwnj;چنین تکنولوژی رولایت موجب <strong>سبک و راحت بودن کفش</strong> می&zwnj;شود. به طوری که طبق نظرسنجی&zwnj;ها تعداد زیادی از خریداران کفش نیو بالانس ورزشی MRT580TH، از راحتی کتونی شگفت زده شده&zwnj;اند.</p>\r\n<p>&nbsp;</p>\r\n<h4 style="margin: 9.5px 0px; font-family: BKoodak; line-height: 1.2; color: #34353e; text-rendering: optimizelegibility; font-size: 18px; -webkit-font-smoothing: antialiased; letter-spacing: -0.03em; text-align: right;"><span style="text-align: justify;">قدم زدن با لذتی باورنکردنی</span></h4>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;"><span lang="AR-SA">لایه&zwnj;ی میانی<strong>&nbsp;</strong><strong><span dir="RTL" lang="AR-SA" style="font-size: 14pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-weight: normal;">کفش دخترانه پسرانه اسپرت </span><span dir="RTL" lang="AR-SA" style="font-size: 14pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;"><span style="text-decoration: underline;"><a title="کتونی رانینگ مناسب چه ویژگی هایی دارد؟" href="https://originalpal.com/blog-single/205/">مناسب رانینگ</a></span></span><span dir="RTL" lang="AR-SA" style="font-size: 14pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-weight: normal;"> نیوبالانس</span></strong>&nbsp;با داشتن خاصیت جذب&zwnj;کنندگی بالا میزان زیادی از فشار&zwnj;های وارده از سمت زمین را به خود جذب کرده و مانع از آسیب رسیدن به پای شما می&zwnj;شود. این لایه به قدری نرم و منعطف است که اکثر ضرباتی که سطوح مختلف به کفش وارد می&zwnj;کنند را جذب می&zwnj;کند تا از فشار اضافه به کف پاهای شما جلوگیری شود. این&nbsp;<strong><span dir="RTL" lang="AR-SA" style="font-size: 12pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;">کتونی طبی و راحت نیوبالانس </span><span style="font-size: 12pt; line-height: 107%; font-family: BKoodak, serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;">MRT580TH</span></strong>&nbsp;برای کسانی که از خار پاشنه رنج می&zwnj;برند هم ایده&zwnj;آل است. ما در <span style="text-decoration: underline;"><strong><a title="وبلاگ علمی تخصصی اورجینال" href="https://originalpal.com/blog/">وبلاگ اورجینال پَل</a></strong></span> مقاله مفصلی در ارتباط با<span style="text-decoration: underline;"><span style="text-decoration-line: underline;"><a style="color: #000001; text-decoration-line: none; transition: color 0.2s ease 0s; -webkit-tap-highlight-color: transparent; outline: 0px !important;" title="عارضه خار پاشنه و معرفی کفش&zwnj;های طبی مناسب" href="https://originalpal.com/blog-single/75/"><strong>&nbsp;خار پاشنه</strong></a></span></span>&nbsp;قرار داده&zwnj;ایم که می&zwnj;توانید با مطالعه&zwnj;ی آن&zwnj; اطلاعات خوبی را به دست بیاورید. فراموش نکنید که&nbsp;<span style="text-decoration-line: underline;"><span style="text-decoration: underline;"><strong><a style="color: #000001; transition: color 0.2s ease 0s; -webkit-tap-highlight-color: transparent; outline: 0px !important; text-decoration: underline;" title="راهنمای انتخاب کفش و کتانی مناسب" href="https://originalpal.com/blog-single/62/">انتخاب کفش مناسب</a></strong></span></span>&nbsp;هم در تسکین دردهای خار پاشنه بسیار موثر می&zwnj;باشد.</span></p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">&nbsp;</p>\r\n<h4 style="margin: 9.5px 0px; font-family: BKoodak; line-height: 1.2; color: #34353e; text-rendering: optimizelegibility; font-size: 18px; -webkit-font-smoothing: antialiased; letter-spacing: -0.03em; text-align: right;">نگران فرم پاهای خود نباشید</h4>\r\n<p style="margin: 9.5px 0px; font-family: BKoodak; line-height: 1.2; color: #34353e; text-rendering: optimizelegibility; font-size: 18px; -webkit-font-smoothing: antialiased; letter-spacing: -0.03em; text-align: right;">کمپانی نیو بالانس در طراحی لایه میانی این کفش دقت بالایی به کار برده تا برای انواع پاها مناسب باشد. کتونی&nbsp;ری اینجینیرد&nbsp;نیوبالانس با <span style="text-decoration: underline;"><strong><a title="اهمیت زیره طبی و ارگونومی کفش" href="https://originalpal.com/blog-single/201/">ارگونومی</a></strong></span> فوق&zwnj;العاده&zwnj;ی خود با فرم پنجه&zwnj; و پاشنه&zwnj;ی پای شما مطابق می&zwnj;شود و راحتی بی&zwnj;نظیری را به شما می&zwnj;دهد. ویژگی&zwnj;های ارگونومیک این کفش از آسیب رسیدن به پاها و کمر در درازمدت جلوگیری می&zwnj;کند. به همین دلیل کتانی نیو بالانس مخصوص پیاده روی و دویدن مدل&nbsp;<strong><span style="color: #444444; font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; text-align: start;">ری&zwnj;اینجینیرد MRT580TH،&nbsp;</span></strong>یک کفش ورزشی از برند نیو بالانس برای انجام حرکات&nbsp;حرفه&zwnj;ای&nbsp;و سنگین ورزشی می باشد.</p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">&nbsp;</p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">&nbsp;</p>\r\n<ul>\r\n<li>\r\n<h3>زیره کفش</h3>\r\n</li>\r\n</ul>\r\n<p>&nbsp;</p>\r\n<h4 style="margin: 9.5px 0px; font-family: BKoodak; line-height: 1.2; color: #34353e; text-rendering: optimizelegibility; font-size: 18px; -webkit-font-smoothing: antialiased; letter-spacing: -0.03em; text-align: justify;">بسیار نرم و راحت</h4>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;"><span lang="AR-SA">زیره&zwnj;ی بیرونی کتانی&nbsp;</span><span style="color: #444444; font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; text-align: start;">دخترانه پسرانه ری اینجینیرد MRT580TH</span>&nbsp;از جنس&nbsp;لاستیک فشرده&nbsp;می&zwnj;باشد. این لایه با داشتن شیارهایی در خود مانع از لیز خوردن شما می&zwnj;شود و با داشتن مقاومت زیاد در برابر فرسودگی به عمر کتانی می&zwnj;افزاید. <span style="text-decoration: underline;"><strong><a title="چرا در زیره کفش های اورجینال از لاستیک طبیعی استفاده می کنند؟" href="https://originalpal.com/blog-single/59/">لاستیک طبیعی</a></strong></span> که در این&nbsp;<span dir="RTL" lang="AR-SA" style="font-size: 12pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;">کتونی طبی مخصوص ورزش نیوبالانس</span>&nbsp;به کار رفته دارای خواص شگفت انگیزی است که ترکیب این خواص با لایه&zwnj;ی میانی کتونی باعث می&zwnj;شود که شما نرمی بسیار زیادی را در هنگام دویدن احساس کنید. این کتونی برای انجام فعالیت&zwnj;های ورزشی و پیاده روی ایده&zwnj;آل است.</p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">&nbsp;</p>\r\n<h4 style="margin: 9.5px 0px; font-family: BKoodak; line-height: 1.2; color: #34353e; text-rendering: optimizelegibility; font-size: 18px; -webkit-font-smoothing: antialiased; letter-spacing: -0.03em; text-align: right;"><span style="text-align: justify;">چسبندگی زیره&nbsp; ری اینجینیرد روی همه&zwnj;ی سطوح</span></h4>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">زیره&zwnj;ی این <strong>کفش نیو بالانس اسپرت</strong>&nbsp;چسبندگی بسیار زیادی دارد. این چسبندگی هنگام دویدن روی سطوح خیس و ناهموار به کمک شما می&zwnj;آید و هنگام تغییر دادن مسیر و یا تغییر جهت ناگهانی باعث ثبات شما در هنگام دویدن می&zwnj;شود. اگر از لیز خوردن هنگام دویدن در سالن ورزشی گلایه دارید نیو بالانس با ایجاد شیارهای خاص در زیره&zwnj;ی کتونی این مساله را به طور کامل حل کرده است تا شما نهایت لذت را از ورزش در کنار دوستانتان ببرید.</p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">&nbsp;</p>\r\n<h4 style="margin: 9.5px 0px; font-family: BKoodak; line-height: 1.2; color: #34353e; text-rendering: optimizelegibility; font-size: 18px; -webkit-font-smoothing: antialiased; letter-spacing: -0.03em; text-align: right;">عناصر ارگونومیک در زیره کتانی</h4>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">زیره و لایه&zwnj;ی میانی این&nbsp;کتانی&nbsp;به گونه ای طراحی و ساخته شده است که فشار را از روی کمر و ستون فقرات بر می&zwnj;دارد و باعث می&zwnj;شود تا ضربات وارده از سمت زمین به زانو و مچ پای شما آسیبی وارد نکند. این ویژگی باعث می&zwnj;شود که شما در پیاده روی های طولانی مدت و ورزش&zwnj;های سنگین دچار آسیب دیدگی در زانو و مچ نشوید. فراموش نکنید که داشتن یک کتانی مناسب برای جلوگیری از آسیب دیدن مفاصل و تاندون های بدن الزامی است، چرا که هیچ کسی دوست ندارد در حین <span style="text-decoration: underline;"><a title="ورزش و دویدن بهترین راه کاهش وزن برای خانم ها و اقایان" href="https://originalpal.com/blog-single/125/"><strong>ورزش</strong> </a></span>یا پیاده روی آسیب ببیند. لازم به به ذکر است که ما مطلب مفصلی در مورد&nbsp;<span style="text-decoration: underline;"><span style="text-decoration-line: underline;"><strong><a style="color: #000001; transition: color 0.2s ease 0s; -webkit-tap-highlight-color: transparent; outline: 0px !important; text-decoration: underline;" title="نکات طلایی برای انجام ورزش پیاده روی" href="https://originalpal.com/blog-single/114/">اصول پیاده روی و فواید آن</a></strong></span></span>&nbsp;را در وبلاگ مان قرار داده&zwnj;ایم که خواندن آن اطلاعات مفیدی را در اختیارتان قرار می&zwnj;دهد.</p>\r\n<p>&nbsp;</p>\r\n<p>&nbsp;</p>\r\n<ul>\r\n<li>\r\n<h3>جمع&zwnj;بندی</h3>\r\n</li>\r\n</ul>\r\n<p>&nbsp;</p>\r\n<p>کتونی نیو بالانس ری&zwnj;اینجینیرد زنانه مردانه اسپرت MRT580TH همان&zwnj;طور که از اسمش پیداس یکی از کفش&zwnj;هایی است که برند نیو بالانس اقدام به تولید مجدد آن کرده است. این کتونی که با تجربه نیوبالانس و <span style="text-decoration: underline;"><strong><a title="تکنولوژی کفش های اورجینال" href="https://originalpal.com/blog/technology-shoes/">فناوری&zwnj;های جدید دنیای کفش و کتانی</a></strong></span> آمیخته شده است. یکی از بهترین کتونی&zwnj;ها برای دویدن و پیاده&zwnj;روی شما می&zwnj;باشد. گفتن این نکته نیز خالی از لطف نیست که این <strong>کتونی حرفه ای</strong> یکی از راحت&zwnj;ترین کفش&zwnj;های تولید شده توسط این کمپانی می&zwnj;باشد.</p>\r\n<p><strong>شما می&zwnj;توانید با خرید اینترنتی این کفش از فرشگاه آنلاین&nbsp;اورجینال پَل ضمن اطمینان از اصل (اورجینال) بودن کفش، از خرید خود مطمئن بوده و لذت ببرید.</strong></p>\r\n<p>&nbsp;</p>\r\n<p>&nbsp;جهت <span style="text-decoration: underline;"><strong><a title="اخبار برندهای کتونی های اورجینال" href="https://originalpal.com/blog/brandsnews/">اطلاع از آخرین اخبار برندها</a></strong></span> و مشاهده سایر کتونی های اورجینال پَل به فروشگاه آنلاین اورجینال پل مراجعه نمایید.</p>\r\n<p>&nbsp;</p>\r\n<ul>\r\n<li>\r\n<h3>مشخصات اجمالی</h3>\r\n</li>\r\n</ul>\r\n<h3>کفش نیو بالانس ری&zwnj;اینجینیرد New Balance Re Engineered MRT580TH</h3>\r\n<ul>\r\n<li>\r\n<h5>نوع کتانی: پیاده&zwnj;روی / رانینگ / ورزش / روزمره</h5>\r\n</li>\r\n<li>\r\n<h5>آرت نامبر: MRT580TH</h5>\r\n</li>\r\n<li>\r\n<h5>متریال ساخت: الیاف مصنوعی / جیر / مش</h5>\r\n</li>\r\n<li>\r\n<h5>رنگ: سورمه ای/ سفید</h5>\r\n</li>\r\n<li>\r\n<h5>صاحب برند: نیو بالانس (NewBalance)</h5>\r\n</li>\r\n<li>\r\n<h5>نام کفش به فارسی: نیوبالانس ری&zwnj;اینجینیرد MRT580TH</h5>\r\n</li>\r\n<li>\r\n<h5>نام کفش به لاتین:&nbsp;New Balance ReEngineered MRT580TH</h5>\r\n</li>\r\n</ul>',
        state: "موجود در انبار",
        meta_keywords:
          "کتونی نیوبالانس,کفش نیوبالانس,کتانی برند نیوبالانس,خرید اینترنتی کتونی,فروشگاه کفش آنلاین,پرفروش ترین کفش نیو بالانس,کتانی زیره لاستیکی فوتبال و فوتسال,کفش سالنی با کیفیت,کفش والیبال قابل شست و شو,کتونی بسکتبال مقاوم,کتانی مخصوص پریدن",
        meta_description: null,
        brand_id: "4",
        sold: null,
        trend: "9972",
        category_id: "1",
        summary:
          "کتونی نیوبالانس کلاسیک مدل MRT580TH یک کفش لوکس پسرانه و دخترانه است. این مدل با الهام از کفش‌های قبلی محبوب این کمپانی طراحی شده است. این کفش نیو بالانس با ظاهری زیبا و جذاب، رنگ بندی کلاسیک و کیفیت بالای مواد به کار رفته در ساخت، یک کتانی ایده آل برای استفاده در پیاده روی روزمره و ورزش است.",
        site_main_picture: {
          t: "کفش نیوبالانس اصل",
          a: "کفش نیوبالانس",
          s: 1,
          u: "products/October2019/tkYPNhXcP9hFadrGCWQ1.jpg",
          p: 0,
        },
        meta_title:
          "امروزه کفش های اسپرت کلاسیک طرفداران زیادی بخصوص جوانان خوش استایل را جذب خود کرده است. از این رو کمپانی ابر قدرت نیو بالانس تصمیم به تولید یکی از بهترین کتونی های خود به نام ری اینجینیرد MRT580TH گرفته است. اگر شما هم جزء دسته شیک پوشان و اسپرت استایل هستید پیشنهاد می کنیم از این کتونی نیو بالانس استفاده کنید",
        title_page: "کفش نیو بالانس ورزشی &#8208 کتانی اسپرت مردانه و زنانه",
        onesize: "0",
        Enable: "1",
        collection_id: null,
        media: [
          {
            t: "",
            a: "",
            s: 1,
            u: "products/October2019/yxbxh4NgBvLQjAxjzQIn.jpg",
            p: 0,
            l: "",
          },
          {
            t: "",
            a: "",
            s: 1,
            u: "products/October2019/CU1odf4iTBlFCnZNa19Q.jpg",
            p: 0,
            l: "",
          },
          {
            t: "",
            a: "",
            s: 1,
            u: "products/October2019/Q4a1H0NlEJ1IJNq1S9vr.jpg",
            p: 0,
            l: "",
          },
          {
            t: "",
            a: "",
            s: 1,
            u: "products/October2019/FOR85lxBIU7HIpZn7qF2.jpg",
            p: 0,
            l: "",
          },
          {
            t: "",
            a: "",
            s: 1,
            u: "products/October2019/3F4EP4MRnkug51F6Kn9H.jpg",
            p: 0,
            l: "",
          },
          {
            t: "",
            a: "",
            s: 1,
            u: "products/October2019/t64wueOLPzFoXzhBxk7U.jpg",
            p: 0,
            l: "",
          },
          {
            t: "",
            a: "",
            s: 1,
            u: "products/October2019/jI3TxKQJiVabd4QkicGV.jpg",
            p: 0,
            l: "",
          },
          {
            t: "",
            a: "",
            s: 1,
            u: "products/October2019/uY9qs88X0TlLqlsEq56d.jpg",
            p: 0,
            l: "",
          },
          {
            t: "",
            a: "",
            s: 1,
            u: "products/October2019/HqToiQqRI1uZU3sIpbbt.jpg",
            p: 0,
            l: "",
          },
          {
            t: "",
            a: "",
            s: 1,
            u: "products/October2019/ZdvOtHWpwE85kUguXKPU.jpg",
            p: 0,
            l: "",
          },
          {
            t: "",
            a: "",
            s: 1,
            u: "/products/2023/January/UV8tw09xXX6UgbDzy4zE.jpg",
            p: 0,
          },
        ],
        discount_exp: "0000-00-00 00:00:00",
        updated_at: "2023-01-24T14:03:20.000000Z",
        created_at: "2018-10-29T07:58:00.000000Z",
        video: null,
        url: "/products/NewBalance/91/کفش-نیو-بالانس-ورزشی-ری-اینجینیرد-new-balance-re-engineered-mrt580th",
        brand: {
          id: 4,
          name: "NewBalance",
          created_at: "2018-09-06T04:01:06.000000Z",
          updated_at: "2020-04-30T02:08:54.000000Z",
          meta_title: "کتانی نیو بالانس ورزشی پسرانه و دخترانه | New Balance",
          meta_keywords:
            "کتونی نیوبالانس,کتانی نیوبالانس,کفش مخصوص ورزش و پیاده روی,کتانی حرفه ای,کتونی قابل شست و شو,کفش بندی,کتونی دخترانه و پسرانه,کتانی پارچه ای,کفش ورزشی مردانه و زنانه,برند,بسکتبال,والیبال,تنیس,باشگاه",
          meta_description:
            "خرید اینترنتی کتونی نیو بالانس 100% اورجینال New Balance | شروع قیمت‌ها از  1,000,000 تومان | تضمین اصالت کالا | امکان تعویض و بازگشت | ارسال رایگان | جدیدترین کفش برند نیو بالانس | کتونی حرفه ای اسپرت",
          title_page: "کفش نیو بالانس &#8208 خرید و بررسی قیمت کتونی اصل | اورجینال پَل",
          tagtext: null,
        },
      },
    },
    {
      id: 1023,
      product_id: "91",
      count: "2",
      size: "40",
      created_at: "2023-01-25T02:37:01.000000Z",
      updated_at: "2023-01-26T08:28:09.000000Z",
      price: "10000",
      discount_type: "percent",
      discount_amout: "10000",
      discount_start: "2023-02-01 06:06:30",
      discount_end: "2023-02-06 20:30:00",
      code: "ABCHDHFKWEKCI_",
      disc: "__US=7__ UK=6.1/2__ EUR=40__CM=250",
      priceAfterDiscount: "10000",
      product: {
        id: 91,
        code: "MRT580TH",
        name: "کفش نیو بالانس ورزشی ری‌ اینجینیرد New Balance Re Engineered MRT580TH",
        title: "کفش نیو بالانس ورزشی ری‌ اینجینیرد",
        slug: null,
        price: "3885000",
        discount_price: null,
        description:
          '<h2>کفش جدید نیو بالانس دخترانه پسرانه اسپرت مخصوص ورزش</h2>\r\n<p><span style="color: #727272; font-family: BKoodak; font-size: 15px; text-align: justify;">&nbsp;</span></p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; line-height: 1.82;"><span style="color: #000001; font-family: BKoodak;"><span style="font-size: 15px;"><span style="color: #727272;">کتونی</span><span style="color: #000001;">&nbsp;نیو بالانس ری&zwnj;اینجینیرد یک&nbsp;</span></span></span><span style="color: #727272; font-family: BKoodak;"><span style="font-size: 15px;"><strong><span dir="RTL" lang="AR-SA" style="font-size: 11.5pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;">کفش اسپرت زنانه و مردانه جدید</span></strong>&nbsp;از <span style="text-decoration: underline;"><strong><a title="تاریخچه کمپانی نیو بالانس" href="https://originalpal.com/blog-single/69/">کمپانی آمریکایی نیوبالانس</a></strong></span> است. این&nbsp;</span></span><span style="color: #727272; font-family: BKoodak;"><span style="font-size: 15px;"><strong><span dir="RTL" lang="AR-SA" style="font-size: 10.5pt; line-height: 107%; font-family: Arial, sans-serif; color: #444444; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-weight: normal;">کتانی روزمره نیوبالانس</span></strong>&nbsp;نمونه کاملی از ترکیب خلاقیت و فناوری در&nbsp;</span></span><span style="color: #727272; font-family: BKoodak; font-size: 15px;">تولیدات اخیر نیو بالانس (New Balance)</span><span style="color: #727272; font-family: BKoodak;"><span style="font-size: 15px;">&nbsp;است. نیوبالانس برای تولید این کفش سنگ تمام گذاشته است.</span></span></p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">برای بررسی این کتونی شیک با <span style="text-decoration: underline;"><strong><a title="فروشگاه اینترنتی کفش و کتونی اورجینال" href="https://originalpal.com/">اورجینال پل</a></strong></span> همراه باشید.</p>\r\n<p>&nbsp;</p>\r\n<h2>بررسی تخصصی کفش نیو بالانس ورزشی ری&zwnj;اینجینیرد MRT580TH</h2>\r\n<p>&nbsp;</p>\r\n<p>&nbsp;</p>\r\n<ul>\r\n<li>\r\n<h3>رویه کفش</h3>\r\n</li>\r\n</ul>\r\n<p>&nbsp;</p>\r\n<h4>خداحافظی با عرق کردن پا</h4>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; -webkit-tap-highlight-color: transparent; color: #727272; font-weight: 300; letter-spacing: normal; outline: 0px !important;"><span lang="AR-SA"><strong style="color: #727272; font-size: 15px; font-weight: 300; letter-spacing: normal;"><strong style="color: #444444; font-size: 14px;"><span dir="RTL" lang="AR-SA" style="font-size: 12pt; line-height: 107%; font-family: Arial, sans-serif; color: #727272; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-weight: normal;">کفش نیوبالانس راحتی پسرانه </span></strong><strong style="color: #444444; font-size: 14px;"><span style="font-size: 12pt; line-height: 107%; font-family: Verdana, sans-serif; color: #727272; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-weight: normal;">MRT580TH</span></strong>&nbsp;</strong></span><span lang="AR-SA" style="-webkit-tap-highlight-color: transparent; outline: 0px !important;">از ترکیب <strong>الیاف مصنوعی</strong>، <strong>جیر</strong> و <span style="text-decoration: underline;"><strong><a title="فناوری مش (Mesh) در رویه کفش های اورجینال" href="https://originalpal.com/blog-single/179/ ">مش (Mesh)</a></strong></span> ساخته شده است. استفاده از الیاف مصنوعی در&nbsp;<span style="text-decoration: underline;"><strong><a style="color: #000001; text-decoration: underline; transition: color 0.2s ease 0s; -webkit-tap-highlight-color: transparent; outline: 0px !important;" title="ساختار رویه کتانی اورجینال" href="https://originalpal.com/blog-single/10/">رویه&zwnj;ی کتونی</a></strong></span>&nbsp;انعطاف&zwnj;پذیری بالایی را به این <span style="text-decoration: underline;"><strong><a title="نحوه انتخاب کفش ورزشی مناسب" href="https://originalpal.com/blog-single/81/">کفش ورزشی</a></strong></span> اورجینال داده است که موجب کاهش فشار&zwnj;های وارده به پا می&zwnj;شود. مش موجود در رویه&zwnj;ی این کتونی سبب می&zwnj;شود تا پای شما در هوای گرم و یا پس از فعالیت&zwnj;های طولانی مدت دم نکند. با سیستم گردش هوای این کتانی، احساس خوشایندی به شما دست خواهد داد چرا که محیط داخلی کفش به محیطی خشک و خنک تبدیل می&zwnj;شود. تعریق پا در هنگام پیاده&zwnj;روی روزمره موجب مشکلاتی چون تاول زدن پا، خستگی و <span style="text-decoration: underline;"><strong><a title="راه های ساده از بیم بردن کفش و کتونی" href="https://originalpal.com/blog-single/80/">بو گرفتن کفش</a></strong></span> و پای شما می&zwnj;گردد.&nbsp;کمپانی نیو بالانس با آگاهی از مسائلی مانند دَم کردن پا و بو گرفتن کتانی، متریال درجه یکی را برای این&nbsp;<span dir="RTL" lang="AR-SA" style="font-size: 12pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;">کفش نیو بالانس زنانه مردانه</span>&nbsp;به کار برده&lrm;&zwnj; و با فناوری&zwnj;های به روز، تمام این مشکلات را برطرف کرده است.</span></p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">&nbsp;</p>\r\n<h4 style="margin: 9.5px 0px; font-family: BKoodak; line-height: 1.2; color: #34353e; text-rendering: optimizelegibility; font-size: 18px; -webkit-font-smoothing: antialiased; letter-spacing: -0.03em; text-align: right;">به زیبایی و راحتی سلام کنید</h4>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; line-height: 1.82;"><span lang="AR-SA"><span style="color: #727272; font-family: BKoodak;"><span style="font-size: 15px;">&nbsp;به کار بردن الیاف مصنوعی در این&nbsp;<span dir="RTL" lang="AR-SA" style="font-size: 12pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;"><strong>کفش کلاسیک</strong> پسرانه نیو بالانس</span>&nbsp;سبب آزادی عمل بیشتر پا به هنگام <span style="text-decoration: underline;"><strong><a title="کفش مناسب پیاده روی و بررسی ویژگی های آن" href="https://originalpal.com/blog-single/181/ ">پیاده&zwnj;روی</a></strong></span></span></span><span style="color: #727272; font-family: BKoodak;"><span style="font-size: 15px;">&nbsp;و <span style="text-decoration: underline;"><strong><a title="کفش مخصوص دویدن" href="https://originalpal.com/blog-single/205/ ">دویدن</a></strong></span></span></span><span style="color: #727272; font-family: BKoodak;"><span style="font-size: 15px;">&nbsp;در مسافت&zwnj;های طولانی شده و مانع از خستگی شما می&zwnj;شود. این کفش به محض پوشیدن با فرم پای شما هماهنگ می&zwnj;شود و به انگشتان شما فشاری وارد نمی&zwnj;کند.&nbsp;</span></span></span><span lang="AR-SA" style="color: #727272; font-family: BKoodak; font-size: 15px;">طبق سنت همیشگی نیو بالانس، در کناره، پشت و بر روی زبانه&zwnj;ی این کتونی از <strong>حرف</strong></span><strong><span dir="LTR" style="color: #727272; font-family: BKoodak; font-size: 15px;">&nbsp;(N)&nbsp;</span></strong><span lang="AR-SA" style="color: #727272; font-family: BKoodak; font-size: 15px;">که کلمه اول نام این برند می&zwnj;باشد، استفاده شده است. این عمل سبب می&zwnj;شود تا مخاطبان در <span style="text-decoration: underline;"><strong><a title="تشخیص کفش اصل و فیک" href="https://originalpal.com/blog-single/58/">تشخیص کفش اصل از کپی و های کپی (HighCopy)</a></strong></span></span><span dir="LTR" style="color: #727272; font-family: BKoodak; font-size: 15px;">&nbsp;</span><span lang="AR-SA" style="color: #727272; font-family: BKoodak; font-size: 15px;">دچار مشکل نشوند. البته ما&nbsp;<strong><span style="text-decoration: underline;"><span style="text-decoration-line: underline;"><a style="color: #000001; text-decoration: underline; transition: color 0.2s ease 0s; -webkit-tap-highlight-color: transparent; outline: 0px !important;" title="چگونه کفش اصل را از تقلبی تشخیص دهیم؟" href="https://originalpal.com/blog-single/187/">راهکارهای تشخیص اصالت کفش </a></span></span></strong>&nbsp;را برای شما د وبلاگ توضیح داده&zwnj;ایم.&nbsp;</span></p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; line-height: 1.82;"><span style="color: #727272; font-family: BKoodak;"><span style="font-size: 15px;">اهل ورزش و دویدن نیستید؟! پس شما را به مطالعه&zwnj;ی مقاله </span></span><span style="text-decoration: underline;"><strong><a title="دویدن سلامتی شما را تضمین خواهد کرد!" href="https://originalpal.com/blog-single/125/">کلید سلامت روح و جسم</a></strong></span><span style="color: #727272; font-family: BKoodak;"><span style="font-size: 15px;">&nbsp;دعوت می&zwnj;کنیم.</span></span></p>\r\n<p>&nbsp;</p>\r\n<p>&nbsp;</p>\r\n<ul>\r\n<li>\r\n<h3>لایه میانی</h3>\r\n</li>\r\n</ul>\r\n<p>&nbsp;</p>\r\n<h4><strong>تکنولوژی رولایت</strong></h4>\r\n<p>لایه میانی&nbsp;<span dir="RTL" lang="AR-SA" style="font-size: 10.5pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;">کتونی نیوبالانس زنانه مردانه کلاسیک</span>&nbsp;یکی از منعطف&zwnj;ترین نمونه&zwnj;های تولید شده توسط این کمپانی می&zwnj;باشد. دلیل این موضوع نیز بهره بردن از&nbsp;<strong>تکنولوژی رولایت (&reg; REVlite)</strong>&nbsp;در لایه میانی این کتانی اورجینال است. از طرفی استفاده از این تکنولوژی با توجه به ضربه&zwnj;گیری خوبی که دارد موجب کاهش فشار&zwnj;های وارده به پا در پیاده&zwnj;روی می&zwnj;شود. شما می&zwnj;توانید با خیالی آسوده به پیاده&zwnj;روی&zwnj;های طولانی مدت رفته و یا با این کتانی به انجام فعالیت&zwnj;های ورزشی بپردازید. هم&zwnj;چنین تکنولوژی رولایت موجب <strong>سبک و راحت بودن کفش</strong> می&zwnj;شود. به طوری که طبق نظرسنجی&zwnj;ها تعداد زیادی از خریداران کفش نیو بالانس ورزشی MRT580TH، از راحتی کتونی شگفت زده شده&zwnj;اند.</p>\r\n<p>&nbsp;</p>\r\n<h4 style="margin: 9.5px 0px; font-family: BKoodak; line-height: 1.2; color: #34353e; text-rendering: optimizelegibility; font-size: 18px; -webkit-font-smoothing: antialiased; letter-spacing: -0.03em; text-align: right;"><span style="text-align: justify;">قدم زدن با لذتی باورنکردنی</span></h4>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;"><span lang="AR-SA">لایه&zwnj;ی میانی<strong>&nbsp;</strong><strong><span dir="RTL" lang="AR-SA" style="font-size: 14pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-weight: normal;">کفش دخترانه پسرانه اسپرت </span><span dir="RTL" lang="AR-SA" style="font-size: 14pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;"><span style="text-decoration: underline;"><a title="کتونی رانینگ مناسب چه ویژگی هایی دارد؟" href="https://originalpal.com/blog-single/205/">مناسب رانینگ</a></span></span><span dir="RTL" lang="AR-SA" style="font-size: 14pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-weight: normal;"> نیوبالانس</span></strong>&nbsp;با داشتن خاصیت جذب&zwnj;کنندگی بالا میزان زیادی از فشار&zwnj;های وارده از سمت زمین را به خود جذب کرده و مانع از آسیب رسیدن به پای شما می&zwnj;شود. این لایه به قدری نرم و منعطف است که اکثر ضرباتی که سطوح مختلف به کفش وارد می&zwnj;کنند را جذب می&zwnj;کند تا از فشار اضافه به کف پاهای شما جلوگیری شود. این&nbsp;<strong><span dir="RTL" lang="AR-SA" style="font-size: 12pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;">کتونی طبی و راحت نیوبالانس </span><span style="font-size: 12pt; line-height: 107%; font-family: BKoodak, serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;">MRT580TH</span></strong>&nbsp;برای کسانی که از خار پاشنه رنج می&zwnj;برند هم ایده&zwnj;آل است. ما در <span style="text-decoration: underline;"><strong><a title="وبلاگ علمی تخصصی اورجینال" href="https://originalpal.com/blog/">وبلاگ اورجینال پَل</a></strong></span> مقاله مفصلی در ارتباط با<span style="text-decoration: underline;"><span style="text-decoration-line: underline;"><a style="color: #000001; text-decoration-line: none; transition: color 0.2s ease 0s; -webkit-tap-highlight-color: transparent; outline: 0px !important;" title="عارضه خار پاشنه و معرفی کفش&zwnj;های طبی مناسب" href="https://originalpal.com/blog-single/75/"><strong>&nbsp;خار پاشنه</strong></a></span></span>&nbsp;قرار داده&zwnj;ایم که می&zwnj;توانید با مطالعه&zwnj;ی آن&zwnj; اطلاعات خوبی را به دست بیاورید. فراموش نکنید که&nbsp;<span style="text-decoration-line: underline;"><span style="text-decoration: underline;"><strong><a style="color: #000001; transition: color 0.2s ease 0s; -webkit-tap-highlight-color: transparent; outline: 0px !important; text-decoration: underline;" title="راهنمای انتخاب کفش و کتانی مناسب" href="https://originalpal.com/blog-single/62/">انتخاب کفش مناسب</a></strong></span></span>&nbsp;هم در تسکین دردهای خار پاشنه بسیار موثر می&zwnj;باشد.</span></p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">&nbsp;</p>\r\n<h4 style="margin: 9.5px 0px; font-family: BKoodak; line-height: 1.2; color: #34353e; text-rendering: optimizelegibility; font-size: 18px; -webkit-font-smoothing: antialiased; letter-spacing: -0.03em; text-align: right;">نگران فرم پاهای خود نباشید</h4>\r\n<p style="margin: 9.5px 0px; font-family: BKoodak; line-height: 1.2; color: #34353e; text-rendering: optimizelegibility; font-size: 18px; -webkit-font-smoothing: antialiased; letter-spacing: -0.03em; text-align: right;">کمپانی نیو بالانس در طراحی لایه میانی این کفش دقت بالایی به کار برده تا برای انواع پاها مناسب باشد. کتونی&nbsp;ری اینجینیرد&nbsp;نیوبالانس با <span style="text-decoration: underline;"><strong><a title="اهمیت زیره طبی و ارگونومی کفش" href="https://originalpal.com/blog-single/201/">ارگونومی</a></strong></span> فوق&zwnj;العاده&zwnj;ی خود با فرم پنجه&zwnj; و پاشنه&zwnj;ی پای شما مطابق می&zwnj;شود و راحتی بی&zwnj;نظیری را به شما می&zwnj;دهد. ویژگی&zwnj;های ارگونومیک این کفش از آسیب رسیدن به پاها و کمر در درازمدت جلوگیری می&zwnj;کند. به همین دلیل کتانی نیو بالانس مخصوص پیاده روی و دویدن مدل&nbsp;<strong><span style="color: #444444; font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; text-align: start;">ری&zwnj;اینجینیرد MRT580TH،&nbsp;</span></strong>یک کفش ورزشی از برند نیو بالانس برای انجام حرکات&nbsp;حرفه&zwnj;ای&nbsp;و سنگین ورزشی می باشد.</p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">&nbsp;</p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">&nbsp;</p>\r\n<ul>\r\n<li>\r\n<h3>زیره کفش</h3>\r\n</li>\r\n</ul>\r\n<p>&nbsp;</p>\r\n<h4 style="margin: 9.5px 0px; font-family: BKoodak; line-height: 1.2; color: #34353e; text-rendering: optimizelegibility; font-size: 18px; -webkit-font-smoothing: antialiased; letter-spacing: -0.03em; text-align: justify;">بسیار نرم و راحت</h4>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;"><span lang="AR-SA">زیره&zwnj;ی بیرونی کتانی&nbsp;</span><span style="color: #444444; font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; text-align: start;">دخترانه پسرانه ری اینجینیرد MRT580TH</span>&nbsp;از جنس&nbsp;لاستیک فشرده&nbsp;می&zwnj;باشد. این لایه با داشتن شیارهایی در خود مانع از لیز خوردن شما می&zwnj;شود و با داشتن مقاومت زیاد در برابر فرسودگی به عمر کتانی می&zwnj;افزاید. <span style="text-decoration: underline;"><strong><a title="چرا در زیره کفش های اورجینال از لاستیک طبیعی استفاده می کنند؟" href="https://originalpal.com/blog-single/59/">لاستیک طبیعی</a></strong></span> که در این&nbsp;<span dir="RTL" lang="AR-SA" style="font-size: 12pt; line-height: 107%; font-family: Arial, sans-serif; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;">کتونی طبی مخصوص ورزش نیوبالانس</span>&nbsp;به کار رفته دارای خواص شگفت انگیزی است که ترکیب این خواص با لایه&zwnj;ی میانی کتونی باعث می&zwnj;شود که شما نرمی بسیار زیادی را در هنگام دویدن احساس کنید. این کتونی برای انجام فعالیت&zwnj;های ورزشی و پیاده روی ایده&zwnj;آل است.</p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">&nbsp;</p>\r\n<h4 style="margin: 9.5px 0px; font-family: BKoodak; line-height: 1.2; color: #34353e; text-rendering: optimizelegibility; font-size: 18px; -webkit-font-smoothing: antialiased; letter-spacing: -0.03em; text-align: right;"><span style="text-align: justify;">چسبندگی زیره&nbsp; ری اینجینیرد روی همه&zwnj;ی سطوح</span></h4>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">زیره&zwnj;ی این <strong>کفش نیو بالانس اسپرت</strong>&nbsp;چسبندگی بسیار زیادی دارد. این چسبندگی هنگام دویدن روی سطوح خیس و ناهموار به کمک شما می&zwnj;آید و هنگام تغییر دادن مسیر و یا تغییر جهت ناگهانی باعث ثبات شما در هنگام دویدن می&zwnj;شود. اگر از لیز خوردن هنگام دویدن در سالن ورزشی گلایه دارید نیو بالانس با ایجاد شیارهای خاص در زیره&zwnj;ی کتونی این مساله را به طور کامل حل کرده است تا شما نهایت لذت را از ورزش در کنار دوستانتان ببرید.</p>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">&nbsp;</p>\r\n<h4 style="margin: 9.5px 0px; font-family: BKoodak; line-height: 1.2; color: #34353e; text-rendering: optimizelegibility; font-size: 18px; -webkit-font-smoothing: antialiased; letter-spacing: -0.03em; text-align: right;">عناصر ارگونومیک در زیره کتانی</h4>\r\n<p style="margin: 0px 0px 9.5px; text-align: justify; font-size: 15px; line-height: 1.82; font-family: BKoodak; color: #727272;">زیره و لایه&zwnj;ی میانی این&nbsp;کتانی&nbsp;به گونه ای طراحی و ساخته شده است که فشار را از روی کمر و ستون فقرات بر می&zwnj;دارد و باعث می&zwnj;شود تا ضربات وارده از سمت زمین به زانو و مچ پای شما آسیبی وارد نکند. این ویژگی باعث می&zwnj;شود که شما در پیاده روی های طولانی مدت و ورزش&zwnj;های سنگین دچار آسیب دیدگی در زانو و مچ نشوید. فراموش نکنید که داشتن یک کتانی مناسب برای جلوگیری از آسیب دیدن مفاصل و تاندون های بدن الزامی است، چرا که هیچ کسی دوست ندارد در حین <span style="text-decoration: underline;"><a title="ورزش و دویدن بهترین راه کاهش وزن برای خانم ها و اقایان" href="https://originalpal.com/blog-single/125/"><strong>ورزش</strong> </a></span>یا پیاده روی آسیب ببیند. لازم به به ذکر است که ما مطلب مفصلی در مورد&nbsp;<span style="text-decoration: underline;"><span style="text-decoration-line: underline;"><strong><a style="color: #000001; transition: color 0.2s ease 0s; -webkit-tap-highlight-color: transparent; outline: 0px !important; text-decoration: underline;" title="نکات طلایی برای انجام ورزش پیاده روی" href="https://originalpal.com/blog-single/114/">اصول پیاده روی و فواید آن</a></strong></span></span>&nbsp;را در وبلاگ مان قرار داده&zwnj;ایم که خواندن آن اطلاعات مفیدی را در اختیارتان قرار می&zwnj;دهد.</p>\r\n<p>&nbsp;</p>\r\n<p>&nbsp;</p>\r\n<ul>\r\n<li>\r\n<h3>جمع&zwnj;بندی</h3>\r\n</li>\r\n</ul>\r\n<p>&nbsp;</p>\r\n<p>کتونی نیو بالانس ری&zwnj;اینجینیرد زنانه مردانه اسپرت MRT580TH همان&zwnj;طور که از اسمش پیداس یکی از کفش&zwnj;هایی است که برند نیو بالانس اقدام به تولید مجدد آن کرده است. این کتونی که با تجربه نیوبالانس و <span style="text-decoration: underline;"><strong><a title="تکنولوژی کفش های اورجینال" href="https://originalpal.com/blog/technology-shoes/">فناوری&zwnj;های جدید دنیای کفش و کتانی</a></strong></span> آمیخته شده است. یکی از بهترین کتونی&zwnj;ها برای دویدن و پیاده&zwnj;روی شما می&zwnj;باشد. گفتن این نکته نیز خالی از لطف نیست که این <strong>کتونی حرفه ای</strong> یکی از راحت&zwnj;ترین کفش&zwnj;های تولید شده توسط این کمپانی می&zwnj;باشد.</p>\r\n<p><strong>شما می&zwnj;توانید با خرید اینترنتی این کفش از فرشگاه آنلاین&nbsp;اورجینال پَل ضمن اطمینان از اصل (اورجینال) بودن کفش، از خرید خود مطمئن بوده و لذت ببرید.</strong></p>\r\n<p>&nbsp;</p>\r\n<p>&nbsp;جهت <span style="text-decoration: underline;"><strong><a title="اخبار برندهای کتونی های اورجینال" href="https://originalpal.com/blog/brandsnews/">اطلاع از آخرین اخبار برندها</a></strong></span> و مشاهده سایر کتونی های اورجینال پَل به فروشگاه آنلاین اورجینال پل مراجعه نمایید.</p>\r\n<p>&nbsp;</p>\r\n<ul>\r\n<li>\r\n<h3>مشخصات اجمالی</h3>\r\n</li>\r\n</ul>\r\n<h3>کفش نیو بالانس ری&zwnj;اینجینیرد New Balance Re Engineered MRT580TH</h3>\r\n<ul>\r\n<li>\r\n<h5>نوع کتانی: پیاده&zwnj;روی / رانینگ / ورزش / روزمره</h5>\r\n</li>\r\n<li>\r\n<h5>آرت نامبر: MRT580TH</h5>\r\n</li>\r\n<li>\r\n<h5>متریال ساخت: الیاف مصنوعی / جیر / مش</h5>\r\n</li>\r\n<li>\r\n<h5>رنگ: سورمه ای/ سفید</h5>\r\n</li>\r\n<li>\r\n<h5>صاحب برند: نیو بالانس (NewBalance)</h5>\r\n</li>\r\n<li>\r\n<h5>نام کفش به فارسی: نیوبالانس ری&zwnj;اینجینیرد MRT580TH</h5>\r\n</li>\r\n<li>\r\n<h5>نام کفش به لاتین:&nbsp;New Balance ReEngineered MRT580TH</h5>\r\n</li>\r\n</ul>',
        state: "موجود در انبار",
        meta_keywords:
          "کتونی نیوبالانس,کفش نیوبالانس,کتانی برند نیوبالانس,خرید اینترنتی کتونی,فروشگاه کفش آنلاین,پرفروش ترین کفش نیو بالانس,کتانی زیره لاستیکی فوتبال و فوتسال,کفش سالنی با کیفیت,کفش والیبال قابل شست و شو,کتونی بسکتبال مقاوم,کتانی مخصوص پریدن",
        meta_description: null,
        brand_id: "4",
        sold: null,
        trend: "9972",
        category_id: "1",
        summary:
          "کتونی نیوبالانس کلاسیک مدل MRT580TH یک کفش لوکس پسرانه و دخترانه است. این مدل با الهام از کفش‌های قبلی محبوب این کمپانی طراحی شده است. این کفش نیو بالانس با ظاهری زیبا و جذاب، رنگ بندی کلاسیک و کیفیت بالای مواد به کار رفته در ساخت، یک کتانی ایده آل برای استفاده در پیاده روی روزمره و ورزش است.",
        site_main_picture: {
          t: "کفش نیوبالانس اصل",
          a: "کفش نیوبالانس",
          s: 1,
          u: "products/October2019/tkYPNhXcP9hFadrGCWQ1.jpg",
          p: 0,
        },
        meta_title:
          "امروزه کفش های اسپرت کلاسیک طرفداران زیادی بخصوص جوانان خوش استایل را جذب خود کرده است. از این رو کمپانی ابر قدرت نیو بالانس تصمیم به تولید یکی از بهترین کتونی های خود به نام ری اینجینیرد MRT580TH گرفته است. اگر شما هم جزء دسته شیک پوشان و اسپرت استایل هستید پیشنهاد می کنیم از این کتونی نیو بالانس استفاده کنید",
        title_page: "کفش نیو بالانس ورزشی &#8208 کتانی اسپرت مردانه و زنانه",
        onesize: "0",
        Enable: "1",
        collection_id: null,
        media: [
          {
            t: "",
            a: "",
            s: 1,
            u: "products/October2019/yxbxh4NgBvLQjAxjzQIn.jpg",
            p: 0,
            l: "",
          },
          {
            t: "",
            a: "",
            s: 1,
            u: "products/October2019/CU1odf4iTBlFCnZNa19Q.jpg",
            p: 0,
            l: "",
          },
          {
            t: "",
            a: "",
            s: 1,
            u: "products/October2019/Q4a1H0NlEJ1IJNq1S9vr.jpg",
            p: 0,
            l: "",
          },
          {
            t: "",
            a: "",
            s: 1,
            u: "products/October2019/FOR85lxBIU7HIpZn7qF2.jpg",
            p: 0,
            l: "",
          },
          {
            t: "",
            a: "",
            s: 1,
            u: "products/October2019/3F4EP4MRnkug51F6Kn9H.jpg",
            p: 0,
            l: "",
          },
          {
            t: "",
            a: "",
            s: 1,
            u: "products/October2019/t64wueOLPzFoXzhBxk7U.jpg",
            p: 0,
            l: "",
          },
          {
            t: "",
            a: "",
            s: 1,
            u: "products/October2019/jI3TxKQJiVabd4QkicGV.jpg",
            p: 0,
            l: "",
          },
          {
            t: "",
            a: "",
            s: 1,
            u: "products/October2019/uY9qs88X0TlLqlsEq56d.jpg",
            p: 0,
            l: "",
          },
          {
            t: "",
            a: "",
            s: 1,
            u: "products/October2019/HqToiQqRI1uZU3sIpbbt.jpg",
            p: 0,
            l: "",
          },
          {
            t: "",
            a: "",
            s: 1,
            u: "products/October2019/ZdvOtHWpwE85kUguXKPU.jpg",
            p: 0,
            l: "",
          },
          {
            t: "",
            a: "",
            s: 1,
            u: "/products/2023/January/UV8tw09xXX6UgbDzy4zE.jpg",
            p: 0,
          },
        ],
        discount_exp: "0000-00-00 00:00:00",
        updated_at: "2023-01-24T14:03:20.000000Z",
        created_at: "2018-10-29T07:58:00.000000Z",
        video: null,
        url: "/products/NewBalance/91/کفش-نیو-بالانس-ورزشی-ری-اینجینیرد-new-balance-re-engineered-mrt580th",
        brand: {
          id: 4,
          name: "NewBalance",
          created_at: "2018-09-06T04:01:06.000000Z",
          updated_at: "2020-04-30T02:08:54.000000Z",
          meta_title: "کتانی نیو بالانس ورزشی پسرانه و دخترانه | New Balance",
          meta_keywords:
            "کتونی نیوبالانس,کتانی نیوبالانس,کفش مخصوص ورزش و پیاده روی,کتانی حرفه ای,کتونی قابل شست و شو,کفش بندی,کتونی دخترانه و پسرانه,کتانی پارچه ای,کفش ورزشی مردانه و زنانه,برند,بسکتبال,والیبال,تنیس,باشگاه",
          meta_description:
            "خرید اینترنتی کتونی نیو بالانس 100% اورجینال New Balance | شروع قیمت‌ها از  1,000,000 تومان | تضمین اصالت کالا | امکان تعویض و بازگشت | ارسال رایگان | جدیدترین کفش برند نیو بالانس | کتونی حرفه ای اسپرت",
          title_page: "کفش نیو بالانس &#8208 خرید و بررسی قیمت کتونی اصل | اورجینال پَل",
          tagtext: null,
        },
      },
    },
  ],
  brand: {
    id: 4,
    name: "NewBalance",
  },
  collection: null,
  tags: [],
  comments: [],
};
