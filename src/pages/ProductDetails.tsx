import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Package, Scale, Palette, QrCode, Star, Heart, Eye, ArrowLeft, ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { MockProduct } from '../types/database';
import varietyImage from '../assets/dates-variety.jpg';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import QRGenerator from '../components/QRGenerator';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, isRTL } = useLanguage();

  // Mock product data - في التطبيق الحقيقي سيتم جلب البيانات من قاعدة البيانات
  const mockProducts: MockProduct[] = [
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
      harvestDate: new Date('2024-01-15'),
      shelfLife: 365,
      packaging: isRTL ? 'علبة فاخرة' : 'Premium Box',
      certificates: [isRTL ? 'عضوي' : 'Organic', isRTL ? 'حلال' : 'Halal'],
      qrCode: 'QR001-SA-1234567890',
      isActive: true,
      views: 245,
      favorites: 32,
      producer: {
        name: isRTL ? 'مزرعة الواحة الذهبية' : 'Golden Oasis Farm',
        location: isRTL ? 'الأحساء' : 'Al-Ahsa',
        company: isRTL ? 'مزارع الأحساء' : 'Al-Ahsa Farms',
        phone: '+966-50-123-4567'
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
      harvestDate: new Date('2024-02-10'),
      shelfLife: 300,
      packaging: isRTL ? 'كيس مفرغ من الهواء' : 'Vacuum Sealed Bag',
      certificates: [isRTL ? 'عضوي' : 'Organic', isRTL ? 'ISO 22000' : 'ISO 22000'],
      qrCode: 'QR002-SA-2345678901',
      isActive: true,
      views: 189,
      favorites: 28,
      producer: {
        name: isRTL ? 'مزرعة النخيل الملكية' : 'Royal Palm Farm',
        location: isRTL ? 'القصيم' : 'Al-Qassim',
        company: isRTL ? 'مزارع القصيم الملكية' : 'Royal Qassim Farms',
        phone: '+966-55-987-6543'
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
      harvestDate: new Date('2024-01-20'),
      shelfLife: 400,
      packaging: isRTL ? 'صندوق خشبي' : 'Wooden Box',
      certificates: [isRTL ? 'عضوي' : 'Organic', isRTL ? 'حلال' : 'Halal', isRTL ? 'تراثي' : 'Heritage'],
      qrCode: 'QR003-SA-3456789012',
      isActive: true,
      views: 312,
      favorites: 45,
      producer: {
        name: isRTL ? 'مزرعة المدينة المباركة' : 'Blessed Medina Farm',
        location: isRTL ? 'المدينة المنورة' : 'Medina',
        company: isRTL ? 'مزارع المدينة المنورة' : 'Medina Farms',
        phone: '+966-54-555-7890'
      },
      images: [varietyImage],
      farmLocation: {
        latitude: 24.47,
        longitude: 39.61,
        address: isRTL ? 'المدينة المنورة، المملكة العربية السعودية' : 'Medina, Saudi Arabia'
      }
    }
  ];

  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {isRTL ? 'المنتج غير موجود' : 'Product Not Found'}
            </h1>
            <Link to="/" className="btn-primary">
              {isRTL ? 'العودة للرئيسية' : 'Back to Home'}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const qrData = {
    productId: product.id,
    variety: product.variety,
    producer: product.producer.name,
    location: product.producer.location,
    grade: product.grade,
    harvestDate: product.harvestDate?.toISOString(),
    url: `${window.location.origin}/product/${product.id}`
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary smooth-transition">
            {isRTL ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.variety}</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-6">
            <div className="aspect-square bg-muted/30 rounded-2xl overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.variety}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Stats */}
            <div className="flex items-center justify-center space-x-8 rtl:space-x-reverse text-muted-foreground">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Eye className="w-5 h-5" />
                <span>{product.views}</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Heart className="w-5 h-5" />
                <span>{product.favorites}</span>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                <span className="bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {product.grade === 'premium' ? (isRTL ? 'ممتاز' : 'Premium') : product.grade}
                </span>
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < 4 ? 'text-accent fill-current' : 'text-muted-foreground'}`}
                    />
                  ))}
                  <span className="text-muted-foreground ml-2 rtl:ml-0 rtl:mr-2">(4.8)</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.variety}
              </h1>
              
              <div className="flex items-center text-muted-foreground mb-6">
                <MapPin className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                <span className="text-lg">{product.producer.location}</span>
              </div>
              
              <p className="text-muted-foreground text-lg">{product.producer.name}</p>
            </div>

            {/* Price */}
            <div className="bg-muted/30 rounded-xl p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                    {isRTL ? 'سعر التجزئة' : 'Retail Price'}
                  </h3>
                  <div className="text-3xl font-bold text-primary">
                    {product.retailPrice} {isRTL ? 'ر.س' : 'SAR'}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                    {isRTL ? 'سعر الجملة' : 'Wholesale Price'}
                  </h3>
                  <div className="text-3xl font-bold text-secondary">
                    {product.wholesalePrice} {isRTL ? 'ر.س' : 'SAR'}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Specifications */}
            <div className="bg-white rounded-xl p-6 shadow-warm border border-border/50">
              <h3 className="text-xl font-bold text-foreground mb-6">
                {isRTL ? 'مواصفات المنتج' : 'Product Specifications'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Scale className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">{isRTL ? 'الوزن' : 'Weight'}</span>
                    </div>
                    <span className="font-semibold">{product.weight}g</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Package className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">{isRTL ? 'الحجم' : 'Size'}</span>
                    </div>
                    <span className="font-semibold capitalize">{product.size}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Palette className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">{isRTL ? 'اللون' : 'Color'}</span>
                    </div>
                    <span className="font-semibold">{product.color}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{isRTL ? 'الكمية المتاحة' : 'Available Quantity'}</span>
                    <span className="font-semibold">{product.quantity} {isRTL ? 'كجم' : 'kg'}</span>
                  </div>
                  
                  {product.harvestDate && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="text-muted-foreground">{isRTL ? 'تاريخ الحصاد' : 'Harvest Date'}</span>
                      </div>
                      <span className="font-semibold">
                        {product.harvestDate.toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}
                      </span>
                    </div>
                  )}
                  
                  {product.moisturePercentage && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{isRTL ? 'نسبة الرطوبة' : 'Moisture'}</span>
                      <span className="font-semibold">{product.moisturePercentage}%</span>
                    </div>
                  )}
                </div>
              </div>
              
              {product.certificates && product.certificates.length > 0 && (
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                    {isRTL ? 'الشهادات' : 'Certificates'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.certificates.map((cert, index) => (
                      <span key={index} className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Seller */}
            <div className="bg-muted/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="w-6 h-6 text-primary" />
                <span>{isRTL ? 'تواصل مع البائع' : 'Contact Seller'}</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-border/50">
                  <div>
                    <div className="font-semibold text-foreground">{product.producer.name}</div>
                    <div className="text-muted-foreground text-sm">{product.producer.location}</div>
                  </div>
                  <div className="flex space-x-3 rtl:space-x-reverse">
                    <a
                      href={`tel:${product.producer.phone}`}
                      className="btn-primary px-4 py-2 text-sm flex items-center space-x-2 rtl:space-x-reverse"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{isRTL ? 'اتصال' : 'Call'}</span>
                    </a>
                    <a
                      href={`https://wa.me/${product.producer.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary px-4 py-2 text-sm flex items-center space-x-2 rtl:space-x-reverse"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{isRTL ? 'واتساب' : 'WhatsApp'}</span>
                    </a>
                  </div>
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  {product.producer.phone}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 rtl:space-x-reverse">
              <button className="btn-primary flex-1">
                {isRTL ? 'أضف للمفضلة' : 'Add to Favorites'}
              </button>
              <button className="btn-secondary">
                {isRTL ? 'مشاركة' : 'Share'}
              </button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid lg:grid-cols-2 gap-12 mt-16">
          {/* QR Code */}
          <div className="bg-white rounded-xl p-6 shadow-warm border border-border/50">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center space-x-3 rtl:space-x-reverse">
              <QrCode className="w-6 h-6 text-primary" />
              <span>{isRTL ? 'رمز QR للمنتج' : 'Product QR Code'}</span>
            </h3>
            <QRGenerator productData={qrData} />
          </div>

          {/* Farm Location */}
          {product.farmLocation && (
            <div className="bg-white rounded-xl p-6 shadow-warm border border-border/50">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center space-x-3 rtl:space-x-reverse">
                <MapPin className="w-6 h-6 text-primary" />
                <span>{isRTL ? 'موقع المزرعة' : 'Farm Location'}</span>
              </h3>
              
              <div className="mb-4">
                <p className="text-muted-foreground">{product.farmLocation.address}</p>
              </div>
              
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${product.farmLocation.longitude}!3d${product.farmLocation.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI0JzAwLjAiTiA0OcKwMzYnMDAuMCJF!5e0!3m2!1sen!2ssa!4v1635000000000!5m2!1sen!2ssa`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={isRTL ? 'موقع المزرعة' : 'Farm Location'}
                />
              </div>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-12">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 rtl:space-x-reverse text-primary hover:text-primary/80 smooth-transition"
          >
            {isRTL ? (
              <>
                <ArrowRight className="w-5 h-5" />
                <span>العودة للرئيسية</span>
              </>
            ) : (
              <>
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </>
            )}
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;