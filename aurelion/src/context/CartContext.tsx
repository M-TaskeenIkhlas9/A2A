"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: string, color: string, quantity?: number) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback(
    (product: Product, size: string, color: string, quantity = 1) => {
      setItems((prevItems) => {
        const existingIndex = prevItems.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.size === size &&
            item.color === color
        );

        if (existingIndex >= 0) {
          const newItems = [...prevItems];
          newItems[existingIndex].quantity += quantity;
          return newItems;
        }

        return [...prevItems, { product, size, color, quantity }];
      });
    },
    []
  );

  const removeItem = useCallback(
    (productId: string, size: string, color: string) => {
      setItems((prevItems) =>
        prevItems.filter(
          (item) =>
            !(
              item.product.id === productId &&
              item.size === size &&
              item.color === color
            )
        )
      );
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: string, size: string, color: string, quantity: number) => {
      if (quantity < 1) {
        removeItem(productId, size, color);
        return;
      }

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.product.id === productId &&
          item.size === size &&
          item.color === color
            ? { ...item, quantity }
            : item
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getItemCount = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const getSubtotal = useCallback(() => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemCount,
        getSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
