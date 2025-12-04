'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { Product } from '@/lib/types';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('shopping-cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartTotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace(',', '.'));
    return total + price * item.quantity;
  }, 0);
  
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
