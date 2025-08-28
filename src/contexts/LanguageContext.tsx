import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

interface Translations {
  [key: string]: {
    ar: string;
    en: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { ar: 'الرئيسية', en: 'Home' },
  'nav.products': { ar: 'المنتجات', en: 'Products' },
  'nav.about': { ar: 'من نحن', en: 'About' },
  'nav.contact': { ar: 'اتصل بنا', en: 'Contact' },
  'nav.login': { ar: 'تسجيل الدخول', en: 'Login' },
  'nav.register': { ar: 'إنشاء حساب', en: 'Register' },
  'nav.dashboard': { ar: 'لوحة التحكم', en: 'Dashboard' },
  'nav.logout': { ar: 'تسجيل الخروج', en: 'Logout' },

  // Hero Section
  'hero.title': { ar: 'سوق التمور السعودية الإلكتروني', en: 'Saudi Dates Digital Marketplace' },
  'hero.subtitle': { ar: 'اكتشف أجود أنواع التمور السعودية من المنتجين مباشرة', en: 'Discover the finest Saudi dates directly from producers' },
  'hero.cta.producer': { ar: 'انضم كمنتج', en: 'Join as Producer' },
  'hero.cta.trader': { ar: 'انضم كتاجر', en: 'Join as Trader' },
  'hero.cta.browse': { ar: 'تصفح المنتجات', en: 'Browse Products' },

  // Sections
  'section.how_it_works': { ar: 'كيف يعمل الموقع', en: 'How It Works' },
  'section.featured_products': { ar: 'المنتجات المميزة', en: 'Featured Products' },
  'section.testimonials': { ar: 'آراء العملاء', en: 'Testimonials' },
  'section.statistics': { ar: 'إحصائيات المنصة', en: 'Platform Statistics' },

  // How it works
  'how.step1.title': { ar: 'إنشاء الحساب', en: 'Create Account' },
  'how.step1.desc': { ar: 'اختر نوع حسابك كمنتج أو تاجر أو مستهلك', en: 'Choose your account type as producer, trader, or consumer' },
  'how.step2.title': { ar: 'إضافة المنتجات', en: 'Add Products' },
  'how.step2.desc': { ar: 'أضف منتجاتك مع التفاصيل الكاملة ورمز QR', en: 'Add your products with complete details and QR code' },
  'how.step3.title': { ar: 'التواصل والبيع', en: 'Connect & Sell' },
  'how.step3.desc': { ar: 'تواصل مع التجار والمستهلكين وابدأ البيع', en: 'Connect with traders and consumers to start selling' },

  // Authentication
  'auth.email': { ar: 'البريد الإلكتروني', en: 'Email' },
  'auth.password': { ar: 'كلمة المرور', en: 'Password' },
  'auth.name': { ar: 'الاسم', en: 'Name' },
  'auth.phone': { ar: 'رقم الهاتف', en: 'Phone Number' },
  'auth.location': { ar: 'الموقع', en: 'Location' },
  'auth.company': { ar: 'الشركة', en: 'Company' },
  'auth.role': { ar: 'نوع الحساب', en: 'Account Type' },
  'auth.role.producer': { ar: 'منتج', en: 'Producer' },
  'auth.role.trader': { ar: 'تاجر', en: 'Trader' },
  'auth.role.consumer': { ar: 'مستهلك', en: 'Consumer' },

  // Product Fields
  'product.variety': { ar: 'الصنف', en: 'Variety' },
  'product.weight': { ar: 'الوزن', en: 'Weight' },
  'product.price.retail': { ar: 'سعر التجزئة', en: 'Retail Price' },
  'product.price.wholesale': { ar: 'سعر الجملة', en: 'Wholesale Price' },
  'product.quantity': { ar: 'الكمية', en: 'Quantity' },
  'product.size': { ar: 'الحجم', en: 'Size' },
  'product.color': { ar: 'اللون', en: 'Color' },
  'product.grade': { ar: 'الدرجة', en: 'Grade' },
  'product.moisture': { ar: 'نسبة الرطوبة', en: 'Moisture %' },
  'product.sugar': { ar: 'نسبة السكر', en: 'Sugar %' },
  'product.harvest': { ar: 'تاريخ الحصاد', en: 'Harvest Date' },
  'product.shelf_life': { ar: 'مدة الصلاحية', en: 'Shelf Life' },
  'product.packaging': { ar: 'التعبئة', en: 'Packaging' },
  'product.certificates': { ar: 'الشهادات', en: 'Certificates' },
  'product.farm_location': { ar: 'موقع المزرعة', en: 'Farm Location' },

  // Common
  'common.loading': { ar: 'جاري التحميل...', en: 'Loading...' },
  'common.save': { ar: 'حفظ', en: 'Save' },
  'common.cancel': { ar: 'إلغاء', en: 'Cancel' },
  'common.edit': { ar: 'تعديل', en: 'Edit' },
  'common.delete': { ar: 'حذف', en: 'Delete' },
  'common.view': { ar: 'عرض', en: 'View' },
  'common.search': { ar: 'بحث', en: 'Search' },
  'common.filter': { ar: 'تصفية', en: 'Filter' },
  'common.sort': { ar: 'ترتيب', en: 'Sort' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar'); // Arabic as default

  useEffect(() => {
    // Apply RTL/LTR to document
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Add appropriate class to body for styling
    document.body.className = language === 'ar' ? 'rtl font-arabic' : 'ltr font-inter';
  }, [language]);

  const isRTL = language === 'ar';

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};