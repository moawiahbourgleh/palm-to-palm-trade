import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Home, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';

const NotFound: React.FC = () => {
  const location = useLocation();
  const { isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className={`min-h-screen bg-gradient-hero flex items-center justify-center p-4 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-overlay opacity-20"></div>
      
      <div className="relative z-10 text-center max-w-md mx-auto">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-6xl font-bold text-white/80">404</span>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-white mb-4">
          {isRTL ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h1>
        
        <p className="text-xl text-white/80 mb-8">
          {isRTL 
            ? 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها'
            : 'Sorry, the page you are looking for does not exist or has been moved'
          }
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <a
            href="/"
            className="btn-hero inline-flex items-center space-x-3 rtl:space-x-reverse text-lg px-8 py-4"
          >
            <Home className="w-5 h-5" />
            <span>{isRTL ? 'العودة للرئيسية' : 'Back to Home'}</span>
          </a>
          
          <div className="mt-4">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center text-white/80 hover:text-white smooth-transition animated-underline"
            >
              <ArrowIcon className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
              <span>{isRTL ? 'العودة للصفحة السابقة' : 'Go Back'}</span>
            </button>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-12 text-white/60 text-sm">
          <p>
            {isRTL 
              ? 'إذا كنت تعتقد أن هذا خطأ، يرجى الاتصال بالدعم الفني'
              : 'If you think this is an error, please contact support'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;