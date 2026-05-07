'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui';
import { products } from '@/data/products';
import { cn, formatPrice } from '@/lib/utils';

interface CartItem {
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

const initialCartItems: CartItem[] = [
  { productId: '1', size: 'M', color: 'Black', quantity: 1 },
  { productId: '2', size: 'S', color: 'Camel', quantity: 2 },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const getProduct = (productId: string) => products.find((p) => p.id === productId);

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const subtotal = cartItems.reduce((total, item) => {
    const product = getProduct(item.productId);
    return total + (product?.price || 0) * item.quantity;
  }, 0);

  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ShoppingBag size={64} className="mx-auto text-primary/30 mb-6" />
            <h1 className="heading-lg mb-4">Your Cart is Empty</h1>
            <p className="text-primary/60 mb-8">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Link href="/shop">
              <Button variant="primary">Continue Shopping</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-12">
        <motion.h1
          className="heading-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Shopping Cart
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-secondary">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-primary/10 text-sm font-medium uppercase tracking-wider">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Items */}
              {cartItems.map((item, index) => {
                const product = getProduct(item.productId);
                if (!product) return null;

                return (
                  <motion.div
                    key={`${item.productId}-${item.size}-${item.color}`}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-primary/10 items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    {/* Product */}
                    <div className="md:col-span-6 flex gap-4">
                      <div className="relative w-24 h-32 flex-shrink-0 bg-background">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/shop/${product.id}`}
                          className="font-heading font-medium hover:text-accent transition-colors"
                        >
                          {product.name}
                        </Link>
                        <p className="text-sm text-primary/60 mt-1">
                          Size: {item.size}
                        </p>
                        <p className="text-sm text-primary/60">
                          Color: {item.color}
                        </p>
                        <button
                          onClick={() => removeItem(index)}
                          className="text-sm text-primary/60 hover:text-red-500 mt-2 flex items-center gap-1 md:hidden"
                        >
                          <X size={14} /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-2 text-center hidden md:block">
                      {formatPrice(product.price)}
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-2 flex justify-center">
                      <div className="flex items-center border border-primary/20">
                        <button
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-background transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-background transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="md:col-span-2 flex items-center justify-between md:justify-end">
                      <span className="md:hidden text-sm text-primary/60">Total:</span>
                      <span className="font-medium">
                        {formatPrice(product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(index)}
                        className="ml-4 text-primary/40 hover:text-red-500 transition-colors hidden md:block"
                        aria-label="Remove item"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                href="/shop"
                className="text-sm text-primary/60 hover:text-primary transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-secondary p-6 sticky top-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-heading text-xl font-semibold mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 pb-6 border-b border-primary/10">
                <div className="flex justify-between text-sm">
                  <span className="text-primary/60">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-primary/60">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-primary/50">
                    Free shipping on orders over $500
                  </p>
                )}
              </div>

              <div className="flex justify-between py-6 font-medium text-lg">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <Link href="/checkout" className="block">
                <Button variant="primary" className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
              </Link>

              <div className="mt-6 text-center">
                <p className="text-xs text-primary/50">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
