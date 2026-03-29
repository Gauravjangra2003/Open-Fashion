import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import productsData from '../data/products';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [products] = useState(() => productsData);
  const [cart, setCart] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  const getProductById = useCallback(
    (id) => products.find((p) => p.id === id),
    [products]
  );

  const addToCart = useCallback((productId, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { productId, quantity: qty }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCart(() => []);
  }, []);

  const updateCartQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const toggleWishlist = useCallback((productId) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isInWishlist = useCallback(
    (productId) => wishlistIds.includes(productId),
    [wishlistIds]
  );

  const wishlistProducts = useMemo(
    () => products.filter((p) => wishlistIds.includes(p.id)),
    [products, wishlistIds]
  );

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const p = getProductById(item.productId);
      return sum + (p ? p.price * item.quantity : 0);
    }, 0);
  }, [cart, getProductById]);

  const cartCount = useMemo(
    () => cart.reduce((n, item) => n + item.quantity, 0),
    [cart]
  );

  const value = useMemo(
    () => ({
      products,
      cart,
      wishlistIds,
      wishlistProducts,
      cartTotal,
      cartCount,
      getProductById,
      addToCart,
      removeFromCart,
      clearCart,
      updateCartQuantity,
      toggleWishlist,
      isInWishlist,
    }),
    [
      products,
      cart,
      wishlistIds,
      wishlistProducts,
      cartTotal,
      cartCount,
      getProductById,
      addToCart,
      removeFromCart,
      clearCart,
      updateCartQuantity,
      toggleWishlist,
      isInWishlist,
    ]
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return ctx;
}
