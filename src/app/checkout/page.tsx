'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, CreditCard, Truck } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';

const orderItems = [
  { productId: '1', size: 'M', color: 'Black', quantity: 1 },
  { productId: '2', size: 'S', color: 'Camel', quantity: 2 },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const getProduct = (productId: string) => products.find((p) => p.id === productId);

  const subtotal = orderItems.reduce((total, item) => {
    const product = getProduct(item.productId);
    return total + (product?.price || 0) * item.quantity;
  }, 0);

  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          className="text-center max-w-md mx-auto px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-primary" />
          </div>
          <h1 className="heading-lg mb-4">Order Confirmed!</h1>
          <p className="text-primary/60 mb-2">
            Thank you for your order. Your order number is:
          </p>
          <p className="font-mono text-xl font-medium mb-6">#AUR-2024-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          <p className="text-primary/60 mb-8">
            We&apos;ve sent a confirmation email with your order details.
          </p>
          <Link href="/shop">
            <Button variant="primary">Continue Shopping</Button>
          </Link>
        </motion.div>
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
          Checkout
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Contact Information */}
              <motion.section
                className="bg-secondary p-6 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-heading text-xl font-semibold mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    required
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                </div>
              </motion.section>

              {/* Shipping Address */}
              <motion.section
                className="bg-secondary p-6 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Truck size={20} />
                  <h2 className="font-heading text-xl font-semibold">
                    Shipping Address
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    placeholder="John"
                    required
                  />
                  <Input
                    label="Last Name"
                    placeholder="Doe"
                    required
                  />
                  <div className="md:col-span-2">
                    <Input
                      label="Address"
                      placeholder="123 Main Street"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Input
                      label="Apartment, suite, etc. (optional)"
                      placeholder="Apt 4B"
                    />
                  </div>
                  <Input
                    label="City"
                    placeholder="New York"
                    required
                  />
                  <Input
                    label="State"
                    placeholder="NY"
                    required
                  />
                  <Input
                    label="ZIP Code"
                    placeholder="10001"
                    required
                  />
                  <Input
                    label="Country"
                    placeholder="United States"
                    required
                  />
                </div>
              </motion.section>

              {/* Payment Method */}
              <motion.section
                className="bg-secondary p-6 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard size={20} />
                  <h2 className="font-heading text-xl font-semibold">
                    Payment Method
                  </h2>
                </div>
                <div className="space-y-4">
                  <Input
                    label="Card Number"
                    placeholder="4242 4242 4242 4242"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      placeholder="MM/YY"
                      required
                    />
                    <Input
                      label="CVC"
                      placeholder="123"
                      required
                    />
                  </div>
                  <Input
                    label="Name on Card"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </motion.section>

              {/* Submit Button (Mobile) */}
              <div className="lg:hidden">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : `Pay ${formatPrice(total)}`}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-secondary p-6 sticky top-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="font-heading text-xl font-semibold mb-6">
                Order Summary
              </h2>

              {/* Order Items */}
              <div className="space-y-4 pb-6 border-b border-primary/10">
                {orderItems.map((item) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;

                  return (
                    <div key={`${item.productId}-${item.size}`} className="flex gap-4">
                      <div className="relative w-16 h-20 flex-shrink-0 bg-background">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-secondary text-xs flex items-center justify-center rounded-full">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-primary/60">
                          {item.size} / {item.color}
                        </p>
                        <p className="text-sm mt-1">
                          {formatPrice(product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Totals */}
              <div className="space-y-3 py-6 border-b border-primary/10 text-sm">
                <div className="flex justify-between">
                  <span className="text-primary/60">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/60">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/60">Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>

              <div className="flex justify-between py-6 font-medium text-lg">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              {/* Submit Button (Desktop) */}
              <div className="hidden lg:block">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  size="lg"
                  disabled={isProcessing}
                  onClick={handleSubmit}
                >
                  {isProcessing ? 'Processing...' : `Pay ${formatPrice(total)}`}
                </Button>
              </div>

              <p className="text-xs text-primary/50 text-center mt-4">
                Your payment is secured with SSL encryption
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
