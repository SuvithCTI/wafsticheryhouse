export interface Product {
  id: string;
  name: string;
  category: 'blouses' | 'dresses' | 'bridal' | 'kurtis' | 'custom';
  price: number;
  originalPrice?: number;
  description: string;
  fabric: string;
  embroidery: string;
  image: string;
  additionalImages?: string[];
  tags: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  preferredContact: 'whatsapp' | 'call' | 'email';
  createdAt: string;
  status: 'unread' | 'contacted' | 'resolved';
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  occasion: string;
  comment: string;
  verified: boolean;
  avatar?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'bridal' | 'blouses' | 'craftsmanship' | 'real_brides';
  image: string;
  description: string;
  details: string[];
  likes?: number;
}

export type PageView = 'home' | 'shop' | 'about' | 'gallery' | 'contact';

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface OrderDetails {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  pincode: string;
  address: string;
  city: string;
  state: string;
  customNotes?: string;
  paymentMethod: 'upi' | 'cod';
  items: CartItem[];
  totalAmount: number;
  status: 'waiting_for_confirmation' | 'confirmed' | 'in_stitching' | 'dispatched';
  createdAt: string;
}

