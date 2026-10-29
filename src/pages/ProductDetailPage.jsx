import React, { useState, useEffect } from 'react';
import { StarIcon, CartIcon, ArrowRightIcon, ShieldCheckIcon, TruckIcon } from '../components/Icons';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { fetchLiveWarehouseTelemetry } from '../services/mockApi';

export function ProductDetailPage({ product, allProducts, onBackToCatalog, onViewDetails }) {
  const [quantity, setQuantity] = useState(1);
  const [telemetryResult, setTelemetryResult] = useState(null);
  const [checkingTelemetry, setCheckingTelemetry] = useState(false);
  const { addToCart } = useCart();
  const { addToast } = useToast();

  /**
   * BUG-10 INTENTIONAL BUG:
   * Automatically executes a fetch to an incorrect mock endpoint
   * (/api/v1/produts/stock-status with typo 'produts') on component mount.
   * Visible in Chrome/Firefox DevTools Network Tab with HTTP 404 status.
   */
  useEffect(() => {
    if (product) {
      setCheckingTelemetry(true);
      fetchLiveWarehouseTelemetry(product.id).then((res) => {
        setTelemetryResult(res);
        setCheckingTelemetry(false);
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="product-detail-empty">
        <h2>Product not found</h2>
        <button onClick={onBackToCatalog} className="btn btn-primary">
          Back to Catalog
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    addToast(`Added ${quantity} × "${product.name}" to your cart`, 'success');
  };

  /**
   * BUG-11 INTENTIONAL BUG:
   * Clicking "Verify Warranty Coverage" will trigger an uncaught JavaScript error
   * on products where `product.specs.warranty` is undefined (such as prod-005 Carabiner or prod-008 Flask).
   * Throws `TypeError: Cannot read properties of undefined (reading 'durationMonths')` in console.
   */
  const handleVerifyWarranty = () => {
    // BUG-11: No null/undefined check or optional chaining before accessing .durationMonths!
    const months = product.specs.warranty.durationMonths.toFixed(0);
    addToast(`Warranty verified: ${months} months full manufacturer care`, 'info');
  };

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="product-detail-page">
      {/* Breadcrumb Navigation */}
      <nav className="detail-breadcrumb">
        <button onClick={onBackToCatalog} className="breadcrumb-link">
          ← Back to Catalog
        </button>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-category">{product.category}</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{product.name}</span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="detail-grid">
        {/* Left: Product Image & Badges */}
        <div className="detail-visual-col">
          <div className="detail-image-card">
            <img
              src={product.image}
              alt={product.name}
              className="detail-large-image"
            />
            {product.badge && <span className="detail-badge">{product.badge}</span>}
          </div>

          {/* Bug 10 Network diagnostic telemetry indicator */}
          <div className="telemetry-probe-card">
            <div className="telemetry-probe-header">
              <span className="telemetry-indicator-dot"></span>
              <strong>Live Warehouse Telemetry (DevTools Network Probe)</strong>
            </div>
            <p className="telemetry-probe-desc">
              Pinging live inventory endpoint:{' '}
              <code>/api/v1/produts/stock-status?item_id={product.id}</code>
            </p>
            <div className="telemetry-status-tag">
              {checkingTelemetry ? (
                'Probing live endpoint...'
              ) : telemetryResult && !telemetryResult.success ? (
                <span className="status-err">
                  Failed: Status {telemetryResult.status || 404} (Visible in DevTools Network tab)
                </span>
              ) : (
                <span className="status-ok">Connected</span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Info, Price, Actions, Specs */}
        <div className="detail-info-col">
          <div className="detail-category-tag">{product.category}</div>
          <h1 className="detail-title">{product.name}</h1>

          {/* Ratings & Stock */}
          <div className="detail-meta-row">
            <div className="rating-pill">
              <StarIcon size={16} />
              <span className="rating-bold">{product.rating}</span>
              <span className="rating-sub">({product.reviewsCount} verified reviews)</span>
            </div>
            <div className="stock-pill">
              <span className="stock-dot"></span>
              <span>{product.stock} units available in campus warehouse</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="detail-price-box">
            <span className="detail-current-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="detail-original-price">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="detail-savings-pill">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </>
            )}
          </div>

          <p className="detail-description">{product.description}</p>

          {/* Action Row: Quantity + Add to Cart */}
          <div className="detail-actions-row">
            <div className="quantity-selector">
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="qty-input"
                aria-label="Selected quantity"
              />
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="btn btn-primary-gradient btn-lg add-to-cart-cta"
            >
              <CartIcon size={20} />
              <span>Add to Shopping Cart</span>
            </button>
          </div>

          {/* Warranty Inspection Action (Triggers BUG-11 on accessories) */}
          <div className="warranty-action-box">
            <button
              type="button"
              onClick={handleVerifyWarranty}
              className="btn btn-outline-sm btn-warranty"
              title="Verify active warranty coverage period"
            >
              <ShieldCheckIcon size={16} />
              <span>Verify Warranty Coverage (Inspect Specs)</span>
            </button>
            <span className="warranty-hint">
              Click to evaluate manufacturer warranty terms in console.
            </span>
          </div>

          {/* Specifications Table */}
          <div className="detail-specs-section">
            <h3 className="specs-title">Technical Specifications</h3>
            <div className="specs-table">
              {Object.entries(product.specs || {}).map(([key, val]) => {
                if (typeof val === 'object' && val !== null) {
                  return Object.entries(val).map(([subK, subV]) => (
                    <div key={`${key}-${subK}`} className="specs-row">
                      <span className="specs-key">{key} ({subK})</span>
                      <span className="specs-val">{String(subV)}</span>
                    </div>
                  ));
                }
                return (
                  <div key={key} className="specs-row">
                    <span className="specs-key">{key}</span>
                    <span className="specs-val">{String(val)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <h3 className="section-title">Similar Items in {product.category}</h3>
          <div className="related-grid">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="related-card"
                onClick={() => onViewDetails(rel.id)}
              >
                <img src={rel.image} alt={rel.name} />
                <div className="related-body">
                  <h4>{rel.name}</h4>
                  <span className="related-price">${rel.price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
