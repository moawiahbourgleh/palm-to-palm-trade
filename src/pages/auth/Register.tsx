import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import RegisterForm from '../../components/auth/RegisterForm';
import { useLanguage } from '../../contexts/LanguageContext';
import { UserRole } from '../../contexts/AuthContext';

const Register: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft;
  
  const roleFromUrl = searchParams.get('role') as UserRole;

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
            {t('nav.register')}
          </h1>
          
          <p className="text-white/80">
            {isRTL ? 'انضم إلى منصة التمور السعودية' : 'Join the Saudi Dates Marketplace'}
          </p>
          
          {roleFromUrl && (
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-white/10 rounded-full border border-white/20">
              <span className="text-white/90 text-sm">
                {isRTL ? 'التسجيل ك' : 'Registering as'}: {' '}
                <span className="font-semibold text-accent">
                  {roleFromUrl === 'producer' && (isRTL ? 'منتج' : 'Producer')}
                  {roleFromUrl === 'trader' && (isRTL ? 'تاجر' : 'Trader')}
                  {roleFromUrl === 'consumer' && (isRTL ? 'مستهلك' : 'Consumer')}
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Register Form Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-elegant border border-white/20">
          <RegisterForm defaultRole={roleFromUrl} />
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white/70 text-sm">
          <p>
            {isRTL 
              ? 'بإنشاء حساب، أنت توافق على شروط الخدمة وسياسة الخصوصية' 
              : 'By creating an account, you agree to our Terms of Service and Privacy Policy'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;