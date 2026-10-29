import React from 'react';
import { ArrowRightIcon, TruckIcon, ShieldCheckIcon, StarIcon, BugIcon } from '../components/Icons';
import { ProductCard } from '../components/ProductCard';

export function HomePage({ products, onViewDetails, onExploreCatalog, onFilterCategory, onNavigateToRegister }) {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="live-dot"></span>
            <span>Bug Hunt Arena — Official Benchmark Storefront</span>
          </div>
          <h1 className="hero-title">
            Engineering Precision <br />
            <span className="text-gradient">Meets Modern Tech.</span>
          </h1>
          <p className="hero-description">
            Explore curated high-performance electronics, acoustic audio gear, and minimalist daily carry. Built specifically for students, creators, and security researchers.
          </p>
          <div className="hero-cta-group">
            <button
              className="btn btn-primary-gradient btn-lg"
              onClick={onExploreCatalog}
            >
              <span>Explore All Products</span>
              <ArrowRightIcon size={18} />
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={onNavigateToRegister}
            >
              <span>Register for Arena</span>
            </button>
            <button
              className="btn btn-glass btn-lg"
              onClick={() => onFilterCategory('Audio')}
            >
              Browse Audio Gear
            </button>
          </div>

          <div className="hero-metrics">
            <div className="metric-item">
              <span className="metric-number">12+</span>
              <span className="metric-label">Target Bugs</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-number">100%</span>
              <span className="metric-label">Local & Private</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-number">4.8★</span>
              <span className="metric-label">Average Rating</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card-showcase">
            <div className="hero-floating-badge">
              <StarIcon size={16} />
              <span>Best-in-Class Student Tech</span>
            </div>
            {featuredProducts[0] && (
              <ProductCard
                product={featuredProducts[0]}
                onViewDetails={onViewDetails}
              />
            )}
          </div>
        </div>
      </section>

      {/* Feature Highlights Strip */}
      <section className="value-props-section">
        <div className="value-prop-card">
          <div className="value-prop-icon">
            <TruckIcon size={24} />
          </div>
          <div className="value-prop-text">
            <h4>Free Campus Dispatch</h4>
            <p>Complimentary delivery on all orders over $100</p>
          </div>
        </div>

        <div className="value-prop-card">
          <div className="value-prop-icon">
            <ShieldCheckIcon size={24} />
          </div>
          <div className="value-prop-text">
            <h4>Standard 30-Day Guarantee</h4>
            <p>Hassle-free hardware replacement on all verified items</p>
          </div>
        </div>

        <div className="value-prop-card">
          <div className="value-prop-icon">
            <BugIcon size={24} />
          </div>
          <div className="value-prop-text">
            <h4>Bug Hunt Sandbox</h4>
            <p>12 targeted defects for software QA competition</p>
          </div>
        </div>
      </section>

      {/* Featured Products Collection */}
      <section className="section-container">
        <div className="section-header">
          <div>
            <span className="section-eyebrow">Handpicked Selection</span>
            <h2 className="section-title">Featured Innovations</h2>
          </div>
          <button
            className="btn btn-outline-sm"
            onClick={onExploreCatalog}
          >
            <span>View All ({products.length})</span>
            <ArrowRightIcon size={14} />
          </button>
        </div>

        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </section>

      {/* Category Explorer Callouts */}
      <section className="section-container category-banner-section">
        <div className="category-promo-card audio-promo">
          <div className="promo-content">
            <span className="promo-tag">Acoustics</span>
            <h3>Studio Precision Audio</h3>
            <p>Lossless wireless playback and ultra-low latency drivers.</p>
            <button
              className="btn btn-sm btn-glass"
              onClick={() => onFilterCategory('Audio')}
            >
              Discover Audio
            </button>
          </div>
        </div>

        <div className="category-promo-card wearables-promo">
          <div className="promo-content">
            <span className="promo-tag">Biometrics</span>
            <h3>Next-Gen Smart Wearables</h3>
            <p>Track physiological stats and continuous heart rate.</p>
            <button
              className="btn btn-sm btn-glass"
              onClick={() => onFilterCategory('Wearables')}
            >
              Explore Wearables
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
