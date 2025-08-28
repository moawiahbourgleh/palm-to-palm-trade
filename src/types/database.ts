// Database types for the Saudi Dates E-commerce Platform

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'producer' | 'trader' | 'consumer' | 'admin';
  phone?: string;
  location?: string;
  company?: string;
  avatar?: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  producerId: string;
  
  // Mandatory fields
  variety: string; // e.g., "Medjool", "Deglet Noor", "Zahidi"
  weight: number; // in grams
  retailPrice: number; // SAR
  wholesalePrice: number; // SAR
  quantity: number;
  size: 'small' | 'medium' | 'large' | 'jumbo';
  color: string;
  grade: 'premium' | 'grade-a' | 'grade-b' | 'commercial';
  
  // Optional fields
  moisturePercentage?: number;
  sugarPercentage?: number;
  harvestDate?: Date;
  shelfLife?: number; // in days
  packaging?: string;
  certificates?: string[];
  farmLocation?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  
  // System fields
  qrCode: string;
  isActive: boolean;
  views: number;
  favorites: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  slug: string;
  description?: string;
  parentId?: string;
  order: number;
  isActive: boolean;
}

export interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  orderType: 'retail' | 'wholesale';
  shippingAddress: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Favorite {
  id: string;
  userId: string;
  productId: string;
  createdAt: Date;
}

export interface Settings {
  id: string;
  key: string;
  value: string;
  type: 'text' | 'number' | 'boolean' | 'json';
  category: 'general' | 'homepage' | 'seo' | 'email';
  isPublic: boolean;
}

export interface Analytics {
  id: string;
  date: Date;
  metric: string;
  value: number;
  metadata?: Record<string, any>;
}

// Mock data types for development
export interface MockProduct extends Omit<Product, 'createdAt' | 'updatedAt'> {
  producer: {
    name: string;
    location: string;
    company?: string;
  };
  images: string[];
}

export interface MockUser extends Omit<User, 'password' | 'createdAt' | 'updatedAt'> {
  productsCount?: number;
  totalSales?: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter and search types
export interface ProductFilters {
  variety?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  grade?: string;
  location?: string;
  hasStock?: boolean;
  producerId?: string;
}

export interface ProductSort {
  field: 'price' | 'createdAt' | 'views' | 'favorites';
  direction: 'asc' | 'desc';
}