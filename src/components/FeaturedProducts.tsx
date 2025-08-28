import React from 'react';
import { Star, MapPin, Eye, Heart, QrCode } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { MockProduct } from '../types/database';
import varietyImage from '../assets/dates-variety.jpg';

const FeaturedProducts: React.FC = () => {
  const { t, isRTL } = useLanguage();

  // Mock featured products data
  const featuredProducts: MockProduct[] = [
    {
      id: '1',
      producerId: '1',
      variety: isRTL ? 'تمر المجهول' : 'Medjool Dates',
      weight: 500,
      retailPrice: 45,
      wholesalePrice: 35,
      quantity: 100,
      size: 'jumbo',
      color: isRTL ? 'بني داكن' : 'Dark Brown',
      grade: 'premium',
      moisturePercentage: 20,
      sugarPercentage: 75,
      qrCode: 'QR001',
      isActive: true,
      views: 245,
      favorites: 32,
      producer: {
        name: isRTL ? 'مزرعة الواحة الذهبية' : 'Golden Oasis Farm',
        location: isRTL ? 'الأحساء' : 'Al-Ahsa',
        company: isRTL ? 'مزارع الأحساء' : 'Al-Ahsa Farms'
      },
      images: [varietyImage],
      farmLocation: {
        latitude: 25.4,
        longitude: 49.6,
        address: isRTL ? 'الأحساء، المملكة العربية السعودية' : 'Al-Ahsa, Saudi Arabia'
      }
    },
    {
      id: '2',
      producerId: '2',
      variety: isRTL ? 'تمر الصقعي' : 'Sukkari Dates',
      weight: 1000,
      retailPrice: 85,
      wholesalePrice: 70,
      quantity: 75,
      size: 'large',
      color: isRTL ? 'ذهبي' : 'Golden',
      grade: 'premium',
      moisturePercentage: 18,
      sugarPercentage: 78,
      qrCode: 'QR002',
      isActive: true,
      views: 189,
      favorites: 28,
      producer: {
        name: isRTL ? 'مزرعة النخيل الملكية' : 'Royal Palm Farm',
        location: isRTL ? 'القصيم' : 'Al-Qassim',
        company: isRTL ? 'مزارع القصيم الملكية' : 'Royal Qassim Farms'
      },
      images: [varietyImage],
      farmLocation: {
        latitude: 26.3,
        longitude: 43.98,
        address: isRTL ? 'القصيم، المملكة العربية السعودية' : 'Al-Qassim, Saudi Arabia'
      }
    },
    {
      id: '3',
      producerId: '3',
      variety: isRTL ? 'تمر العجوة' : 'Ajwa Dates',
      weight: 250,
      retailPrice: 120,
      wholesalePrice: 95,
      quantity: 50,
      size: 'medium',
      color: isRTL ? 'أسود' : 'Black',
      grade: 'premium',
      moisturePercentage: 25,
      sugarPercentage: 70,
      qrCode: 'QR003',
      isActive: true,
      views: 312,
      favorites: 45,
      producer: {
        name: isRTL ? 'مزرعة المدينة المباركة' : 'Blessed Medina Farm',
        location: isRTL ? 'المدينة المنورة' : 'Medina',
        company: isRTL ? 'مزارع المدينة المنورة' : 'Medina Farms'
      },
      images: [varietyImage],
      farmLocation: {
        latitude: 24.47,
        longitude: 39.61,
        address: isRTL ? 'المدينة المنورة، المملكة العربية السعودية' : 'Medina, Saudi Arabia'
      }
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('section.featured_products')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {isRTL 
              ? 'اكتشف أجود التمور السعودية المختارة بعناية من أفضل المزارع'
              : 'Discover carefully selected premium Saudi dates from the finest farms'
            }
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-4"></div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-warm hover:shadow-elegant smooth-transition border border-border/50 hover:border-primary/20 group"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden bg-muted/30 h-48">
                <img
                  src={product.images[0]}
                  alt={product.variety}
                  className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                />
                
                {/* Grade Badge */}
                <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
                  <span className="bg-gradient-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {product.grade === 'premium' ? (isRTL ? 'ممتاز' : 'Premium') : product.grade}
                  </span>
                </div>

                {/* Actions */}
                <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 flex space-x-2 rtl:space-x-reverse">
                  <button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center smooth-transition group/btn">
                    <Heart className="w-4 h-4 text-muted-foreground group-hover/btn:text-red-500" />
                  </button>
                  <button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center smooth-transition group/btn">
                    <QrCode className="w-4 h-4 text-muted-foreground group-hover/btn:text-primary" />
                  </button>
                </div>

                {/* Stats */}
                <div className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 flex items-center space-x-4 rtl:space-x-reverse text-white text-xs">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Eye className="w-3 h-3" />
                    <span>{product.views}</span>
                  </div>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Heart className="w-3 h-3" />
                    <span>{product.favorites}</span>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Title & Location */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary smooth-transition">
                    {product.variety}
                  </h3>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                    <span>{product.producer.location}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{product.producer.name}</p>
                </div>

                {/* Product Details */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">{t('product.weight')}:</span>
                    <span className="font-medium ml-1 rtl:ml-0 rtl:mr-1">{product.weight}g</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t('product.size')}:</span>
                    <span className="font-medium ml-1 rtl:ml-0 rtl:mr-1 capitalize">{product.size}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < 4 ? 'text-accent fill-current' : 'text-muted-foreground'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground ml-2 rtl:ml-0 rtl:mr-2">(4.8)</span>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {product.retailPrice} {isRTL ? 'ر.س' : 'SAR'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {isRTL ? 'الجملة:' : 'Wholesale:'} {product.wholesalePrice} {isRTL ? 'ر.س' : 'SAR'}
                    </div>
                  </div>
                  <a
                    href={`/product/${product.id}`}
                    className="btn-accent text-sm px-4 py-2"
                  >
                    {isRTL ? 'عرض التفاصيل' : 'View Details'}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <a
            href="/products"
            className="btn-secondary inline-flex items-center space-x-3 rtl:space-x-reverse text-lg"
          >
            <span>{isRTL ? 'عرض جميع المنتجات' : 'View All Products'}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;