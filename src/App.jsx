import React, { useState, useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { CompetitionBanner } from './components/CompetitionBanner';
import { HomePage } from './pages/HomePage';
import { ProductListPage } from './pages/ProductListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { RegisterPage } from './pages/RegisterPage';
import { ContactPage } from './pages/ContactPage';
import { ProfilePage } from './pages/ProfilePage';
import { getProducts } from './services/mockApi';

export function AppContent() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Load products on initial mount
  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res.products);
      setLoading(false);
    });
  }, []);

  // Handle browser URL hash changes for easy navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      if (hash.startsWith('product/')) {
        const prodId = hash.replace('product/', '');
        setSelectedProductId(prodId);
        setActivePage('product-detail');
      } else if (['home', 'products', 'cart', 'profile', 'register', 'contact'].includes(hash)) {
        setActivePage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page, productId = null) => {
    if (page === 'product-detail' && productId) {
      setSelectedProductId(productId);
      setActivePage('product-detail');
      window.location.hash = `product/${productId}`;
    } else {
      setActivePage(page);
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentProduct = products.find((p) => p.id === selectedProductId) || products[0];

  return (
    <div className="app-layout">
      {/* Top Competition Banner with copyable bug template */}
      <CompetitionBanner />

      {/* Main Navigation Bar */}
      <Navbar
        activePage={activePage}
        setActivePage={navigateTo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={() => {
          setSelectedCategory('All');
          navigateTo('products');
        }}
      />

      {/* Main Content Area */}
      <main className="main-viewport">
        {loading ? (
          <div className="app-loading-state">
            <div className="spinner"></div>
            <p>Loading ShopSphere catalog...</p>
          </div>
        ) : (
          <>
            {activePage === 'home' && (
              <HomePage
                products={products}
                onViewDetails={(id) => navigateTo('product-detail', id)}
                onExploreCatalog={() => navigateTo('products')}
                onNavigateToRegister={() => navigateTo('register')}
                onFilterCategory={(cat) => {
                  setSelectedCategory(cat);
                  navigateTo('products');
                }}
              />
            )}

            {activePage === 'products' && (
              <ProductListPage
                products={products}
                setProducts={setProducts}
                onViewDetails={(id) => navigateTo('product-detail', id)}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            )}

            {activePage === 'product-detail' && (
              <ProductDetailPage
                product={currentProduct}
                allProducts={products}
                onBackToCatalog={() => navigateTo('products')}
                onViewDetails={(id) => navigateTo('product-detail', id)}
              />
            )}

            {activePage === 'cart' && (
              <CartPage
                onContinueShopping={() => navigateTo('products')}
                onProceedToCheckout={() => navigateTo('profile')}
              />
            )}

            {activePage === 'register' && (
              <RegisterPage
                onRegistrationSuccess={() => navigateTo('profile')}
              />
            )}

            {activePage === 'contact' && <ContactPage />}

            {activePage === 'profile' && (
              <ProfilePage onNavigateToRegister={() => navigateTo('register')} />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-container">
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <span className="brand-logo-icon">S</span>
              <span className="footer-brand-name">ShopSphere</span>
            </div>
            <p className="footer-desc">
              Campus Bug Hunt Arena benchmark storefront. Engineered for testing, bug identification, and security QA auditing.
            </p>
            <div className="footer-badge">Target Spec: BUG-01 to BUG-12</div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links">
              <li><button onClick={() => navigateTo('home')}>Home</button></li>
              <li><button onClick={() => navigateTo('products')}>Catalog</button></li>
              <li><button onClick={() => navigateTo('cart')}>Cart</button></li>
              <li><button onClick={() => navigateTo('profile')}>Profile</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Arena Resources</h4>
            <ul className="footer-links">
              <li><button onClick={() => navigateTo('contact')}>Support & Reporting</button></li>
              <li><button onClick={() => navigateTo('register')}>Registration</button></li>
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Bug Report Template
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">System Notice</h4>
            <p className="footer-tech-note">
              Runs locally with zero external network dependencies, local SVG assets, and synthetic data.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024–2026 ShopSphere Bug Hunt Arena. Built for College Engineering Sprint.</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <UserProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </UserProvider>
    </ToastProvider>
  );
}
