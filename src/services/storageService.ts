import { Product, Inquiry, GalleryItem, Review, CartItem } from '../types';
import { INITIAL_PRODUCTS, INITIAL_GALLERY, INITIAL_REVIEWS } from '../data/initialData';

const STORAGE_KEYS = {
  PRODUCTS: 'waf_products_v5',
  INQUIRIES: 'waf_inquiries_v4',
  GALLERY: 'waf_gallery_v4',
  REVIEWS: 'waf_reviews_v4',
  CART: 'waf_cart_v1',
  WISHLIST: 'waf_wishlist_v1'
};

const SAMPLE_INQUIRIES: Inquiry[] = [
  {
    id: 'INQ-101',
    name: 'Radhika Sen',
    email: 'radhika.sen@yahoo.com',
    phone: '+91 99887 76655',
    serviceType: 'Bridal Trousseau Consultation',
    message: 'Looking for custom stitching of 4 bridal blouses for my December wedding. Would love to discuss fabric options and schedule an appointment.',
    preferredContact: 'whatsapp',
    createdAt: '2026-09-09T16:00:00Z',
    status: 'unread'
  },
  {
    id: 'INQ-102',
    name: 'Tanvi Patel',
    email: 'tanvi.p@gmail.com',
    phone: '+91 98234 56789',
    serviceType: 'Custom Stitching Inquiry',
    message: 'Can I courier my saree fabric to your atelier for aari embroidery stitching?',
    preferredContact: 'whatsapp',
    createdAt: '2026-09-10T11:45:00Z',
    status: 'contacted'
  }
];

export const storageService = {
  // PRODUCTS
  getProducts(): Product[] {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.some((p: Product) => p.image && p.image.includes('unsplash.com'))) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
        return INITIAL_PRODUCTS;
      }
      return parsed;
    } catch {
      return INITIAL_PRODUCTS;
    }
  },

  addProduct(product: Omit<Product, 'id'>): Product {
    const products = this.getProducts();
    const newProduct: Product = {
      ...product,
      id: `waf-${Date.now().toString().slice(-4)}`
    };
    products.unshift(newProduct);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    return newProduct;
  },

  updateProduct(product: Product): void {
    const products = this.getProducts().map(p => p.id === product.id ? product : p);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  },

  deleteProduct(id: string): void {
    const products = this.getProducts().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  },

  // INQUIRIES
  getInquiries(): Inquiry[] {
    const raw = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(SAMPLE_INQUIRIES));
      return SAMPLE_INQUIRIES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return SAMPLE_INQUIRIES;
    }
  },

  createInquiry(inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Inquiry {
    const inquiries = this.getInquiries();
    const newInquiry: Inquiry = {
      ...inquiryData,
      id: `INQ-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      status: 'unread'
    };
    inquiries.unshift(newInquiry);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    return newInquiry;
  },

  updateInquiryStatus(id: string, status: Inquiry['status']): void {
    const inquiries = this.getInquiries().map(i => i.id === id ? { ...i, status } : i);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  },

  // GALLERY
  getGallery(): GalleryItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.GALLERY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(INITIAL_GALLERY));
      return INITIAL_GALLERY;
    }
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.some((g: GalleryItem) => g.image && g.image.includes('unsplash.com'))) {
        localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(INITIAL_GALLERY));
        return INITIAL_GALLERY;
      }
      return parsed;
    } catch {
      return INITIAL_GALLERY;
    }
  },

  addGalleryItem(item: Omit<GalleryItem, 'id'>): GalleryItem {
    const gallery = this.getGallery();
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now().toString().slice(-4)}`
    };
    gallery.unshift(newItem);
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
    return newItem;
  },

  // REVIEWS
  getReviews(): Review[] {
    const raw = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
      return INITIAL_REVIEWS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_REVIEWS;
    }
  },

  addReview(review: Omit<Review, 'id' | 'date'>): Review {
    const reviews = this.getReviews();
    const newRev: Review = {
      ...review,
      id: `rev-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
    reviews.unshift(newRev);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    return newRev;
  },

  // CART
  getCart(): CartItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CART);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  saveCart(items: CartItem[]): void {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
  },

  // WISHLIST
  getWishlist(): string[] {
    const raw = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  saveWishlist(ids: string[]): void {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(ids));
  },

  // RESET
  resetToDefaults(): void {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(SAMPLE_INQUIRIES));
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(INITIAL_GALLERY));
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
  }
};
