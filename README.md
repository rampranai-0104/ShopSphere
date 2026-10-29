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

## 🐛 Intentional Defect Architecture (BUG-01 to BUG-12)

ShopSphere contains exactly **12 intentional, deterministic bugs** distributed across the user journey:

1. **BUG-01**: Non-functional button (Cart page coupon "Apply" button).
2. **BUG-02**: Incorrect search (Case-sensitive product title comparison).
3. **BUG-03**: Broken category filter ("Audio" category pill returns 0 products).
4. **BUG-04**: Incorrect cart subtotal (Subtotal reducer ignores item quantity).
5. **BUG-05**: Missing registration validation (Registration form omits password length and confirmation checks).
6. **BUG-06**: Duplicate contact submission (Support form lacks debounce and submit button lock).
7. **BUG-07**: Success feedback on validation failure (Profile form shows green success toast alongside red validation errors).
8. **BUG-08**: Stale localStorage UI state (Profile update writes to storage but fails to update React context).
9. **BUG-09**: Reproducibly stale mock product cache (Cache check ignores `forceRefresh` parameter).
10. **BUG-10**: Incorrect local mock API endpoint (Misspelled URL `/api/v1/produts/stock-status` yields HTTP 404 in DevTools Network tab).
11. **BUG-11**: Reproducible uncaught JavaScript error (Clicking warranty inspection on accessory items throws `TypeError: Cannot read properties of undefined`).
12. **BUG-12**: Reproducible mobile layout failure (Hardcoded 880px width on fulfillment banner creates horizontal overflow on mobile viewports < 768px).

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
