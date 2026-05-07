"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal } = useCart();
  const { showToast } = useToast();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = getSubtotal();
  const shipping = subtotal > 200 ? 0 : 15;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "aurelion10") {
      setPromoApplied(true);
      showToast("Promo code applied! 10% off", "success");
    } else if (promoCode) {
      showToast("Invalid promo code", "error");
    }
  };

  const handleRemoveItem = (productId: string, size: string, color: string, productName: string) => {
    removeItem(productId, size, color);
    showToast(`${productName} removed from cart`, "info");
  };

  if (items.length === 0) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-background rounded-full flex items-center justify-center">
            <ShoppingBag size={40} className="text-gray-300" />
          </div>
          <h1 className="heading-md mb-4">Your Cart is Empty</h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Looks like you haven&apos;t added anything to your cart yet. 
            Explore our collection and find something you love.
          </p>
          <Link href="/shop">
            <Button size="lg">
              Continue Shopping
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-primary text-secondary py-16">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-xl"
          >
            Shopping Cart
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 mt-2"
          >
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </motion.p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b text-sm font-semibold uppercase tracking-wider">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Items */}
              <div className="divide-y">
                <AnimatePresence>
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ delay: index * 0.05 }}
                      layout
                      className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                    >
                      {/* Product */}
                      <div className="md:col-span-6 flex gap-4">
                        <Link
                          href={`/product/${item.product.id}`}
                          className="relative w-24 h-32 bg-gray-100 flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </Link>
                        <div className="flex flex-col justify-center">
                          <Link
                            href={`/product/${item.product.id}`}
                            className="font-medium hover:text-accent transition-colors focus:outline-none focus-visible:text-accent"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">
                            Size: {item.size}
                          </p>
                          <p className="text-sm text-gray-500">
                            Color: {item.color}
                          </p>
                          <button
                            onClick={() => handleRemoveItem(item.product.id, item.size, item.color, item.product.name)}
                            className="mt-2 text-sm text-gray-500 hover:text-red-500 flex items-center gap-1 md:hidden transition-colors focus:outline-none focus-visible:text-red-500"
                          >
                            <X size={14} /> Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="md:col-span-2 text-center">
                        <span className="md:hidden text-sm text-gray-500 mr-2">Price:</span>
                        <span>${item.product.price}</span>
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2 flex justify-center">
                        <div className="flex items-center border">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.color,
                                item.quantity - 1
                              )
                            }
                            disabled={item.quantity <= 1}
                            className={cn(
                              "w-8 h-8 flex items-center justify-center transition-colors",
                              "focus:outline-none focus-visible:bg-gray-100",
                              item.quantity <= 1
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-gray-100"
                            )}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.color,
                                item.quantity + 1
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors focus:outline-none focus-visible:bg-gray-100"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="md:col-span-2 flex justify-between md:justify-end items-center">
                        <span className="md:hidden text-sm text-gray-500">Total:</span>
                        <div className="flex items-center gap-4">
                          <span className="font-semibold">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => handleRemoveItem(item.product.id, item.size, item.color, item.product.name)}
                            className="hidden md:block text-gray-400 hover:text-red-500 transition-colors focus:outline-none focus-visible:text-red-500"
                            aria-label="Remove item"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Continue Shopping */}
              <div className="mt-8">
                <Link
                  href="/shop"
                  className="inline-flex items-center text-sm uppercase tracking-wider hover:text-accent transition-colors focus:outline-none focus-visible:text-accent"
                >
                  <ArrowRight size={16} className="mr-2 rotate-180" />
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-background p-6 sticky top-24"
              >
                <h2 className="heading-sm mb-6">Order Summary</h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                      className="flex-1"
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleApplyPromo}
                      disabled={promoApplied}
                    >
                      {promoApplied ? "Applied" : "Apply"}
                    </Button>
                  </div>
                  {promoApplied && (
                    <p className="text-xs text-green-600 mt-2">
                      AURELION10 applied - 10% off!
                    </p>
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-accent">
                      Add ${(200 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                  <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link href="/checkout">
                  <Button fullWidth size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>

                {/* Payment Methods */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  Secure checkout powered by Stripe
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
