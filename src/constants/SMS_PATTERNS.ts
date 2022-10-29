export const SMS_PATTERNS = [
  {
    title: "ثبت سفارش",
    code: "gllkm10xgz",
    text: `
      name عزیز سفارش شما با شماره فاکتور invoice ثبت شد 

      آیتم های سفارش : item 

      مبلغ سفارش : price 

      اورجینال پل `,
    tokens: [
      "name",
      "invoice",
      "item",
      "price"
    ]
  },
  {
    title: "پردازش سفارش",
    code: "fj1chv12q6",
    text: `
      name عزیز سفارش شما با شماره فاکتور invoice در حال پردازش از انبار و بسته بندی می باشد. 

      ارتباط با بخش پشتیبانی :09120387302 

      اورجینال پل `,
    tokens: [
      "name",
      "invoice",
    ]
  },
  {
    title: "کد رهگیری",
    code: "svsaoscud1",
    text: `
      name عزیز سفارش شماره invoice  هم اکنون جهت ارسال به آدرس شما، به شرکت پست تحویل داده شد. 

      کد رهگیری مرسوله پستی:post-code 

       

      آدرس اینستاگرام اورجینال پل  

      https://instagram.com/original.pal 

      فالو کنید، منشن کنید، کامنت بزارید، کفش خریداری شده خود را در پا کنید و عکس ارسال کنید تا تخفیف ویژه دریافت کنید. `,
    tokens: [
      "name",
      "invoice",
      "post-code",
    ]
  },
  {
    title: "موجود شدن محصول",
    code: "pn7s9cyopi",
    text: `
      name عزیز سلام، 

      محصول: product  

       که پیش‌تر در اورجینال پَل به دنبال آن می‌گشتید، هم‌اکنون به تعداد بسیار محدودی موجود شده است. میتوانید از طریق لینک زیر نسبت به خرید آن اقدام فرمایید. 

      link 

      پشتیبانی اورجینال پل :09120387302 

      - توضیحات پترن: https://originalpal.com 

      برای قسمت "موجود شد به من اطلاع بده" سایت می باشد که در صورتی که محصول نا موجود ، موجود شود این پیام برای تمام کسانی که درخواست کرده بودند ارسال می شود . تعداد آن نیز بسته به تعداد کاربرانی دارد که دنبال کننده محصول هستند
  `,
    tokens: [
      "name",
      "product",
      "link",
    ]
  },
  {
    title: "موجود شدن محصول 2",
    code: "ol0qrp27bl",
    text: `
      name عزیز محصول product در تعداد بسیار محدودی موجود شده است . در صورت تمایل از لینک زیر خرید نمایید. 

      link 

      پشتیبانی اورجینال پل :09120387302
  `,
    tokens: [
      "name",
      "product",
      "link",
    ]
  },
  {
    title: "ثبت سفارش کاربر",
    code: "ls2dtperc3",
    text: `
      کاربر id به نام name ثبت سفارش کرد 

       

       

      شماره فاکتور : invoice 

       

      آیتم های سفارش : item 

      مبلغ سفارش : price 

       

      موبایل:mobile 

       

      آدرس:address 

       

      اورجینال پل 
    `,
    tokens: [
      "name",
      "invoice",
      "item",
      "price",
      "mobile",
      "address"
    ]
  },
  {
    title: "رمز عبور جدید",
    code: "epbfjhq7m0",
    text: `
      رمز عبور جدید شما در اورجینال پل  code  می باشد. 
    `,
    tokens: [
      "code"
    ]
  },
  {
    title: "کد تایید",
    code: "mx04viy0n4",
    text: `
      خوش امدید : name کد تایید شما verification-code 
    `,
    tokens: [
      "name",
      "verification-code"
    ]
  },
  // {
  //   title: "",
  //   code: "",
  //   text: `
  //   `,
  //   tokens: [
  //   ]
  // }
]
