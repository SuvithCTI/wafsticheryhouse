# WAF Stitchery House - Haute Couture & Bespoke Tailoring Platform

A luxury, interactive 3D digital platform for **WAF Stitchery House** ([@waf_stitcheryhouse on Instagram](https://www.instagram.com/waf_stitcheryhouse?stkn=MTVqY3oyeGJndWd2MQ==)).

Specializing in handcrafted bridal blouses, royal Aari and Maggam embroidery, festive kurtis, and made-to-measure tailoring.

---

## 🌟 Key Features

### 1. Interactive 3D Haute-Couture Runway (Three.js)
- **3D Mannequin with Real-Time Silk Ripple**: Procedural cloth wave animation simulating luxury silk and velvet drapes.
- **Dynamic Swirling Golden Thread**: Metallic tube helix spiraling with floating gold dust particles.
- **Real-Time Fabric & Color Switcher**: Toggle between *Bridal Crimson Silk, Royal Peacock Emerald, Gilded Zari Brocade, Midnight Sapphire Velvet, and Blush Organza*.
- **Atelier Lighting Presets**: Switch between *Runway Spotlight, Golden Hour Glow, and Midnight Glamour*.
- **360° Mouse & Touch Orbit Controls**: Drag to view from any angle.

### 2. 3D Bespoke Customizer & Stitching Studio
- **Dynamic 3D Visualizer**: Live updates garment silhouette, sleeve styles, necklines, and fabrics in 3D.
- **Custom Silhouette Builder**:
  - **Garment Type**: Bridal Blouse, Festive Kurti, Lehenga Choli, Salwar Suit.
  - **Neckline**: Sweetheart, Royal Boat Neck, Deep V Embroidered, High Collar Potli, Scalloped Princess Cut.
  - **Sleeves**: Elbow Cutwork Maggam, Sheer Full Organza, Regal Puff, Cold Shoulder, Sleeveless.
  - **Back Patterns**: Deep U with Latkans, Teardrop Keyhole, Sheer Net Maggam, Criss-Cross Dori.
  - **Fabrics**: Pure Raw Silk, Imperial Velvet, Banarasi Brocade, Pure Sheer Organza, or Courier Your Own.
- **Made-to-Measure Inputs**: Bust, waist, shoulder, sleeve length, blouse length with integrated size guide.
- **Reference Image Upload**: Upload client sketches or inspiration photos.
- **Live Price Estimator**: Real-time breakdown with standard vs express turnaround.
- **1-Click WhatsApp Order Direct**: Generates formatted order specifications ready to send directly to WhatsApp.

### 3. Boutique Catalog / Shop
- Filter by categories: *All, Designer Blouses, Festive Kurtis, Bridal Couture, Custom Stitching*.
- Search bar, fabric filter, price sorting.
- **3D Card Hover Tilt**: Subtle 3D depth and parallax on card hover.
- **Quick View Modal**: High-res angle inspection, size selection, WhatsApp order button.

### 4. Haute Lookbook Gallery
- Curated high-fashion lookbook: *Bridal Grandeur, Designer Blouses, Atelier Craftsmanship, Real Brides*.
- Interactive lightbox with craftsmanship details and like counter.
- Direct Instagram link to `@waf_stitcheryhouse`.

### 5. About Us & Craftsmanship
- The story and heritage of WAF Stitchery House.
- Master cutters, Aari & Zardozi needlework traditions, and 100% fit guarantees.

### 6. Contact & Consultation Booking
- Interactive appointment booking for in-person atelier fitting or virtual video consultation.
- Direct WhatsApp chat link, phone, email, working hours, and boutique location.

### 7. Admin Dashboard
- **Custom Stitching Orders Tracker**: View measurements, customer reference photos, and update status pipeline (*New Request ➔ Fabric Sourced ➔ In Stitching ➔ Quality Check ➔ Ready ➔ Dispatched*).
- **Catalog Product Manager**: Add new designs with price, photos, and fabric specifications; delete or edit products.
- **Inquiry Manager**: Track client inquiries and preferred contact mode.
- **Standalone Mode**: Built to run completely without any external database out-of-the-box using local storage persistence.

---

## 🗄️ Database Setup (When you add MySQL later)

A complete MySQL schema file (`schema.sql`) is included in the root directory.

### Quick MySQL Import:
```bash
# 1. Create the database
mysql -u root -p -e "CREATE DATABASE waf_stitchery_db;"

# 2. Import tables
mysql -u root -p waf_stitchery_db < schema.sql
```

Tables included:
- `products`
- `custom_stitching_orders`
- `inquiries`
- `gallery_items`
- `reviews`

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies (if not already done)
npm install

# 2. Start development server
npm run dev

# 3. Open in browser:
http://localhost:5173
```

---

## 🛠️ Technology Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Glassmorphism, Luxury Gold Palettes
- **3D & Animations**: Three.js, Framer Motion, Canvas Confetti
- **Icons**: Lucide React
- **Instagram**: [@waf_stitcheryhouse](https://www.instagram.com/waf_stitcheryhouse?stkn=MTVqY3oyeGJndWd2MQ==)
