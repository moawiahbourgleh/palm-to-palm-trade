import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import LoginForm from '../../components/auth/LoginForm';
import { useLanguage } from '../../contexts/LanguageContext';

const Login: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className={`min-h-screen bg-gradient-hero flex items-center justify-center p-4 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-overlay opacity-20"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse mb-4">
            <a
              href="/"
              className="flex items-center space-x-2 rtl:space-x-reverse text-white hover:text-accent smooth-transition"
            >
              <ArrowIcon className="w-4 h-4" />
              <span className="text-sm">{isRTL ? 'العودة للرئيسية' : 'Back to Home'}</span>
            </a>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">
            {t('nav.login')}
          </h1>
          
          <p className="text-white/80">
            {isRTL ? 'أهلاً بك في سوق التمور السعودية' : 'Welcome to Saudi Dates Market'}
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-elegant border border-white/20">
          <LoginForm />
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white/70 text-sm">
          <p>
            {isRTL 
              ? 'منصة آمنة ومعتمدة للتجارة الإلكترونية' 
              : 'Secure and certified e-commerce platform'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;