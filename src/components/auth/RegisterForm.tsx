import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Building, AlertCircle } from 'lucide-react';
import { useAuth, UserRole } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface RegisterFormProps {
  onSuccess?: () => void;
  defaultRole?: UserRole;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, defaultRole }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: defaultRole || 'consumer' as UserRole,
    phone: '',
    location: '',
    company: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const { t, isRTL } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError(isRTL ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError(isRTL ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await register(formData);
      if (success) {
        onSuccess?.();
        window.location.href = '/dashboard';
      } else {
        setError(isRTL ? 'فشل في إنشاء الحساب' : 'Registration failed');
      }
    } catch (err) {
      setError(isRTL ? 'حدث خطأ في إنشاء الحساب' : 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const roleOptions = [
    { value: 'consumer', label: t('auth.role.consumer') },
    { value: 'producer', label: t('auth.role.producer') },
    { value: 'trader', label: t('auth.role.trader') },
  ];

  const saudiCities = [
    'الرياض', 'جدة', 'مكة المكرمة', 'المدينة المنورة', 'الدمام', 'الخبر', 'الطائف', 'بريدة', 'تبوك', 'القطيف',
    'الأحساء', 'حائل', 'نجران', 'الجبيل', 'ينبع', 'الخرج', 'أبها', 'عرعر', 'سكاكا', 'جازان'
  ];

  const saudiCitiesEn = [
    'Riyadh', 'Jeddah', 'Makkah', 'Medina', 'Dammam', 'Khobar', 'Taif', 'Buraidah', 'Tabuk', 'Qatif',
    'Al-Ahsa', 'Hail', 'Najran', 'Jubail', 'Yanbu', 'Al-Kharj', 'Abha', 'Arar', 'Sakaka', 'Jazan'
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center space-x-2 rtl:space-x-reverse">
            <User className="w-4 h-4 text-muted-foreground" />
            <span>{t('auth.name')}</span>
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder={isRTL ? 'أدخل الاسم الكامل' : 'Enter your full name'}
            required
            className="h-12"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{t('auth.email')}</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder={isRTL ? 'أدخل البريد الإلكتروني' : 'Enter your email'}
            required
            className="h-12"
            dir="ltr"
          />
        </div>

        {/* Role Selection */}
        <div className="space-y-2">
          <Label className="flex items-center space-x-2 rtl:space-x-reverse">
            <Building className="w-4 h-4 text-muted-foreground" />
            <span>{t('auth.role')}</span>
          </Label>
          <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder={isRTL ? 'اختر نوع الحساب' : 'Select account type'} />
            </SelectTrigger>
            <SelectContent>
              {roleOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span>{t('auth.phone')} ({isRTL ? 'اختياري' : 'Optional'})</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder={isRTL ? '+966 XX XXX XXXX' : '+966 XX XXX XXXX'}
            className="h-12"
            dir="ltr"
          />
        </div>

        {/* Location Field */}
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center space-x-2 rtl:space-x-reverse">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{t('auth.location')} ({isRTL ? 'اختياري' : 'Optional'})</span>
          </Label>
          <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder={isRTL ? 'اختر المدينة' : 'Select city'} />
            </SelectTrigger>
            <SelectContent>
              {(isRTL ? saudiCities : saudiCitiesEn).map((city, index) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Company Field (for producers and traders) */}
        {(formData.role === 'producer' || formData.role === 'trader') && (
          <div className="space-y-2">
            <Label htmlFor="company" className="flex items-center space-x-2 rtl:space-x-reverse">
              <Building className="w-4 h-4 text-muted-foreground" />
              <span>{t('auth.company')} ({isRTL ? 'اختياري' : 'Optional'})</span>
            </Label>
            <Input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              placeholder={isRTL ? 'اسم الشركة أو المزرعة' : 'Company or farm name'}
              className="h-12"
            />
          </div>
        )}

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Lock className="w-4 h-4 text-muted-foreground" />
            <span>{t('auth.password')}</span>
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder={isRTL ? 'أدخل كلمة المرور' : 'Enter your password'}
              required
              className="h-12 pr-12 rtl:pr-4 rtl:pl-12"
              dir="ltr"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground smooth-transition"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Lock className="w-4 h-4 text-muted-foreground" />
            <span>{isRTL ? 'تأكيد كلمة المرور' : 'Confirm Password'}</span>
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              placeholder={isRTL ? 'أعد إدخال كلمة المرور' : 'Re-enter your password'}
              required
              className="h-12 pr-12 rtl:pr-4 rtl:pl-12"
              dir="ltr"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground smooth-transition"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-destructive bg-destructive/10 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 btn-hero text-lg"
        >
          {isSubmitting ? t('common.loading') : t('nav.register')}
        </Button>

        {/* Login Link */}
        <div className="text-center pt-4 border-t border-border">
          <p className="text-muted-foreground text-sm mb-2">
            {isRTL ? 'لديك حساب بالفعل؟' : 'Already have an account?'}
          </p>
          <a
            href="/auth/login"
            className="btn-secondary inline-flex items-center"
          >
            {t('nav.login')}
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;