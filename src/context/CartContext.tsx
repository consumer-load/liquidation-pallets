'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Pallet, CartItem, DeliveryType } from '@/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (pallet: Pallet, quantity?: number) => void;
  removeFromCart: (palletId: string) => void;
  updateQuantity: (palletId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  deliveryType: DeliveryType;
  setDeliveryType: (type: DeliveryType) => void;
  freightCost: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('commercial_dock');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('liquidatin_cart');
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved cart');
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('liquidatin_cart', JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const addToCart = (pallet: Pallet, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.pallet.id === pallet.id);
      if (existing) {
        return prev.map((item) =>
          item.pallet.id === pallet.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { pallet, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (palletId: string) => {
    setCart((prev) => prev.filter((item) => item.pallet.id !== palletId));
  };

  const updateQuantity = (palletId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(palletId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.pallet.id === palletId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.pallet.price * item.quantity, 0);

  // Freight logic:
  // Warehouse pickup = $0
  // Commercial dock = $220 base per pallet
  // Residential liftgate = $340 base per pallet (requires liftgate truck & appointment)
  const freightCost = totalItems === 0
    ? 0
    : deliveryType === 'warehouse_pickup'
    ? 0
    : deliveryType === 'residential_liftgate'
    ? 340 * totalItems
    : 220 * totalItems;

  const totalAmount = subtotal + freightCost;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        deliveryType,
        setDeliveryType,
        freightCost,
        totalAmount,
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
