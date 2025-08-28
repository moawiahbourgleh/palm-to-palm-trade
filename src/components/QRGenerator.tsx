import React, { useState, useEffect } from 'react';
import { Download, RefreshCw } from 'lucide-react';
import { generateProductQR, downloadQRCode, ProductQRData } from '../utils/qr';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';

interface QRGeneratorProps {
  productData: ProductQRData;
  className?: string;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ productData, className = '' }) => {
  const [qrCode, setQrCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { isRTL } = useLanguage();

  const generateQR = async () => {
    setIsLoading(true);
    setError('');

    try {
      const qrString = await generateProductQR(productData);
      setQrCode(qrString);
    } catch (err) {
      setError(isRTL ? 'فشل في إنشاء رمز QR' : 'Failed to generate QR code');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateQR();
  }, [productData]);

  const handleDownload = () => {
    if (qrCode) {
      const filename = `qr-${productData.variety.replace(/\s+/g, '-')}-${productData.productId}.png`;
      downloadQRCode(qrCode, filename);
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-border p-4 ${className}`}>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {isRTL ? 'رمز QR للمنتج' : 'Product QR Code'}
        </h3>

        {/* QR Code Display */}
        <div className="mb-4 flex justify-center">
          {isLoading ? (
            <div className="w-64 h-64 bg-muted rounded-lg flex items-center justify-center">
              <RefreshCw className="w-8 h-8 text-muted-foreground animate-spin" />
            </div>
          ) : error ? (
            <div className="w-64 h-64 bg-destructive/10 rounded-lg flex items-center justify-center">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          ) : qrCode ? (
            <img
              src={qrCode}
              alt="Product QR Code"
              className="w-64 h-64 rounded-lg shadow-warm"
            />
          ) : null}
        </div>

        {/* Product Info */}
        <div className="text-sm text-muted-foreground mb-4 space-y-1">
          <p><strong>{isRTL ? 'الصنف:' : 'Variety:'}</strong> {productData.variety}</p>
          <p><strong>{isRTL ? 'المنتج:' : 'Producer:'}</strong> {productData.producer}</p>
          <p><strong>{isRTL ? 'الموقع:' : 'Location:'}</strong> {productData.location}</p>
          <p><strong>{isRTL ? 'الدرجة:' : 'Grade:'}</strong> {productData.grade}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 rtl:space-x-reverse justify-center">
          <Button
            onClick={generateQR}
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2 ${isLoading ? 'animate-spin' : ''}`} />
            {isRTL ? 'إعادة إنشاء' : 'Regenerate'}
          </Button>
          
          <Button
            onClick={handleDownload}
            disabled={!qrCode || isLoading}
            className="btn-primary"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
            {isRTL ? 'تحميل' : 'Download'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;