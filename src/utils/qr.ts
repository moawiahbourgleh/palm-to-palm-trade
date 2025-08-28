import QRCode from 'qrcode';

export interface ProductQRData {
  productId: string;
  variety: string;
  producer: string;
  location: string;
  grade: string;
  harvestDate?: string;
  url: string;
}

export const generateProductQR = async (data: ProductQRData): Promise<string> => {
  try {
    const qrData = {
      type: 'saudi-dates-product',
      id: data.productId,
      variety: data.variety,
      producer: data.producer,
      location: data.location,
      grade: data.grade,
      harvestDate: data.harvestDate,
      url: data.url,
      timestamp: new Date().toISOString(),
    };

    const qrString = await QRCode.toDataURL(JSON.stringify(qrData), {
      errorCorrectionLevel: 'M',
      margin: 1,
      color: {
        dark: '#8B4513', // Saddle brown
        light: '#FFFFFF'
      },
      width: 256
    });

    return qrString;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

export const downloadQRCode = (qrDataUrl: string, filename: string) => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = qrDataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const parseProductQR = (qrData: string): ProductQRData | null => {
  try {
    const parsed = JSON.parse(qrData);
    if (parsed.type === 'saudi-dates-product') {
      return {
        productId: parsed.id,
        variety: parsed.variety,
        producer: parsed.producer,
        location: parsed.location,
        grade: parsed.grade,
        harvestDate: parsed.harvestDate,
        url: parsed.url,
      };
    }
    return null;
  } catch (error) {
    console.error('Error parsing QR data:', error);
    return null;
  }
};