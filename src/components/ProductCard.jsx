import React from 'react';
import { StarIcon, CartIcon } from './Icons';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export function ProductCard({ product, onViewDetails }) {
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    addToast(`Added "${product.name}" to cart`, 'success');
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="product-card"
      onClick={() => onViewDetails(product.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onViewDetails(product.id)}
    >
      <div className="product-card-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
          loading="lazy"
        />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        {discountPercent > 0 && (
          <span className="product-discount-badge">-{discountPercent}%</span>
        )}
      </div>

      <div className="product-card-body">
        <div className="product-card-category">{product.category}</div>
        <h3 className="product-card-title" title={product.name}>
          {product.name}
        </h3>

        <div className="product-card-rating">
          <StarIcon size={14} />
          <span className="rating-score">{product.rating}</span>
          <span className="rating-count">({product.reviewsCount})</span>
          <span className="stock-indicator">
            {product.stock < 10 ? `Only ${product.stock} left` : 'In Stock'}
          </span>
        </div>

        <div className="product-card-footer">
          <div className="price-block">
            <span className="current-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <button
            className="btn btn-sm btn-primary-gradient quick-add-btn"
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to cart`}
          >
            <CartIcon size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
