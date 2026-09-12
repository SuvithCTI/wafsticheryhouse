import { Product, GalleryItem, Review } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // --- BRIDAL & DESIGNER BLOUSES ---
  {
    id: 'waf-b01',
    name: 'Grand Aari Hand-Embroidered Bridal Blouse',
    category: 'blouses',
    price: 5200,
    originalPrice: 6500,
    description: 'Signature bridal blouse masterfully crafted with authentic hand Aari needlework, antique gold zardozi, micro-pearls, and French bullion knots on pure mulberry silk. Designed for a royal wedding day look.',
    fabric: 'Pure Mulberry Silk',
    embroidery: 'Hand Aari & Antique Zardozi Work',
    image: '/images/products/waf-b01-aari-bridal.jpg',
    tags: ['Best Seller', 'Bridal Specialist', 'Hand Aari Work'],
    inStock: true,
    featured: true
  },
  {
    id: 'waf-b02',
    name: 'Peacock Maggam Embroidery Bottle Green Blouse',
    category: 'blouses',
    price: 4900,
    originalPrice: 5800,
    description: 'Intricate peacock and floral creeper motifs hand-stitched along the elbow sleeves and deep back cutout using dabka, cutdana, and shimmering green emerald stones.',
    fabric: 'Brocade & Silk Blend',
    embroidery: 'Heavy Maggam & Kundan Work',
    image: '/images/products/waf-b02-peacock-maggam.jpg',
    tags: ['Maggam Specialist', 'Peacock Motifs', 'Trending'],
    inStock: true,
    featured: true
  },
  {
    id: 'waf-b03',
    name: 'Cutwork Sleeve Artisan Wedding Blouse',
    category: 'blouses',
    price: 4400,
    originalPrice: 5200,
    description: 'Exquisite laser-cut lattice sleeves adorned with manual zardozi outlining and hanging bead tassels. Perfectly tailored to complement rich Kanjeevaram and Banarasi sarees.',
    fabric: 'Pure Raw Silk',
    embroidery: 'Cutwork Needlecraft & Zari Cord',
    image: '/images/products/waf-b03-cutwork-artisan.jpg',
    tags: ['Cutwork Sleeve', 'Wedding Saree Match'],
    inStock: true,
    featured: false
  },
  {
    id: 'waf-b04',
    name: 'Deep U Back with Handcrafted Latkans Blouse',
    category: 'blouses',
    price: 4600,
    originalPrice: 5400,
    description: 'Statement back silhouette featuring a sculpted deep-U curve with floral aari borders, gold dori, and custom handmade pom-pom latkans with crystal drop beads.',
    fabric: 'Matte Silk Tissue',
    embroidery: 'Beadwork & Gold Dori Latkans',
    image: '/images/products/waf-b04-deep-u-back.jpg',
    tags: ['Designer Back Cut', 'Custom Latkans'],
    inStock: true,
    featured: true
  },

  // --- CUSTOMISED DRESSES & GOWNS ---
  {
    id: 'waf-d01',
    name: 'Royal Crimson Velvet Reception Gown Dress',
    category: 'dresses',
    price: 12500,
    originalPrice: 15000,
    description: 'A bespoke floor-sweeping gown dress crafted in imperial micro-velvet. Features heavily embellished zardozi yoke, sheer embroidered full sleeves, and a 24-kali flared hem for bridal receptions.',
    fabric: 'Imperial Micro Velvet & Net',
    embroidery: 'Kora Dabka, Sequins & Zari',
    image: '/images/products/waf-d01-crimson-velvet-gown.jpg',
    tags: ['Customised Dress', 'Reception Gown', 'Bespoke Fit'],
    inStock: true,
    featured: true
  },
  {
    id: 'waf-d02',
    name: 'Pastel Organza Flared Anarkali Dress',
    category: 'dresses',
    price: 6800,
    originalPrice: 8200,
    description: 'Graceful layered anarkali dress in featherlight sheer organza, featuring intricate threadwork florets, scalloped hemline, and matching churidar. Fully lined with soft cotton santoon.',
    fabric: 'Pure Sheer Organza',
    embroidery: 'Resham Threadwork & Pearl Scallops',
    image: '/images/products/waf-d02-pastel-organza-anarkali.jpg',
    tags: ['Flared Anarkali', 'Customised Dress', 'Festive'],
    inStock: true,
    featured: true
  },
  {
    id: 'waf-d03',
    name: 'Festive Alia-Cut Floor Length Flared Dress',
    category: 'dresses',
    price: 5400,
    originalPrice: 6500,
    description: 'Trending Alia-cut silhouette with an empire waistline, embellished V-neckline, and high-volume georgette flare with gilded gota lace borders.',
    fabric: 'Georgette & Modal Silk',
    embroidery: 'Gota Patti & Metallic Zari',
    image: '/images/products/waf-d03-alia-cut-dress.jpg',
    tags: ['Alia Cut', 'Trending Silhouette', 'Custom Dress'],
    inStock: true,
    featured: false
  },
  {
    id: 'waf-d04',
    name: 'Mother-Daughter Matching Festive Combo Dress',
    category: 'dresses',
    price: 8900,
    originalPrice: 11000,
    description: 'Bespoke coordinated festive gown and frock combo designed for mother and daughter. Hand-stitched with matching brocade yoke and soft net flare.',
    fabric: 'Brocade & Soft Net',
    embroidery: 'Mirror Work & Brocade Detailing',
    image: '/images/products/waf-d04-mother-daughter-combo.jpg',
    tags: ['Combo Dress', 'Mother & Daughter', 'Special Order'],
    inStock: true,
    featured: true
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'Bridal Grandeur Aari Work Blouse',
    category: 'blouses',
    image: '/images/products/waf-b01-aari-bridal.jpg',
    description: 'Handcrafted bridal blouse with over 45 hours of meticulous artisan aari embroidery in KK Nagar, Madurai atelier.',
    details: ['Pure Mulberry Silk', 'Antique Gold Dabka', 'Padded Master Cut'],
    likes: 428
  },
  {
    id: 'gal-02',
    title: 'Custom Velvet Reception Gown Dress',
    category: 'bridal',
    image: '/images/products/waf-d01-crimson-velvet-gown.jpg',
    description: 'Bespoke tailored floor-length reception dress with heavy zardozi yoke and regal flare.',
    details: ['Imperial Velvet', 'Customised Dress', 'Perfect Fit'],
    likes: 389
  },
  {
    id: 'gal-03',
    title: 'Peacock Maggam Sleeve Detailing',
    category: 'craftsmanship',
    image: '/images/products/waf-b02-peacock-maggam.jpg',
    description: 'Sculptural elbow sleeve work with hand embroidery done at WAF Stitchery House atelier.',
    details: ['Micro Pearl Borders', 'Zari Threading', 'Elbow Cut'],
    likes: 512
  },
  {
    id: 'gal-04',
    title: 'Real Bride in WAF Custom Blouse',
    category: 'real_brides',
    image: '/images/products/waf-b03-cutwork-artisan.jpg',
    description: 'Real bride glowing on her muhurtham morning wearing a custom fitted bridal blouse from Madurai.',
    details: ['Real Bride', 'Kanjeevaram Match', 'First-Fit Flawless'],
    likes: 647
  },
  {
    id: 'gal-05',
    title: 'Flared Organza Customised Dress',
    category: 'craftsmanship',
    image: '/images/products/waf-d02-pastel-organza-anarkali.jpg',
    description: 'Delicate scalloped hems and floral embroidery on soft organza dress.',
    details: ['Customised Dress', 'Featherlight Feel', 'Fine Gota Work'],
    likes: 334
  },
  {
    id: 'gal-06',
    title: 'Cutout Back with Tassel Latkans',
    category: 'blouses',
    image: '/images/products/waf-b04-deep-u-back.jpg',
    description: 'Signature teardrop back design with handcrafted hanging latkans and dori ties.',
    details: ['Teardrop Keyhole', 'Artisan Latkans', 'Deep U Neck'],
    likes: 415
  },
  {
    id: 'gal-07',
    title: 'Festive Alia-Cut Flared Silhouette',
    category: 'craftsmanship',
    image: '/images/products/waf-d03-alia-cut-dress.jpg',
    description: 'Empire waistline with high-volume flare and gilded gota lace detailing.',
    details: ['Alia Cut', 'Modal Silk', 'Festive Flair'],
    likes: 367
  },
  {
    id: 'gal-08',
    title: 'Mother & Daughter Festive Twinning',
    category: 'real_brides',
    image: '/images/products/waf-d04-mother-daughter-combo.jpg',
    description: 'Bespoke coordinated festive gown and frock combo designed for mother and daughter.',
    details: ['Mother & Daughter', 'Matching Ensembles', 'Pure Celebration'],
    likes: 582
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    name: 'Priyanka Sundaram (Madurai)',
    rating: 5,
    date: 'February 2026',
    occasion: 'Bridal Muhurtham Blouse',
    comment: 'WAF Stitchery House made my wedding blouse dreams come true! The fitting was 100% on point on the very first try. The intricate aari and maggam handwork received endless compliments. Definitely the best bridal tailoring in Madurai!',
    verified: true
  },
  {
    id: 'rev-02',
    name: 'Deepika R.',
    rating: 5,
    date: 'January 2026',
    occasion: 'Customised Reception Gown',
    comment: 'I sent my reference sketch and measurements on WhatsApp to 8807674672, and the team tailored the dress even better than my reference picture. The finish and padding are like a high-end designer label.',
    verified: true
  },
  {
    id: 'rev-03',
    name: 'Kavita Menon',
    rating: 5,
    date: 'December 2025',
    occasion: 'Bridal Sangeet Dress',
    comment: 'Their customised dress stitching and neckline styling are phenomenal. The fabric quality and embroidery detail are exquisite. Now my go-to boutique in KK Nagar for every family celebration!',
    verified: true
  },
  {
    id: 'rev-04',
    name: 'Nivetha K.',
    rating: 5,
    date: 'November 2025',
    occasion: 'Engagement Blouse & Dress',
    comment: 'Prompt delivery and wonderful customer service. Both phone numbers 8807674672 and 7338895733 were super responsive on WhatsApp. Thank you WAF Stitchery House team!',
    verified: true
  }
];

export const BRAND_CONFIG = {
  name: 'WAF Stitchery House',
  tagline: 'Specialised in Bridal Blouses & Customised Dresses',
  instagram: 'https://www.instagram.com/waf_stitcheryhouse?stkn=MTVqY3oyeGJndWd2MQ==',
  instagramHandle: '@waf_stitcheryhouse',
  whatsappNumber: '918807674672',
  whatsappDisplay: '+91 88076 74672 / +91 73388 95733',
  phone1: '8807674672',
  phone2: '7338895733',
  email: 'wafstitcheryhouse@gmail.com',
  address: 'KK Nagar, Madurai, Tamil Nadu (Near Valluvar Colony)',
  city: 'Madurai',
  openingHours: 'Mon - Sat: 10:00 AM - 9:00 PM (Sun by Appointment)'
};
