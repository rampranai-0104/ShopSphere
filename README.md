# ShopSphere — Bug Hunt Arena

A modern, responsive e-commerce web application engineered specifically for the college **Bug Hunt Arena** competition.

Built with **React + Vite**, modern JavaScript, vanilla CSS, and synthetic local mock data. It has zero external dependencies, no remote API calls, no remote image CDNs, and works completely offline and locally.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the port indicated by Vite).

### 3. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 🎯 Competition Features

- **Storefront & Catalog**:
  - Hero banner with headline, live stats, and student tech callouts.
  - 12 synthetic high-tech products with local SVG vector graphics and realistic specs.
  - Category filters (Audio, Electronics, Wearables, Accessories).
  - Dynamic sorting by Price (Low/High), Rating, and Alphabetical.
  - Global search bar.
  - "Sync Live Inventory" with mock API caching.

- **Product Detail**:
  - Detailed product view, specifications table, stock indicator, and related products.
  - Interactive quantity selector (+ / -) with boundary enforcement.
  - DevTools Network telemetry probe integration.
  - Warranty coverage evaluation inspection.

- **Shopping Cart & Checkout**:
  - Interactive cart with quantity adjustment, item removal, and subtotal calculation.
  - Promotional coupon input section.
  - Collapsible QA Inspector for mathematical verification.
  - Campus guarantee fulfillment banner.

- **User Authentication & Profile**:
  - Competitor registration form with department selection and password confirmation.
  - Editable user profile with display name, email, phone, and delivery address.
  - Dynamic user avatar badge in navigation bar.

- **Inquiries & Support**:
  - Support ticket dispatch form with real-time submission logging in `localStorage`.

- **Bug Hunt Arena Tools**:
  - Sticky competition announcement header with quick "Copy Report Template" button.
  - Interactive Arena Guidelines modal with markdown template preview.

---


---

## 📋 Competition Documents

- **`ORGANIZER_ANSWER_KEY.md`**: Confidential organizer guide containing step-by-step reproduction instructions, root causes, evidence, and code fixes for all 12 bugs.
- **`BUG_REPORT_TEMPLATE.md`**: Official markdown template for participants to format and submit bug findings.

---

## 🛠 Tech Stack

- **Framework**: React 18
- **Bundler**: Vite 5
- **Styling**: Vanilla CSS (Custom Design System, CSS Variables, Glassmorphism)
- **State Management**: React Context (`CartContext`, `UserContext`, `ToastContext`) + `localStorage`
- **Assets**: Zero external network images — 100% procedurally generated local SVG data URIs
