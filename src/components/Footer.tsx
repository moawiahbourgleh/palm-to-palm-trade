import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const footerSections = [
    {
      title: isRTL ? 'الشركة' : 'Company',
      links: [
        { name: isRTL ? 'من نحن' : 'About Us', href: '/about' },
        { name: isRTL ? 'خدماتنا' : 'Our Services', href: '/services' },
        { name: isRTL ? 'المدونة' : 'Blog', href: '/blog' },
        { name: isRTL ? 'الأخبار' : 'News', href: '/news' },
      ]
    },
    {
      title: isRTL ? 'المنتجات' : 'Products',
      links: [
        { name: isRTL ? 'تمور المجهول' : 'Medjool Dates', href: '/products?variety=medjool' },
        { name: isRTL ? 'تمور الصقعي' : 'Sukkari Dates', href: '/products?variety=sukkari' },
        { name: isRTL ? 'تمور العجوة' : 'Ajwa Dates', href: '/products?variety=ajwa' },
        { name: isRTL ? 'تمور الزهيدي' : 'Zahidi Dates', href: '/products?variety=zahidi' },
      ]
    },
    {
      title: isRTL ? 'الدعم' : 'Support',
      links: [
        { name: isRTL ? 'اتصل بنا' : 'Contact Us', href: '/contact' },
        { name: isRTL ? 'الأسئلة الشائعة' : 'FAQ', href: '/faq' },
        { name: isRTL ? 'المساعدة' : 'Help Center', href: '/help' },
        { name: isRTL ? 'سياسة الإرجاع' : 'Return Policy', href: '/returns' },
      ]
    },
    {
      title: isRTL ? 'قانوني' : 'Legal',
      links: [
        { name: isRTL ? 'الخصوصية' : 'Privacy Policy', href: '/privacy' },
        { name: isRTL ? 'الشروط والأحكام' : 'Terms of Service', href: '/terms' },
        { name: isRTL ? 'ملفات تعريف الارتباط' : 'Cookie Policy', href: '/cookies' },
        { name: isRTL ? 'الاستخدام المقبول' : 'Acceptable Use', href: '/acceptable-use' },
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4">
                {isRTL ? 'سوق التمور السعودية' : 'Saudi Dates Market'}
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                {isRTL 
                  ? 'منصة إلكترونية تربط منتجي التمور السعودية بالتجار والمستهلكين، مما يضمن أجود الأنواع وأفضل الأسعار.'
                  : 'A digital platform connecting Saudi dates producers with traders and consumers, ensuring the finest quality and best prices.'
                }
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="w-5 h-5 text-accent" />
                <span className="text-primary-foreground/90">info@saudidates.sa</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="w-5 h-5 text-accent" />
                <span className="text-primary-foreground/90" dir="ltr">+966 11 234 5678</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MapPin className="w-5 h-5 text-accent" />
                <span className="text-primary-foreground/90">
                  {isRTL ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h4 className="text-lg font-semibold mb-4 text-accent">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground smooth-transition hover:text-accent"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-primary-foreground/20 pt-8 mt-12">
          <div className="max-w-md mx-auto lg:mx-0 text-center lg:text-left">
            <h4 className="text-lg font-semibold mb-4 text-accent">
              {isRTL ? 'اشترك في النشرة الإخبارية' : 'Subscribe to Newsletter'}
            </h4>
            <p className="text-primary-foreground/80 mb-4">
              {isRTL 
                ? 'احصل على آخر الأخبار والعروض الخاصة'
                : 'Get the latest news and special offers'
              }
            </p>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <input
                type="email"
                placeholder={isRTL ? 'البريد الإلكتروني' : 'Email address'}
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-primary-foreground placeholder-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="btn-accent px-6 py-2 text-sm">
                {isRTL ? 'اشتراك' : 'Subscribe'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-primary-foreground/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-primary-foreground/80 text-sm">
              © 2024 {isRTL ? 'سوق التمور السعودية' : 'Saudi Dates Market'}. 
              {isRTL ? ' جميع الحقوق محفوظة.' : ' All rights reserved.'}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <span className="text-primary-foreground/80 text-sm">
                {isRTL ? 'تابعنا:' : 'Follow us:'}
              </span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-8 h-8 bg-white/10 hover:bg-accent hover:text-primary rounded-full flex items-center justify-center smooth-transition"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Certifications */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse text-primary-foreground/80 text-xs">
              <span>{isRTL ? 'معتمد من وزارة التجارة' : 'Ministry of Commerce Certified'}</span>
              <div className="w-px h-4 bg-primary-foreground/20"></div>
              <span>{isRTL ? 'مصدق ISO 22000' : 'ISO 22000 Certified'}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;