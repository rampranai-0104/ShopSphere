import React, { useState, useMemo } from 'react';
import { CATEGORIES } from '../data/mockProducts';
import { ProductCard } from '../components/ProductCard';
import { SearchIcon, RefreshIcon, FilterIcon, CloseIcon } from '../components/Icons';
import { useToast } from '../context/ToastContext';
import { getProducts } from '../services/mockApi';

export function ProductListPage({
  products,
  setProducts,
  onViewDetails,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory
}) {
  const [sortBy, setSortBy] = useState('featured');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { addToast } = useToast();

  const handleRefreshInventory = async () => {
    setIsRefreshing(true);
    try {
      /**
       * BUG-09 INTENTIONAL BUG TRIGGER:
       * Call getProducts with forceRefresh: true.
       * Due to BUG-09 in mockApi.js, it permanently returns the cached stale snapshot
       * without updating live stock or prices!
       */
      const result = await getProducts({ forceRefresh: true });
      if (result.cached) {
        addToast(
          'Inventory refreshed (Cached snapshot served from memory)',
          'warning'
        );
      } else {
        addToast('Inventory updated successfully', 'success');
      }
      setProducts(result.products);
    } catch (e) {
      addToast('Failed to refresh inventory', 'error');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter logic
      let matchesCategory = true;
      if (selectedCategory !== 'All') {
        /**
         * BUG-03 INTENTIONAL BUG:
         * Broken category filter on "Audio":
         * Compares product.category against 'Audios' (or 'audio') instead of 'Audio'!
         * As a result, selecting the Audio category returns 0 products.
         */
        if (selectedCategory === 'Audio') {
          // BUG-03: Typo in target category string ('Audios' vs 'Audio')
          matchesCategory = product.category === 'Audios';
        } else {
          matchesCategory = product.category === selectedCategory;
        }
      }

      // Search filter logic
      let matchesSearch = true;
      if (searchQuery.trim() !== '') {
        /**
         * BUG-02 INTENTIONAL BUG:
         * Strict case-sensitive search:
         * Uses `product.name.includes(searchQuery)` without calling `.toLowerCase()`!
         * Searching for "wireless" yields 0 results, while searching for "Wireless" yields results.
         */
        matchesSearch = product.name.includes(searchQuery);
      }

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="product-list-page">
      {/* Page Header */}
      <div className="catalog-header">
        <div>
          <h1 className="catalog-title">Product Catalog</h1>
          <p className="catalog-subtitle">
            Explore cutting-edge gear with dynamic filtering, sorting, and live inventory sync.
          </p>
        </div>

        <button
          onClick={handleRefreshInventory}
          disabled={isRefreshing}
          className="btn btn-outline sync-inventory-btn"
          title="Force refresh product inventory from mock server cache"
        >
          <RefreshIcon size={16} className={isRefreshing ? 'spin' : ''} />
          <span>{isRefreshing ? 'Syncing...' : 'Sync Live Inventory'}</span>
        </button>
      </div>

      {/* Control Bar: Categories, Search query tag, Sort */}
      <div className="catalog-controls-card">
        {/* Category Pills */}
        <div className="category-pills-list">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort & Filter meta */}
        <div className="catalog-sort-wrapper">
          <label htmlFor="sort-select" className="sort-label">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Active Search & Category status banner */}
      {(searchQuery || selectedCategory !== 'All') && (
        <div className="active-filters-bar">
          <span className="filters-label">Active Filters:</span>
          {selectedCategory !== 'All' && (
            <span className="filter-chip">
              Category: <strong>{selectedCategory}</strong>
              <button
                onClick={() => setSelectedCategory('All')}
                aria-label="Remove category filter"
              >
                <CloseIcon size={12} />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="filter-chip">
              Search: <strong>"{searchQuery}"</strong>
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search text"
              >
                <CloseIcon size={12} />
              </button>
            </span>
          )}
          <span className="results-count">
            Found <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      )}

      {/* Products Display Grid */}
      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="empty-catalog-state">
          <div className="empty-icon-wrap">🔍</div>
          <h3>No matching products found</h3>
          <p>
            {selectedCategory === 'Audio'
              ? 'Notice: 0 items matched for category "Audio" despite audio catalog inventory.'
              : searchQuery
              ? `No items matched search query "${searchQuery}". (Note: Check letter casing!)`
              : 'Try clearing your active filters to see all available products.'}
          </p>
          <div className="empty-actions">
            {selectedCategory !== 'All' && (
              <button
                className="btn btn-secondary"
                onClick={() => setSelectedCategory('All')}
              >
                Reset Category
              </button>
            )}
            {searchQuery && (
              <button
                className="btn btn-primary"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
