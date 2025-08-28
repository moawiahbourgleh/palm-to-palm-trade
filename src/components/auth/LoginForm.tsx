import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const { t, isRTL } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const success = await login(email, password);
      if (success) {
        onSuccess?.();
        window.location.href = '/dashboard';
      } else {
        setError(isRTL ? 'بيانات الدخول غير صحيحة' : 'Invalid email or password');
      }
    } catch (err) {
      setError(isRTL ? 'حدث خطأ في تسجيل الدخول' : 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Demo accounts info
  const demoAccounts = [
    { email: 'producer@dates.sa', role: isRTL ? 'منتج' : 'Producer' },
    { email: 'trader@dates.sa', role: isRTL ? 'تاجر' : 'Trader' },
    { email: 'consumer@dates.sa', role: isRTL ? 'مستهلك' : 'Consumer' },
    { email: 'admin@dates.sa', role: isRTL ? 'مدير' : 'Admin' },
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{t('auth.email')}</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={isRTL ? 'أدخل البريد الإلكتروني' : 'Enter your email'}
            required
            className="h-12"
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        </div>

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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isRTL ? 'أدخل كلمة المرور' : 'Enter your password'}
              required
              className="h-12 pr-12 rtl:pr-4 rtl:pl-12"
              dir={isRTL ? 'rtl' : 'ltr'}
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
          {isSubmitting ? t('common.loading') : t('nav.login')}
        </Button>

        {/* Forgot Password */}
        <div className="text-center">
          <a
            href="/auth/forgot-password"
            className="text-sm text-primary hover:text-primary-hover smooth-transition animated-underline"
          >
            {isRTL ? 'نسيت كلمة المرور؟' : 'Forgot your password?'}
          </a>
        </div>

        {/* Register Link */}
        <div className="text-center pt-4 border-t border-border">
          <p className="text-muted-foreground text-sm mb-2">
            {isRTL ? 'ليس لديك حساب؟' : "Don't have an account?"}
          </p>
          <a
            href="/auth/register"
            className="btn-secondary inline-flex items-center"
          >
            {t('nav.register')}
          </a>
        </div>
      </form>

      {/* Demo Accounts Info */}
      <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
        <h4 className="font-semibold text-sm mb-3 text-center">
          {isRTL ? 'حسابات تجريبية للاختبار' : 'Demo Accounts for Testing'}
        </h4>
        <div className="space-y-2 text-xs">
          {demoAccounts.map((account, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="font-mono bg-white px-2 py-1 rounded">{account.email}</span>
              <span className="text-muted-foreground">{account.role}</span>
            </div>
          ))}
          <div className="text-center mt-2 pt-2 border-t border-border">
            <span className="text-muted-foreground">
              {isRTL ? 'كلمة المرور: password123' : 'Password: password123'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;