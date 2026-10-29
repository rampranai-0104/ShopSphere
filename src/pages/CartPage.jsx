import React, { useState } from 'react';
import { TrashIcon, ShieldCheckIcon, ArrowRightIcon } from '../components/Icons';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export function CartPage({ onContinueShopping, onProceedToCheckout }) {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    accurateSubtotal,
    shipping,
    estimatedTax,
    grandTotal
  } = useCart();
  const { addToast } = useToast();
  const [couponCode, setCouponCode] = useState('');
  const [showQaInspector, setShowQaInspector] = useState(false);

  /**
   * BUG-01 INTENTIONAL BUG:
   * Non-functional button defect:
   * The "Apply" promo code button has an empty handler or does nothing.
   * Clicking it does not validate the coupon, apply discounts, or update cart state.
   */
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    // BUG-01: Empty no-op function!
    // No state update, no discount applied, no toast or feedback.
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page-empty">
        <div className="empty-cart-graphic">🛒</div>
        <h2>Your Shopping Cart is Empty</h2>
        <p>Explore our premium tech gear catalog and add items to your cart.</p>
        <button onClick={onContinueShopping} className="btn btn-primary btn-lg">
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <div className="cart-header">
        <h1 className="cart-title">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="btn btn-outline-danger btn-sm"
          title="Clear all items in cart"
        >
          <TrashIcon size={14} />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="cart-layout-grid">
        {/* Left Column: Cart Items List */}
        <div className="cart-items-column">
          <div className="cart-table-card">
            <div className="cart-table-header">
              <span className="col-product">Product</span>
              <span className="col-price">Unit Price</span>
              <span className="col-qty">Quantity</span>
              <span className="col-total">Line Total</span>
              <span className="col-action"></span>
            </div>

            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <div className="cart-item-product">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="cart-item-thumb" />
                    )}
                    <div>
                      <h4 className="cart-item-name">{item.name}</h4>
                      <span className="cart-item-cat">{item.category}</span>
                    </div>
                  </div>

                  <div className="cart-item-unit-price">
                    ${Number(item.price).toFixed(2)}
                  </div>

                  <div className="cart-item-qty-controls">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-item-line-total">
                    ${(Number(item.price) * item.quantity).toFixed(2)}
                  </div>

                  <div className="cart-item-delete">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="btn-delete"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <TrashIcon size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Coupon */}
        <div className="cart-summary-column">
          <div className="order-summary-card">
            <h3 className="summary-title">Order Summary</h3>

            {/* Promo Code Input - BUG-01 non functional button */}
            <div className="promo-code-box">
              <label htmlFor="promo-input" className="promo-label">
                Promotional Code
              </label>
              <div className="promo-input-group">
                <input
                  id="promo-input"
                  type="text"
                  placeholder="e.g. SPRINT20"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="promo-input"
                />
                {/* BUG-01: Non-functional button */}
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="btn btn-primary btn-apply-coupon"
                  title="Apply coupon code"
                >
                  Apply
                </button>
              </div>
              <span className="promo-helper-text">
                Try code <code>BUGHUNT2024</code> for 20% discount.
              </span>
            </div>

            <div className="summary-calculations">
              {/* BUG-04: Subtotal is calculated incorrectly by summing prices without quantity! */}
              <div className="calc-row">
                <span className="calc-label">Subtotal</span>
                <span className="calc-value">${subtotal.toFixed(2)}</span>
              </div>

              <div className="calc-row">
                <span className="calc-label">Estimated Shipping</span>
                <span className="calc-value">
                  {shipping === 0 ? <span className="free-text">FREE</span> : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="calc-row">
                <span className="calc-label">Estimated Campus Tax (8%)</span>
                <span className="calc-value">${estimatedTax.toFixed(2)}</span>
              </div>

              <div className="calc-divider"></div>

              <div className="calc-row total-row">
                <span className="total-label">Total Amount</span>
                <span className="total-value">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                addToast('Proceeding to order fulfillment...', 'info');
                if (onProceedToCheckout) onProceedToCheckout();
              }}
              className="btn btn-primary-gradient btn-lg btn-block checkout-btn"
            >
              <span>Proceed to Checkout</span>
              <ArrowRightIcon size={18} />
            </button>

            {/* QA Benchmark toggle for participants/organizers */}
            <div className="qa-benchmark-accordion">
              <button
                type="button"
                className="qa-toggle-btn"
                onClick={() => setShowQaInspector(!showQaInspector)}
              >
                <span>{showQaInspector ? '▼ Hide QA Inspector' : '▶ QA Inspector: Math Verification'}</span>
              </button>
              {showQaInspector && (
                <div className="qa-math-breakdown">
                  <p>
                    <strong>Cart Subtotal Audit:</strong>
                  </p>
                  <div>Reported Subtotal: <code>${subtotal.toFixed(2)}</code></div>
                  <div>Accurate Mathematical Subtotal: <code>${accurateSubtotal.toFixed(2)}</code></div>
                  <small style={{ color: 'var(--text-muted)' }}>
                    (Check if multiple quantities are correctly calculated in the subtotal reducer)
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 
        BUG-12 INTENTIONAL BUG:
        Mobile layout failure:
        This fulfillment strip has fixed CSS `min-width: 880px; width: 880px;`.
        On mobile screens (< 768px), it breaches viewport boundaries, creating horizontal overflow.
        Positioned below the grid on desktop to ensure zero overlap with the order summary.
      */}
      <div className="cart-fulfillment-strip">
        <div className="strip-item">
          <ShieldCheckIcon size={20} />
          <span>Campus Vault Verified Hardware Protection</span>
        </div>
        <div className="strip-divider">•</div>
        <div className="strip-item">
          <span>Next-Day Campus Lockers Delivery Available</span>
        </div>
        <div className="strip-divider">•</div>
        <div className="strip-item">
          <span>Student ID Cashback Guarantee Applied at Checkout</span>
        </div>
      </div>
    </div>
  );
}
