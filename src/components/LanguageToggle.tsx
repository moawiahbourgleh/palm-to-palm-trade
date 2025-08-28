import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';

interface LanguageToggleProps {
  className?: string;
  showText?: boolean;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  className = '', 
  showText = true 
}) => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className={`flex items-center space-x-2 rtl:space-x-reverse hover:bg-accent/10 ${className}`}
    >
      <Globe className="w-4 h-4" />
      {showText && (
        <span className="text-sm font-medium">
          {language === 'ar' ? 'English' : 'العربية'}
        </span>
      )}
    </Button>
  );
};

export default LanguageToggle;