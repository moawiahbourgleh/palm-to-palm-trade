import React from 'react';
import { UserPlus, Package, Handshake, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const HowItWorks: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const steps = [
    {
      icon: UserPlus,
      titleKey: 'how.step1.title',
      descKey: 'how.step1.desc',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Package,
      titleKey: 'how.step2.title',
      descKey: 'how.step2.desc',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      icon: Handshake,
      titleKey: 'how.step3.title',
      descKey: 'how.step3.desc',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('section.how_it_works')}
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Card */}
              <div className="bg-white rounded-2xl p-8 shadow-warm hover:shadow-elegant smooth-transition border border-border/50 hover:border-primary/20 text-center group">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 ${step.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 smooth-transition`}>
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {t(step.titleKey)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(step.descKey)}
                </p>
              </div>

              {/* Arrow (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                  <ArrowIcon className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/auth/register"
            className="btn-hero inline-flex items-center space-x-3 rtl:space-x-reverse text-lg"
          >
            <span>{isRTL ? 'ابدأ الآن' : 'Get Started Now'}</span>
            <ArrowIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;