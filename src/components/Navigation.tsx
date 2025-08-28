import React, { useState } from 'react';
import { Menu, X, Globe, ShoppingCart, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { language, setLanguage, t, isRTL } = useLanguage();

  const handleLanguageToggle = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const navigationItems = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.products', href: '/products' },
    { key: 'nav.about', href: '/about' },
    { key: 'nav.contact', href: '/contact' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {isRTL ? 'سوق التمور' : 'Dates Market'}
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8 rtl:space-x-reverse">
              {navigationItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-foreground hover:text-primary smooth-transition animated-underline font-medium"
                >
                  {t(item.key)}
                </a>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLanguageToggle}
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">
                {language === 'ar' ? 'EN' : 'ع'}
              </span>
            </Button>

            {/* User Actions */}
            {user ? (
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <a
                  href="/dashboard"
                  className="btn-secondary hidden sm:inline-flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <User className="h-4 w-4" />
                  <span>{t('nav.dashboard')}</span>
                </a>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="hidden sm:inline-flex"
                >
                  {t('nav.logout')}
                </Button>
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden lg:block font-medium">{user.name}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <a href="/auth/login" className="btn-secondary">
                  {t('nav.login')}
                </a>
                <a href="/auth/register" className="btn-hero">
                  {t('nav.register')}
                </a>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-border shadow-elegant">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md smooth-transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {t(item.key)}
              </a>
            ))}
            {user && (
              <>
                <a
                  href="/dashboard"
                  className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md smooth-transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.dashboard')}
                </a>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md smooth-transition"
                >
                  {t('nav.logout')}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;