import { Product } from '../types';

export const toPersianDigits = (num: number | string): string => {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num
    .toString()
    .replace(/\d/g, (x) => farsiDigits[parseInt(x, 10)]);
};

export const formatTomans = (amount: number): string => {
  const formattedWithCommas = amount.toLocaleString('en-US');
  return `${toPersianDigits(formattedWithCommas)} تومان`;
};

export const defaultColors = [
  { name: 'کرم نود', hex: '#E5D7CA' },
  { name: 'زغالی عمیق', hex: '#2A2421' },
  { name: 'موکا کاراملی', hex: '#8E7969' },
  { name: 'شیری ابریشمی', hex: '#FAF6F0', border: true },
];

export const PRODUCTS: Product[] = [
  {
    id: 'vela-804',
    code: 'NO. 804',
    title: 'کت لینن کمل مزونی',
    category: 'blazer',
    categoryLabel: 'کت و بلیزر تک',
    price: 3850000,
    priceFormatted: '۳,۸۵۰,۰۰۰ تومان',
    badge: 'تعداد بسیار محدود (تنها ۲ عدد)',
    badgeType: 'limited',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDh0rDXV8JtqZbq2R5a-UKnj1nHBM_W8k9K7WnrSqNalJ-XBTk-3fKgIlyneSFtkdwhTo77xHbH78REzFUL2QKt_KReGiaTPGNmNPPnAkH1CdsnmBTxw5EuZ_ewBIlYjurJYq16VnkEZ-dsXmZgLz_mXqstEEjNqqGgAFE5JdkPlu4azhrYW0tYUxQgzXFTdAV24a-ZHTqVAFOQ5vHG6nRdqCerfb20YyQn06EOMxtbRBSnb1sXvy9fFQ',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDh0rDXV8JtqZbq2R5a-UKnj1nHBM_W8k9K7WnrSqNalJ-XBTk-3fKgIlyneSFtkdwhTo77xHbH78REzFUL2QKt_KReGiaTPGNmNPPnAkH1CdsnmBTxw5EuZ_ewBIlYjurJYq16VnkEZ-dsXmZgLz_mXqstEEjNqqGgAFE5JdkPlu4azhrYW0tYUxQgzXFTdAV24a-ZHTqVAFOQ5vHG6nRdqCerfb20YyQn06EOMxtbRBSnb1sXvy9fFQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCc_LgGd0L4nlU39Gqm1ZCEFti3UW8faA5F9pwTQPimg6Mh6xRoPQrLFEviVoKwMEY6a3K9WyBJSyuQrnT0uu32djM0q3vSIz3Rx8bgqzvxkTxKaE3auWHshPS5nAvU0znWTN61pE0LAQwO8xbCy_OcRX-noFrGDp-d4kATLf9th0MGp-IvaBIy4qZMJTW8BSeyFX1aBIRhU6UbsYfZXZRls_MCPkwGwqng96vyd3MVItGLKri52q5x_g'
    ],
    fabric: 'لینن ارگانیک ایتالیا',
    origin: 'کارگاه بافندگی توسکانی • آتلیه تهران',
    description: 'برش دقیق دو‌طرف‌دکمه (Double-Breasted)، آستر دوزی تمام ابریشم طبیعی. خط سرشانه کلاسیک پاریسی همراه با جیب‌های فیلتابی خوش‌فرم.',
    features: [
      'الیاف ۱۰۰٪ طبیعی با تنفس‌پذیری بالا',
      'دکمه‌های شاخ طبیعی حکاکی‌شده دستی',
      'لایی‌کشی سنتی اتویی بدون چسب شیمیایی',
      'ارسال در کاور اختصاصی مزونی و چوب‌لباسی چوبی'
    ],
    sizes: ['۳۶', '۳۸', '۴۰'],
    colors: [
      { name: 'کمل برنز', hex: '#C29A6B' },
      { name: 'کرم نود', hex: '#E5D7CA' },
      { name: 'زغالی عمیق', hex: '#2A2421' }
    ]
  },
  {
    id: 'vela-512',
    code: 'NO. 512',
    title: 'شومیز ابریشم کرم عاجی',
    category: 'silk',
    categoryLabel: 'شومیز و بلوز فاخر',
    price: 2650000,
    priceFormatted: '۲,۶۵۰,۰۰۰ تومان',
    badge: 'کالکشن جدید ✦',
    badgeType: 'new',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARmcYt1pzRz5ZL7y_45w4c1HVJYbMh9RzJAYiYWwEi2FsYZohX6gMBKF5nfRVEYGgMXCbQ7fUjjwmhbHXVAMoQcMz_7HStuzD7WDKVDq5XQWGwCDRCStwgb8oxD-TzGmYvgxxFZN3H7mEQkgejIWP5fwfZGudVD-iJbj24B1EY3wZpi5j8wWy2Oa6kTizme9iWSN0TOuk3xVvt-52-c2dyYqC1m3PpyLtM93C22njzdKzM-vVOAkDbdg',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuARmcYt1pzRz5ZL7y_45w4c1HVJYbMh9RzJAYiYWwEi2FsYZohX6gMBKF5nfRVEYGgMXCbQ7fUjjwmhbHXVAMoQcMz_7HStuzD7WDKVDq5XQWGwCDRCStwgb8oxD-TzGmYvgxxFZN3H7mEQkgejIWP5fwfZGudVD-iJbj24B1EY3wZpi5j8wWy2Oa6kTizme9iWSN0TOuk3xVvt-52-c2dyYqC1m3PpyLtM93C22njzdKzM-vVOAkDbdg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCc_LgGd0L4nlU39Gqm1ZCEFti3UW8faA5F9pwTQPimg6Mh6xRoPQrLFEviVoKwMEY6a3K9WyBJSyuQrnT0uu32djM0q3vSIz3Rx8bgqzvxkTxKaE3auWHshPS5nAvU0znWTN61pE0LAQwO8xbCy_OcRX-noFrGDp-d4kATLf9th0MGp-IvaBIy4qZMJTW8BSeyFX1aBIRhU6UbsYfZXZRls_MCPkwGwqng96vyd3MVItGLKri52q5x_g'
    ],
    fabric: 'ابریشم ۱۰۰٪ طبیعی فرانسه',
    origin: 'بافندگی لیون فرانسه • دوخت دست‌ساز آتلیه',
    description: 'دکمه‌های صدف طبیعی دست‌ساز، دراپه لطیف و بی‌پایان با یقه ایستاده مینیمال و مچ‌های کشیده متناسب با استایل‌های کلاسیک و مهمانی‌های خصوصی.',
    features: [
      'ابریشم توت مرغوب با جلای مات و لطافت لمس',
      'دکمه‌های صدفی وارداتی طبیعی',
      'درزهای فرانسوی بسته بدون دیده شدن لبه سردوز',
      'ریزش لطیف و شیک بر روی اندام'
    ],
    sizes: ['۳۶', '۳۸', '۴۰', '۴۲'],
    colors: [
      { name: 'کرم عاجی', hex: '#FAF6F0', border: true },
      { name: 'نود پودری', hex: '#EADCCE' },
      { name: 'مشکی کربن', hex: '#1C1917' }
    ]
  },
  {
    id: 'vela-901',
    code: 'NO. 901',
    title: 'پالتو کشمیر پشمی زغالی',
    category: 'coat',
    categoryLabel: 'پالتو دست‌دوز',
    price: 6400000,
    priceFormatted: '۶,۴۰۰,۰۰۰ تومان',
    badge: 'کالکشن اختصاصی مزون',
    badgeType: 'exclusive',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfGtEw66viv3PbqZ2aG9Xmj-n-Un9LEkDIjcZQUvDiBjbGQvv3uBogjdacSrYQwZOQeDOzl8f2mIiS8hOzBLYWr2tm3lx539s6e8t7TSpWlP3Jatxc6mfM3E4Aoon9J-i-NDUcrTY33n2kbdhBn_UEjuNW-DJlAH0_Dgt5nTF8Ho44flEHGT5Ju2N2bR0sJx8Lknqum9NR-FiyrojrFNP6qW71TSdylEe0cqwjyzzeZ6CemtmsdnQ9pg',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAfGtEw66viv3PbqZ2aG9Xmj-n-Un9LEkDIjcZQUvDiBjbGQvv3uBogjdacSrYQwZOQeDOzl8f2mIiS8hOzBLYWr2tm3lx539s6e8t7TSpWlP3Jatxc6mfM3E4Aoon9J-i-NDUcrTY33n2kbdhBn_UEjuNW-DJlAH0_Dgt5nTF8Ho44flEHGT5Ju2N2bR0sJx8Lknqum9NR-FiyrojrFNP6qW71TSdylEe0cqwjyzzeZ6CemtmsdnQ9pg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDh0rDXV8JtqZbq2R5a-UKnj1nHBM_W8k9K7WnrSqNalJ-XBTk-3fKgIlyneSFtkdwhTo77xHbH78REzFUL2QKt_KReGiaTPGNmNPPnAkH1CdsnmBTxw5EuZ_ewBIlYjurJYq16VnkEZ-dsXmZgLz_mXqstEEjNqqGgAFE5JdkPlu4azhrYW0tYUxQgzXFTdAV24a-ZHTqVAFOQ5vHG6nRdqCerfb20YyQn06EOMxtbRBSnb1sXvy9fFQ'
    ],
    fabric: 'کشمیر گرم‌بالا ۸۵٪ و پشم خالص',
    origin: 'الیاف هیمالیا و بافت ایتالیا',
    description: 'تراکم گرمایش زمستانه ۵۰۰ گرم بر متر مربع، یقه شالی مجلل با کمربند چرم طبیعی دست‌دوز. بلندی تا زیر زانو برای نهایت وقار و محافظت در سرما.',
    features: [
      'کشمیر اعلا با نرمی لمس ابریشمی',
      'آستر ژاکارد طرح‌دار اختصاصی ولا',
      'کمربند چرم طبیعی با دوخت دوبل دستی',
      'مقاومت بالا در برابر پرزدهی'
    ],
    sizes: ['۳۸', '۴۰', '۴۲'],
    colors: [
      { name: 'زغالی عمیق', hex: '#2A2421' },
      { name: 'قهوه‌ای اسپرسو', hex: '#3E2F2B' },
      { name: 'خاکستری سنگی', hex: '#716B66' }
    ]
  },
  {
    id: 'vela-809',
    code: 'NO. 809',
    title: 'کت مونوکروم سند اوور سایز',
    category: 'blazer',
    categoryLabel: 'کت و بلیزر تک',
    price: 4200000,
    priceFormatted: '۴,۲۰۰,۰۰۰ تومان',
    badge: 'سفارشی دوز',
    badgeType: 'bespoke',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc_LgGd0L4nlU39Gqm1ZCEFti3UW8faA5F9pwTQPimg6Mh6xRoPQrLFEviVoKwMEY6a3K9WyBJSyuQrnT0uu32djM0q3vSIz3Rx8bgqzvxkTxKaE3auWHshPS5nAvU0znWTN61pE0LAQwO8xbCy_OcRX-noFrGDp-d4kATLf9th0MGp-IvaBIy4qZMJTW8BSeyFX1aBIRhU6UbsYfZXZRls_MCPkwGwqng96vyd3MVItGLKri52q5x_g',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCc_LgGd0L4nlU39Gqm1ZCEFti3UW8faA5F9pwTQPimg6Mh6xRoPQrLFEviVoKwMEY6a3K9WyBJSyuQrnT0uu32djM0q3vSIz3Rx8bgqzvxkTxKaE3auWHshPS5nAvU0znWTN61pE0LAQwO8xbCy_OcRX-noFrGDp-d4kATLf9th0MGp-IvaBIy4qZMJTW8BSeyFX1aBIRhU6UbsYfZXZRls_MCPkwGwqng96vyd3MVItGLKri52q5x_g',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuARmcYt1pzRz5ZL7y_45w4c1HVJYbMh9RzJAYiYWwEi2FsYZohX6gMBKF5nfRVEYGgMXCbQ7fUjjwmhbHXVAMoQcMz_7HStuzD7WDKVDq5XQWGwCDRCStwgb8oxD-TzGmYvgxxFZN3H7mEQkgejIWP5fwfZGudVD-iJbj24B1EY3wZpi5j8wWy2Oa6kTizme9iWSN0TOuk3xVvt-52-c2dyYqC1m3PpyLtM93C22njzdKzM-vVOAkDbdg'
    ],
    fabric: 'لینن سنگ‌شور ارگانیک',
    origin: 'الیاف کتان بلژیکی • فرآوری آنزیم‌شوی طبیعی',
    description: 'الگوی مدرن دراپ با سرشانه‌های راحت، تلفیق رهایی مینیمال در عین حفظ اقتدار کلاسیک کت‌های خیاطی دست‌دوز.',
    features: [
      'فرم اوورسایز آرشیتکتورال',
      'عدم تغییر سایز پس از شستشو با شست‌وشوی آنزیمی قبلی',
      'دو جیب پاکتی عمیق داخل لبه کت',
      'امکان شخصی‌سازی کامل قد آستین و کار'
    ],
    sizes: ['۳۶', '۳۸', '۴۰'],
    colors: [
      { name: 'کرم شنی', hex: '#DBCBBF' },
      { name: 'کمل تیره', hex: '#A88B77' },
      { name: 'طوسی استخوانی', hex: '#EAE4DC' }
    ]
  },
  {
    id: 'vela-602',
    code: 'NO. 602',
    title: 'شلوار واید لینن سنگ‌شور',
    category: 'trousers',
    categoryLabel: 'شلوار و مونوکروم',
    price: 2300000,
    priceFormatted: '۲,۳۰۰,۰۰۰ تومان',
    badge: 'طراحی ست کپسولی',
    badgeType: 'new',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARmcYt1pzRz5ZL7y_45w4c1HVJYbMh9RzJAYiYWwEi2FsYZohX6gMBKF5nfRVEYGgMXCbQ7fUjjwmhbHXVAMoQcMz_7HStuzD7WDKVDq5XQWGwCDRCStwgb8oxD-TzGmYvgxxFZN3H7mEQkgejIWP5fwfZGudVD-iJbj24B1EY3wZpi5j8wWy2Oa6kTizme9iWSN0TOuk3xVvt-52-c2dyYqC1m3PpyLtM93C22njzdKzM-vVOAkDbdg',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuARmcYt1pzRz5ZL7y_45w4c1HVJYbMh9RzJAYiYWwEi2FsYZohX6gMBKF5nfRVEYGgMXCbQ7fUjjwmhbHXVAMoQcMz_7HStuzD7WDKVDq5XQWGwCDRCStwgb8oxD-TzGmYvgxxFZN3H7mEQkgejIWP5fwfZGudVD-iJbj24B1EY3wZpi5j8wWy2Oa6kTizme9iWSN0TOuk3xVvt-52-c2dyYqC1m3PpyLtM93C22njzdKzM-vVOAkDbdg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDh0rDXV8JtqZbq2R5a-UKnj1nHBM_W8k9K7WnrSqNalJ-XBTk-3fKgIlyneSFtkdwhTo77xHbH78REzFUL2QKt_KReGiaTPGNmNPPnAkH1CdsnmBTxw5EuZ_ewBIlYjurJYq16VnkEZ-dsXmZgLz_mXqstEEjNqqGgAFE5JdkPlu4azhrYW0tYUxQgzXFTdAV24a-ZHTqVAFOQ5vHG6nRdqCerfb20YyQn06EOMxtbRBSnb1sXvy9fFQ'
    ],
    fabric: 'لینن نرم توسکانی',
    origin: 'آتلیه تخصصی شلوار دوزی تهران',
    description: 'فاق بلند با پیلی‌های متقارن ظریف در جلو، ریزش آزاد و قد کامل تا روی کفش برای ست کردن با کت‌های کپسولی ولا.',
    features: [
      'کمر بندخور با قزن مخفی فلزی ژاپنی',
      'دو جیب عمیق مخفی در درز پهلو',
      'ریزش نرم و راحتی بی‌بدیل در استفاده روزمره'
    ],
    sizes: ['۳۶', '۳۸', '۴۰', '۴۲'],
    colors: [
      { name: 'موکا شنی', hex: '#9E8877' },
      { name: 'کرم روشن', hex: '#EAE3DA' },
      { name: 'زغالی عمیق', hex: '#2A2421' }
    ]
  },
  {
    id: 'vela-908',
    code: 'NO. 908',
    title: 'بارانی ترنچ مینی‌مال ابریشمی',
    category: 'coat',
    categoryLabel: 'پالتو و بارانی',
    price: 5800000,
    priceFormatted: '۵,۸۰۰,۰۰۰ تومان',
    badge: 'تعداد محدود',
    badgeType: 'limited',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfGtEw66viv3PbqZ2aG9Xmj-n-Un9LEkDIjcZQUvDiBjbGQvv3uBogjdacSrYQwZOQeDOzl8f2mIiS8hOzBLYWr2tm3lx539s6e8t7TSpWlP3Jatxc6mfM3E4Aoon9J-i-NDUcrTY33n2kbdhBn_UEjuNW-DJlAH0_Dgt5nTF8Ho44flEHGT5Ju2N2bR0sJx8Lknqum9NR-FiyrojrFNP6qW71TSdylEe0cqwjyzzeZ6CemtmsdnQ9pg',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAfGtEw66viv3PbqZ2aG9Xmj-n-Un9LEkDIjcZQUvDiBjbGQvv3uBogjdacSrYQwZOQeDOzl8f2mIiS8hOzBLYWr2tm3lx539s6e8t7TSpWlP3Jatxc6mfM3E4Aoon9J-i-NDUcrTY33n2kbdhBn_UEjuNW-DJlAH0_Dgt5nTF8Ho44flEHGT5Ju2N2bR0sJx8Lknqum9NR-FiyrojrFNP6qW71TSdylEe0cqwjyzzeZ6CemtmsdnQ9pg'
    ],
    fabric: 'گاباردین کتان و ابریشم ضد آب',
    origin: 'میلان ایتالیا • آتلیه تهران',
    description: 'ترنچ‌کت تک‌ردیف دکمه مدرن با وزن سبک، آستر دوزی لوکس و کمربند سگک‌دار برنزی، مناسب روزهای بارانی پاییزی و بهاری.',
    features: [
      'خاصیت آب‌گریز الیاف بدون مواد شیمیایی مضر',
      'برش مینی‌مال با حذف اضافه بار شانه',
      'قد میدی شیک و قابل تنظیم با کمربند'
    ],
    sizes: ['۳۸', '۴۰', '۴۲'],
    colors: [
      { name: 'بژ پاریسی', hex: '#D2C1AF' },
      { name: 'زغالی مات', hex: '#312B28' }
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'همه محصولات', hasStar: true },
  { id: 'blazer', label: 'کت و بلیزر' },
  { id: 'coat', label: 'پالتو و بارانی' },
  { id: 'silk', label: 'شومیز و تاپ ابریشم' },
  { id: 'trousers', label: 'شلوار و مونوکروم' },
];

export const BANK_CARD_DETAILS = {
  bankName: 'بانک سامان',
  cardNumber: '۶۰۳۷-۹۹۷۹-۴۵۸۲-۱۲۰۴',
  cardNumberRaw: '6037997945821204',
  accountHolder: 'ولا لیبل (VELA LABEL)',
};
