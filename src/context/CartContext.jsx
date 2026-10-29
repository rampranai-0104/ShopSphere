import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('shopsphere_cart');
      return saved ? JSON.parse(saved) : [
        // Default initial demo cart items for immediate convenience
        {
          id: 'prod-001',
          name: 'AeroPulse Wireless Noise-Canceling Headphones',
          category: 'Audio',
          price: 189.99,
          quantity: 2
        },
        {
          id: 'prod-005',
          name: 'Titanium EDC Precision Carabiner Tool',
          category: 'Accessories',
          price: 34.99,
          quantity: 1
        }
      ];
    } catch (e) {
      console.error('Failed to parse cart from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('shopsphere_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    const qty = parseInt(quantity, 10) || 1;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        quantity: qty
      }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    const qty = Math.max(1, parseInt(quantity, 10) || 1);
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  /**
   * BUG-04 INTENTIONAL BUG:
   * Incorrect cart subtotal calculation:
   * It calculates `sum + item.price` instead of `sum + (item.price * item.quantity)`.
   * When items have a quantity greater than 1, the subtotal ignores quantities entirely!
   */
  const subtotal = cartItems.reduce((acc, item) => {
    // BUG-04: Forgot to multiply by item.quantity!
    return acc + Number(item.price);
  }, 0);

  // Normal expected calculation (for comparison/debugging):
  const accurateSubtotal = cartItems.reduce((acc, item) => {
    return acc + Number(item.price) * item.quantity;
  }, 0);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const shipping = subtotal > 100 || cartItems.length === 0 ? 0 : 9.99;
  const estimatedTax = subtotal * 0.08;
  const grandTotal = subtotal + shipping + estimatedTax;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        accurateSubtotal,
        totalItemsCount,
        shipping,
        estimatedTax,
        grandTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
