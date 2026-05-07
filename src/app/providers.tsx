'use client';

import { ReactNode } from 'react';
import { CartProvider } from '@/context/CartContext';
import { UIProvider } from '@/context/UIContext';
import { ToastProvider } from '@/components/ui/Toast';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <UIProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </UIProvider>
    </CartProvider>
  );
}
