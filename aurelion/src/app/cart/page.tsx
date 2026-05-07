"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { products } from "@/data/products";

interface CartItem {
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

const mockCartItems: CartItem[] = [
  { productId: "1", size: "M", color: "Black", quantity: 1 },
  { productId: "2", size: "S", color: "Gold", quantity: 2 },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [promoCode, setPromoCode] = useState("");

  const getCartItemDetails = (item: CartItem) => {
    const product = products.find((p) => p.id === item.productId);
    return product;
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const newItems = [...cartItems];
    newItems[index].quantity = newQuantity;
    setCartItems(newItems);
  };

  const removeItem = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const subtotal = cartItems.reduce((total, item) => {
    const product = getCartItemDetails(item);
    return total + (product?.price || 0) * item.quantity;
  }, 0);

  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={64} className="mx-auto mb-6 text-gray-300" />
          <h1 className="heading-md mb-4">Your Cart is Empty</h1>
          <p className="text-gray-500 mb-8">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link href="/shop">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
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
                {cartItems.map((item, index) => {
                  const product = getCartItemDetails(item);
                  if (!product) return null;

                  return (
                    <motion.div
                      key={`${item.productId}-${item.size}-${item.color}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                    >
                      {/* Product */}
                      <div className="md:col-span-6 flex gap-4">
                        <div className="relative w-24 h-32 bg-gray-100 flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/product/${product.id}`}
                            className="font-medium hover:text-accent transition-colors"
                          >
                            {product.name}
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">
                            Size: {item.size}
                          </p>
                          <p className="text-sm text-gray-500">
                            Color: {item.color}
                          </p>
                          <button
                            onClick={() => removeItem(index)}
                            className="mt-2 text-sm text-gray-500 hover:text-accent flex items-center gap-1 md:hidden"
                          >
                            <X size={14} /> Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="md:col-span-2 text-center">
                        <span className="md:hidden text-sm text-gray-500 mr-2">Price:</span>
                        ${product.price}
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2 flex justify-center">
                        <div className="flex items-center border">
                          <button
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
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
                            ${(product.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeItem(index)}
                            className="hidden md:block text-gray-400 hover:text-accent transition-colors"
                            aria-label="Remove item"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Continue Shopping */}
              <div className="mt-8">
                <Link
                  href="/shop"
                  className="text-sm uppercase tracking-wider hover:text-accent transition-colors"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-background p-6 sticky top-24">
                <h2 className="heading-sm mb-6">Order Summary</h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="secondary" size="sm">
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-accent">
                      Free shipping on orders over $200
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
