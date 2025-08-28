import React from 'react';
import { ArrowRight, ArrowLeft, Sparkles, TrendingUp, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import heroImage from '../assets/hero-dates.jpg';

const HeroSection: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Saudi Dates"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/60"></div>
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-overlay opacity-30"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-32 right-20 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-10 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect border border-white/30 mb-8">
            <Sparkles className="w-4 h-4 text-accent mr-2 rtl:mr-0 rtl:ml-2" />
            <span className="text-white/90 font-medium text-sm">
              {isRTL ? 'أجود أنواع التمور السعودية' : 'Premium Saudi Dates'}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block animate-slide-up">
              {t('hero.title')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <a
              href="/auth/register?role=producer"
              className="btn-hero inline-flex items-center space-x-3 rtl:space-x-reverse text-lg px-8 py-4"
            >
              <TrendingUp className="w-5 h-5" />
              <span>{t('hero.cta.producer')}</span>
              <ArrowIcon className="w-5 h-5" />
            </a>
            
            <a
              href="/auth/register?role=trader"
              className="btn-secondary inline-flex items-center space-x-3 rtl:space-x-reverse text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <Shield className="w-5 h-5" />
              <span>{t('hero.cta.trader')}</span>
              <ArrowIcon className="w-5 h-5" />
            </a>

            <a
              href="/auth/register?role=consumer"
              className="btn-accent inline-flex items-center space-x-3 rtl:space-x-reverse text-lg px-8 py-4 bg-accent/90 hover:bg-accent text-accent-foreground border border-accent/30"
            >
              <Shield className="w-5 h-5" />
              <span>{isRTL ? 'انضم إلينا كمستهلك' : 'Join as Consumer'}</span>
              <ArrowIcon className="w-5 h-5" />
            </a>
          </div>

          {/* Browse Products Link */}
          <div className="mt-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <a
              href="/products"
              className="inline-flex items-center text-white/80 hover:text-white smooth-transition animated-underline text-lg"
            >
              {t('hero.cta.browse')}
              <ArrowIcon className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2" />
            </a>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          {[
            { number: '500+', label: isRTL ? 'منتج' : 'Producers' },
            { number: '10K+', label: isRTL ? 'منتج' : 'Products' },
            { number: '25K+', label: isRTL ? 'عميل' : 'Customers' },
            { number: '50+', label: isRTL ? 'مدينة' : 'Cities' },
          ].map((stat, index) => (
            <div key={index} className="glass-effect border border-white/20 rounded-lg p-6">
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-white/70 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;