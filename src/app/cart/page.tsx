'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { Button } from '@/components/ui';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();

  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;
  const freeShippingThreshold = 500;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center px-4"
        >
          <ShoppingBag size={64} className="mx-auto text-primary/20 mb-6" />
          <h1 className="heading-lg mb-4">Your Cart is Empty</h1>
          <p className="text-primary/60 mb-8 max-w-md mx-auto">
            Looks like you haven&apos;t added anything to your cart yet. 
            Explore our collection and find something you love.
          </p>
          <Link href="/shop">
            <Button variant="primary" size="lg">
              Start Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <h1 className="heading-lg">Shopping Cart ({itemCount})</h1>
          <button
            onClick={clearCart}
            className="text-sm text-primary/60 hover:text-red-500 transition-colors"
          >
            Clear Cart
          </button>
        </motion.div>

        {/* Free Shipping Banner */}
        {remainingForFreeShipping > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-accent/10 border border-accent/20 p-4 mb-8 flex items-center gap-3"
          >
            <Truck size={20} className="text-accent" />
            <p className="text-sm">
              Add <span className="font-semibold">{formatPrice(remainingForFreeShipping)}</span> more to get{' '}
              <span className="font-semibold text-accent">FREE SHIPPING!</span>
            </p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-secondary rounded-lg overflow-hidden">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-primary/10 text-xs font-medium uppercase tracking-wider text-primary/60">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Items */}
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-primary/10 items-center"
                  >
                    {/* Product */}
                    <div className="md:col-span-6 flex gap-4">
                      <Link
                        href={`/shop/${item.product.id}`}
                        className="relative w-24 h-32 flex-shrink-0 bg-background overflow-hidden group"
                      >
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/shop/${item.product.id}`}
                          className="font-heading font-medium hover:text-accent transition-colors line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-primary/60 mt-1">
                          Size: <span className="text-primary">{item.selectedSize}</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-primary/60">Color:</span>
                          <span
                            className="w-4 h-4 rounded-full border border-primary/20"
                            style={{ backgroundColor: item.selectedColor.hex }}
                            title={item.selectedColor.name}
                          />
                          <span className="text-sm">{item.selectedColor.name}</span>
                        </div>
                        
                        {/* Mobile Price */}
                        <p className="md:hidden text-sm font-medium mt-2">
                          {formatPrice(item.product.price)}
                        </p>
                        
                        {/* Mobile Remove */}
                        <button
                          onClick={() =>
                            removeItem(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor.name
                            )
                          }
                          className="md:hidden text-sm text-primary/50 hover:text-red-500 mt-2 flex items-center gap-1 transition-colors"
                        >
                          <X size={14} /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="hidden md:block md:col-span-2 text-center">
                      {formatPrice(item.product.price)}
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-2 flex justify-start md:justify-center">
                      <div className="flex items-center border border-primary/20">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor.name,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                          className="w-9 h-9 flex items-center justify-center hover:bg-background transition-colors disabled:opacity-50"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 h-9 flex items-center justify-center text-sm font-medium border-x border-primary/20">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor.name,
                              item.quantity + 1
                            )
                          }
                          className="w-9 h-9 flex items-center justify-center hover:bg-background transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="hidden md:flex md:col-span-2 items-center justify-end gap-4">
                      <span className="font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() =>
                          removeItem(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor.name
                          )
                        }
                        className="p-1 text-primary/40 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {/* Mobile Total */}
                    <div className="md:hidden flex items-center justify-between pt-2 border-t border-primary/10">
                      <span className="text-sm text-primary/60">Total:</span>
                      <span className="font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-sm text-primary/60 hover:text-accent transition-colors group"
              >
                <ArrowRight size={16} className="rotate-180 transition-transform group-hover:-translate-x-1" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-secondary p-6 rounded-lg sticky top-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-heading text-xl font-semibold mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 pb-6 border-b border-primary/10">
                <div className="flex justify-between text-sm">
                  <span className="text-primary/60">Subtotal ({itemCount} items)</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-primary/60">Shipping</span>
                  <span className={shipping === 0 ? 'text-accent font-medium' : 'font-medium'}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between py-6 border-b border-primary/10">
                <span className="font-heading text-lg font-semibold">Total</span>
                <span className="font-heading text-lg font-semibold">{formatPrice(total)}</span>
              </div>

              {/* Promo Code */}
              <div className="py-6 border-b border-primary/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 px-4 py-2 border border-primary/20 bg-transparent text-sm focus:outline-none focus:border-accent"
                  />
                  <Button variant="secondary" className="px-4 py-2">
                    Apply
                  </Button>
                </div>
              </div>

              <div className="pt-6 space-y-3">
                <Link href="/checkout" className="block">
                  <Button variant="primary" className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>
                
                <div className="text-center">
                  <p className="text-xs text-primary/50">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-primary/10">
                <div className="flex justify-center gap-4">
                  {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map((method) => (
                    <span
                      key={method}
                      className="text-xs bg-primary/5 px-2 py-1 rounded text-primary/60"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
