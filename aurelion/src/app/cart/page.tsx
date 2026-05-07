"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Minus, Plus, X, ArrowRight } from "lucide-react";

const initialCartItems = [
  {
    id: 1,
    name: "Classic Black Blazer",
    price: 299,
    size: "M",
    color: "Black",
    quantity: 1,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 2,
    name: "Silk Cream Blouse",
    price: 189,
    size: "S",
    color: "Cream",
    quantity: 2,
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=200&q=80",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  return (
    <div className="pt-20 md:pt-24">
      {/* Page Header */}
      <section className="bg-black text-white py-12 md:py-16">
        <div className="container text-center">
          <motion.h1
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Shopping Cart
          </motion.h1>
          <motion.p
            className="text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </motion.p>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        {cartItems.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-2xl font-bold mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center px-8 py-4 bg-black text-white font-medium uppercase tracking-wider text-sm hover:bg-[#C9A96E] transition-colors"
            >
              Continue Shopping
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b text-sm font-medium uppercase tracking-wider text-gray-500">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <div className="divide-y">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="py-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      {/* Product Info */}
                      <div className="md:col-span-6 flex gap-4">
                        <Link
                          href={`/product/${item.id}`}
                          className="w-24 h-32 flex-shrink-0 bg-gray-100 overflow-hidden"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        <div className="flex flex-col justify-center">
                          <Link
                            href={`/product/${item.id}`}
                            className="font-medium hover:text-[#C9A96E] transition-colors"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">
                            Size: {item.size} / {item.color}
                          </p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors mt-2 md:hidden"
                          >
                            <X size={14} />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2 flex justify-center">
                        <div className="inline-flex items-center border border-gray-300">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 h-8 flex items-center justify-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="md:col-span-2 text-center hidden md:block">
                        ${item.price}
                      </div>

                      {/* Total */}
                      <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-4">
                        <span className="md:hidden text-sm text-gray-500">
                          ${item.price} × {item.quantity}
                        </span>
                        <span className="font-medium">
                          ${item.price * item.quantity}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="hidden md:flex items-center justify-center w-8 h-8 text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t">
                <Link
                  href="/shop"
                  className="text-sm font-medium uppercase tracking-wider hover:text-[#C9A96E] transition-colors"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-[#F5F5F5] p-6 md:p-8 sticky top-24"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-serif text-xl font-bold mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 pb-6 border-b border-gray-300">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-gray-500">
                      Free shipping on orders over $500
                    </p>
                  )}
                </div>

                <div className="flex justify-between py-6 border-b border-gray-300">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-lg">${total}</span>
                </div>

                <div className="mt-6 space-y-4">
                  <Link
                    href="/checkout"
                    className="block w-full py-4 bg-black text-white text-center font-medium uppercase tracking-wider text-sm hover:bg-[#C9A96E] transition-colors"
                  >
                    Proceed to Checkout
                  </Link>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="w-full px-4 py-3 pr-24 border border-gray-300 text-sm focus:outline-none focus:border-black"
                    />
                    <button className="absolute right-0 top-0 h-full px-4 text-sm font-medium uppercase tracking-wider hover:text-[#C9A96E] transition-colors">
                      Apply
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-300">
                  <p className="text-xs text-gray-500 text-center">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
