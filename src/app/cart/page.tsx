"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart, useToast } from "@/context";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const { showToast } = useToast();

  const shipping = subtotal > 200 ? 0 : 25;
  const total = subtotal + shipping;

  const handleRemove = (id: string, name: string) => {
    removeItem(id);
    showToast(`${name} removed from cart`, "success");
  };

  if (items.length === 0) {
    return (
      <div className="pt-20 lg:pt-24 min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-6" />
          <h1 className="font-serif text-3xl font-bold text-primary mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link href="/shop" className="btn-primary">
            CONTINUE SHOPPING
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 lg:pt-24">
      {/* Breadcrumb */}
      <div className="bg-background py-4">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-primary">Shopping Cart</span>
          </nav>
        </div>
      </div>

      {/* Cart Content */}
      <section className="py-8 lg:py-12">
        <div className="container-custom">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-8"
          >
            Shopping Cart
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {items.map((item, index) => {
                  const itemKey = `${item.id}-${item.size}-${item.color}`;
                  return (
                    <motion.div
                      key={itemKey}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 sm:gap-6 pb-6 border-b border-gray-200"
                    >
                      {/* Product Image */}
                      <Link
                        href={`/shop/${item.id}`}
                        className="w-24 sm:w-32 aspect-[3/4] bg-gray-100 flex-shrink-0 relative overflow-hidden"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-4">
                          <div>
                            <Link
                              href={`/shop/${item.id}`}
                              className="font-medium text-primary hover:text-accent transition-colors line-clamp-1"
                            >
                              {item.name}
                            </Link>
                            <p className="text-sm text-gray-500 mt-1">
                              Size: {item.size} | Color: {item.color}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemove(itemKey, item.name)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <div className="flex items-end justify-between mt-4">
                          {/* Quantity */}
                          <div className="flex items-center border border-gray-300">
                            <button
                              onClick={() =>
                                updateQuantity(itemKey, item.quantity - 1)
                              }
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-10 h-8 flex items-center justify-center text-sm font-medium border-x border-gray-300">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(itemKey, item.quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          {/* Price */}
                          <p className="font-semibold text-primary">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Continue Shopping */}
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mt-8 group"
              >
                <ChevronRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-background p-6 lg:p-8 sticky top-24"
              >
                <h2 className="font-serif text-xl font-bold text-primary mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Subtotal ({items.length} {items.length === 1 ? "item" : "items"})
                    </span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-accent">
                      Add ${(200 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                </div>

                <hr className="my-6 border-gray-300" />

                <div className="flex justify-between text-lg font-semibold mb-6">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Link href="/checkout" className="btn-primary w-full text-center block">
                  PROCEED TO CHECKOUT
                </Link>

                {/* Promo Code */}
                <div className="mt-6">
                  <label className="text-sm font-medium text-primary block mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:border-primary text-sm transition-colors"
                    />
                    <button className="btn-secondary px-4 py-2 text-sm">
                      Apply
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
