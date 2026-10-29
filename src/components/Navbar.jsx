import React, { useState } from 'react';
import { SearchIcon, CartIcon, UserIcon, MenuIcon, CloseIcon } from './Icons';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

export function Navbar({ activePage, setActivePage, searchQuery, setSearchQuery, onSearchSubmit }) {
  const { totalItemsCount } = useCart();
  const { user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val && activePage !== 'products') {
      setActivePage('products');
    }
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (activePage !== 'products') {
      setActivePage('products');
    }
    if (onSearchSubmit) onSearchSubmit();
  };

  return (
    <header className="navbar-wrapper">
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="navbar-brand" onClick={() => handleNavClick('home')}>
          <div className="brand-logo-icon">S</div>
          <div className="brand-text">
            <span className="brand-name">ShopSphere</span>
            <span className="brand-tagline">Bug Hunt Arena</span>
          </div>
        </div>

        {/* Global Search Bar */}
        <form className="navbar-search" onSubmit={handleSearchSubmit} role="search">
          <div className="search-input-wrapper">
            <button
              type="submit"
              className="search-submit-btn"
              title="Filter catalog by search term"
              aria-label="Submit search"
            >
              <SearchIcon className="search-icon" size={17} />
            </button>
            <input
              type="text"
              placeholder="Search gadgets, audio, laptops..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => {
                if (searchQuery.trim() && activePage !== 'products') {
                  setActivePage('products');
                }
              }}
              className="search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <CloseIcon size={14} />
              </button>
            )}
          </div>
        </form>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav">
          <button
            className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          <button
            className={`nav-link ${activePage === 'products' ? 'active' : ''}`}
            onClick={() => handleNavClick('products')}
          >
            Explore Catalog
          </button>
          <button
            className={`nav-link ${activePage === 'contact' ? 'active' : ''}`}
            onClick={() => handleNavClick('contact')}
          >
            Support & Contact
          </button>
          <button
            className={`nav-link ${activePage === 'register' ? 'active' : ''}`}
            onClick={() => handleNavClick('register')}
          >
            Register
          </button>
        </nav>

        {/* Header Right Actions */}
        <div className="navbar-actions">
          {/* Cart Button */}
          <button
            className={`action-btn cart-btn ${activePage === 'cart' ? 'active' : ''}`}
            onClick={() => handleNavClick('cart')}
            aria-label="View Shopping Cart"
          >
            <CartIcon size={20} />
            <span className="cart-badge">{totalItemsCount}</span>
            <span className="cart-label">Cart</span>
          </button>

          {/* User Profile Badge */}
          {user ? (
            <button
              className={`user-profile-badge ${activePage === 'profile' ? 'active' : ''}`}
              onClick={() => handleNavClick('profile')}
              title={`Logged in as ${user.name}`}
            >
              <div className="user-avatar-circle">
                {user.avatarInitials || user.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="user-info-text">
                <span className="user-name">{user.name}</span>
                <span className="user-role">{user.role || 'Participant'}</span>
              </div>
            </button>
          ) : (
            <button
              className="btn btn-outline-sm"
              onClick={() => handleNavClick('register')}
            >
              <UserIcon size={16} /> Register
            </button>
          )}

          {/* Quick Register Action Button */}
          <button
            className={`btn btn-outline-sm nav-reg-btn ${activePage === 'register' ? 'active' : ''}`}
            onClick={() => handleNavClick('register')}
            title="Competitor Registration"
          >
            <UserIcon size={14} />
            <span>Join Arena</span>
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-dropdown-menu">
          <form className="mobile-search-bar" onSubmit={handleSearchSubmit}>
            <button type="submit" className="mobile-search-icon-btn" aria-label="Search">
              <SearchIcon className="search-icon" size={16} />
            </button>
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </form>
          <nav className="mobile-nav-links">
            <button
              className={`mobile-nav-item ${activePage === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              Home
            </button>
            <button
              className={`mobile-nav-item ${activePage === 'products' ? 'active' : ''}`}
              onClick={() => handleNavClick('products')}
            >
              Products Catalog
            </button>
            <button
              className={`mobile-nav-item ${activePage === 'cart' ? 'active' : ''}`}
              onClick={() => handleNavClick('cart')}
            >
              Cart ({totalItemsCount} items)
            </button>
            <button
              className={`mobile-nav-item ${activePage === 'contact' ? 'active' : ''}`}
              onClick={() => handleNavClick('contact')}
            >
              Contact Support
            </button>
            <button
              className={`mobile-nav-item ${activePage === 'profile' ? 'active' : ''}`}
              onClick={() => handleNavClick('profile')}
            >
              User Profile ({user ? user.name : 'Sign In'})
            </button>
            <button
              className={`mobile-nav-item ${activePage === 'register' ? 'active' : ''}`}
              onClick={() => handleNavClick('register')}
            >
              Register Participant
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
