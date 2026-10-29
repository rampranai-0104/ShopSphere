import { INITIAL_PRODUCTS } from '../data/mockProducts.js';

// In-memory catalog cache for demonstration
let catalogCache = null;
let lastSyncTimestamp = null;

/**
 * Fetch products from mock API.
 * 
 * BUG-09 INTENTIONAL BUG:
 * The cache check `if (catalogCache)` occurs BEFORE checking `options.forceRefresh`.
 * Therefore, even when callers specify `forceRefresh: true` or click "Sync Live Inventory",
 * the stale cached snapshot is permanently returned instead of fresh server/inventory state.
 */
export async function getProducts(options = {}) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 150));

  // BUG-09: Stale cache bug - Cache check ignores forceRefresh flag!
  if (catalogCache) {
    console.warn('[MockApi Cache] Serving from cached catalog snapshot (forceRefresh was ignored)');
    return {
      products: catalogCache,
      cached: true,
      lastUpdated: lastSyncTimestamp || new Date().toISOString()
    };
  }

  // Initial load
  const initialData = JSON.parse(JSON.stringify(INITIAL_PRODUCTS));
  catalogCache = initialData;
  lastSyncTimestamp = new Date().toISOString();

  return {
    products: catalogCache,
    cached: false,
    lastUpdated: lastSyncTimestamp
  };
}

/**
 * Simulate warehouse telemetry / inventory status check.
 * 
 * BUG-10 INTENTIONAL BUG:
 * This function triggers an actual browser window.fetch to an incorrect mock endpoint
 * (`/api/v1/produts/stock-status` with a typo 'produts' instead of 'products' and 'item_id=undefined').
 * This is directly observable in the browser DevTools Network tab as a failed 404 request.
 */
export async function fetchLiveWarehouseTelemetry(productId) {
  const incorrectEndpoint = `/api/v1/produts/stock-status?item_id=${productId || 'undefined'}&session=live_probe`;
  
  try {
    // BUG-10: Trigger real fetch with mistyped endpoint path
    const response = await fetch(incorrectEndpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'ShopSphere-Telemetry-Probe'
      }
    });

    if (!response.ok) {
      console.error(`[DevTools Network Probe] Mock API returned ${response.status} for ${incorrectEndpoint}`);
      return { success: false, status: response.status, url: incorrectEndpoint };
    }

    return await response.json();
  } catch (err) {
    console.error(`[DevTools Network Probe] Failed to fetch live telemetry:`, err);
    return { success: false, error: err.message, url: incorrectEndpoint };
  }
}
