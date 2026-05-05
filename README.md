# Activewear Pro - Premium E-Commerce Platform

A luxury, user-friendly e-commerce website for Activewear Pro, Myanmar's leading activewear brand. Built with React, TypeScript, Express, and SQLite.

## 🎯 Project Overview

**Activewear Pro** is a full-stack e-commerce platform designed to help penetrate the Myanmar activewear market deeply and increase sales. The platform features:

### 🌟 Key Features

- **Product Catalog** - Browse and search premium activewear with detailed product information
- **Shopping Cart** - Add/remove items with real-time cart updates
- **Secure Checkout** - Multi-step checkout with shipping and payment options
- **Order Management** - Track orders in real-time with delivery status updates
- **User Accounts** - Create accounts, manage profiles, and view order history
- **Inventory Management** - Real-time stock tracking and availability
- **Payment Integration** - Support for Cash on Delivery, Bank Transfer, and Credit/Debit Cards
- **Responsive Design** - Fully mobile-friendly luxury interface
- **Contact & Support** - Direct contact channels and FAQ section

### 🎨 Design Philosophy

**Modern Athletic Minimalism** - A classy, luxury aesthetic with:
- Deep slate blue (#1e3a5f) primary color for trust and professionalism
- Vibrant orange (#ff6b35) accent for energy and transformation
- Playfair Display serif font for elegant headings
- Clean, asymmetric layouts with generous whitespace
- Premium feel suitable for high-end market positioning

## 📊 Business Information

- **Business Name**: Activewear Pro
- **Location**: Yangon, Myanmar
- **Current Followers**: 34,000+ (Facebook)
- **Satisfaction Rate**: 100%
- **Phone**: +95 9 123 456 789
- **Email**: info@activewearpro.com
- **Facebook**: https://www.facebook.com/activewearpro2020

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/pnpm
- SQLite3

### Installation

1. **Clone the repository**
```bash
cd activewear_pro
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Initialize database**
```bash
npm run db:init
```

5. **Start development server**
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 📁 Project Structure

```
activewear_pro/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── App.tsx        # Main app component
│   │   ├── main.tsx       # Entry point
│   │   └── index.css      # Global styles
│   └── index.html         # HTML template
├── server/                # Backend Express server
│   ├── db/               # Database initialization
│   └── index.ts          # Server entry point
├── data/                 # SQLite database
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── vite.config.ts        # Vite config
└── tailwind.config.js    # Tailwind CSS config
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start both frontend and backend

# Production
npm run build            # Build for production
npm start                # Start production server

# Database
npm run db:init          # Initialize database with tables
npm run db:seed          # Seed sample data (optional)
```

## 💾 Database Schema

### Tables
- **users** - User accounts and profiles
- **products** - Product catalog with inventory
- **cart_items** - Shopping cart items
- **orders** - Order records and status
- **order_status_history** - Order tracking timeline
- **reviews** - Product reviews and ratings
- **wishlist** - User wishlists
- **coupons** - Discount codes
- **contact_messages** - Contact form submissions

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT authentication tokens
- SSL/TLS encryption for payments
- CORS protection
- SQL injection prevention with parameterized queries
- Secure session management

## 💳 Payment Methods

1. **Cash on Delivery (COD)** - Pay upon delivery
2. **Bank Transfer** - Direct bank account transfer
3. **Credit/Debit Card** - Stripe integration ready

## 📦 Shipping Options

- **Standard Delivery**: 3-5 business days (₭5,000)
- **Express Delivery**: 1-2 business days (₭15,000)
- **Free Shipping**: On orders over ₭100,000

## 🎯 Mission & Vision

### Mission
To empower every individual in Myanmar to achieve their fitness goals by providing premium, affordable, and stylish activewear that inspires confidence and performance.

### Vision
To become Myanmar's most trusted and beloved activewear brand, recognized for exceptional quality, innovative design, and outstanding customer service.

### Core Values
- **Quality** - Premium materials and craftsmanship
- **Customer Care** - Your satisfaction is our priority
- **Innovation** - Constantly improving our products
- **Integrity** - Honest and ethical business practices

## 📞 Customer Support

- **Phone**: +95 9 123 456 789 (9 AM - 6 PM Myanmar Time)
- **Email**: info@activewearpro.com (Response within 24 hours)
- **Address**: Yangon, Myanmar
- **Facebook**: https://www.facebook.com/activewearpro2020

## 🔄 Return & Exchange Policy

- 30-day return policy on all items
- Items must be in original condition
- Free returns on defective products
- Easy exchange process

## 📈 Future Enhancements

- [ ] Mobile app (iOS/Android)
- [ ] Advanced analytics dashboard
- [ ] AI-powered product recommendations
- [ ] Live chat support
- [ ] Video product demonstrations
- [ ] Size recommendation engine
- [ ] Loyalty rewards program
- [ ] International shipping

## 📄 License

This project is proprietary to Activewear Pro.

## 👥 Support

For technical support or inquiries, please contact:
- Email: info@activewearpro.com
- Phone: +95 9 123 456 789
- Facebook: https://www.facebook.com/activewearpro2020

---

**Built with ❤️ for Activewear Pro**
*Elevating Myanmar's Activewear Market*
