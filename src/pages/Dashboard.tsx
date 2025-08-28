import React from 'react';
import { Navigate } from 'react-router-dom';
import { Package, Users, TrendingUp, Settings, Plus, Eye, Heart, QrCode } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const Dashboard: React.FC = () => {
  const { user, isLoading } = useAuth();
  const { t, isRTL } = useLanguage();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  const getDashboardContent = () => {
    switch (user.role) {
      case 'producer':
        return <ProducerDashboard />;
      case 'trader':
        return <TraderDashboard />;
      case 'consumer':
        return <ConsumerDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <ConsumerDashboard />;
    }
  };

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {isRTL ? `مرحباً، ${user.name}` : `Welcome, ${user.name}`}
          </h1>
          <p className="text-muted-foreground">
            {isRTL ? `لوحة تحكم ${user.role === 'producer' ? 'المنتج' : user.role === 'trader' ? 'التاجر' : user.role === 'admin' ? 'المدير' : 'المستهلك'}` 
                   : `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard`}
          </p>
        </div>

        {getDashboardContent()}
      </main>
      <Footer />
    </div>
  );
};

const ProducerDashboard: React.FC = () => {
  const { isRTL } = useLanguage();

  const stats = [
    { title: isRTL ? 'المنتجات' : 'Products', value: '12', icon: Package, color: 'text-primary' },
    { title: isRTL ? 'المبيعات' : 'Sales', value: '1,284', icon: TrendingUp, color: 'text-secondary' },
    { title: isRTL ? 'المشاهدات' : 'Views', value: '4,892', icon: Eye, color: 'text-accent' },
    { title: isRTL ? 'المفضلة' : 'Favorites', value: '156', icon: Heart, color: 'text-destructive' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-warm smooth-transition">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-muted rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{isRTL ? 'الإجراءات السريعة' : 'Quick Actions'}</CardTitle>
          <CardDescription>{isRTL ? 'إدارة منتجاتك والمبيعات' : 'Manage your products and sales'}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="btn-hero h-16 flex flex-col space-y-2">
              <Plus className="w-6 h-6" />
              <span>{isRTL ? 'إضافة منتج جديد' : 'Add New Product'}</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col space-y-2">
              <QrCode className="w-6 h-6" />
              <span>{isRTL ? 'إنشاء رمز QR' : 'Generate QR Codes'}</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col space-y-2">
              <TrendingUp className="w-6 h-6" />
              <span>{isRTL ? 'تقارير المبيعات' : 'Sales Reports'}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Products */}
      <Card>
        <CardHeader>
          <CardTitle>{isRTL ? 'المنتجات الحديثة' : 'Recent Products'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>{isRTL ? 'لا توجد منتجات بعد' : 'No products yet'}</p>
            <Button className="btn-secondary mt-4">
              <Plus className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
              {isRTL ? 'إضافة منتج جديد' : 'Add Your First Product'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const TraderDashboard: React.FC = () => {
  const { isRTL } = useLanguage();

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{isRTL ? 'المنتجات المفضلة' : 'Favorite Products'}</CardTitle>
          <CardDescription>{isRTL ? 'منتجاتك المحفوظة للشراء بالجملة' : 'Your saved products for wholesale purchase'}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>{isRTL ? 'لا توجد منتجات مفضلة بعد' : 'No favorite products yet'}</p>
            <Button className="btn-secondary mt-4">
              {isRTL ? 'تصفح المنتجات' : 'Browse Products'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ConsumerDashboard: React.FC = () => {
  const { isRTL } = useLanguage();

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{isRTL ? 'المشتريات الأخيرة' : 'Recent Purchases'}</CardTitle>
          <CardDescription>{isRTL ? 'تاريخ مشترياتك من التمور' : 'Your dates purchase history'}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>{isRTL ? 'لا توجد مشتريات بعد' : 'No purchases yet'}</p>
            <Button className="btn-secondary mt-4">
              {isRTL ? 'تصفح المنتجات' : 'Start Shopping'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const { isRTL } = useLanguage();

  const stats = [
    { title: isRTL ? 'المستخدمين' : 'Users', value: '1,247', icon: Users, color: 'text-primary' },
    { title: isRTL ? 'المنتجات' : 'Products', value: '3,891', icon: Package, color: 'text-secondary' },
    { title: isRTL ? 'المبيعات اليوم' : 'Today Sales', value: '156', icon: TrendingUp, color: 'text-accent' },
    { title: isRTL ? 'الإعدادات' : 'Settings', value: '12', icon: Settings, color: 'text-muted-foreground' },
  ];

  return (
    <div className="space-y-8">
      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-warm smooth-transition">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-muted rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Admin Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{isRTL ? 'إدارة النظام' : 'System Management'}</CardTitle>
          <CardDescription>{isRTL ? 'إدارة المستخدمين والمحتوى' : 'Manage users and content'}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 flex flex-col space-y-2">
              <Users className="w-6 h-6" />
              <span>{isRTL ? 'إدارة المستخدمين' : 'User Management'}</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col space-y-2">
              <Package className="w-6 h-6" />
              <span>{isRTL ? 'مراجعة المنتجات' : 'Product Review'}</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col space-y-2">
              <Settings className="w-6 h-6" />
              <span>{isRTL ? 'إعدادات النظام' : 'System Settings'}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;