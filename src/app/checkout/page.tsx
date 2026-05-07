'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CreditCard, Truck, ShoppingBag, ArrowLeft, Shield, Lock } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/Toast';
import { formatPrice } from '@/lib/utils';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, itemCount, subtotal, clearCart } = useCart();
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    if (items.length === 0 && !orderComplete) {
      router.push('/cart');
    }
  }, [items.length, orderComplete, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const newOrderNumber = `AUR-2024-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setOrderNumber(newOrderNumber);
    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
    showToast('Order placed successfully!', 'success');
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          className="text-center max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check size={40} className="text-primary" />
          </motion.div>
          <h1 className="heading-lg mb-4">Order Confirmed!</h1>
          <p className="text-primary/60 mb-2">
            Thank you for your order. Your order number is:
          </p>
          <p className="font-mono text-xl font-semibold mb-6 bg-background px-4 py-2 inline-block">
            #{orderNumber}
          </p>
          <p className="text-primary/60 mb-8">
            We&apos;ve sent a confirmation email with your order details and tracking information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button variant="primary">Continue Shopping</Button>
            </Link>
            <Link href="/">
              <Button variant="secondary">Back to Home</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={64} className="mx-auto text-primary/20 mb-6" />
          <h1 className="heading-lg mb-4">Your cart is empty</h1>
          <p className="text-primary/60 mb-8">Add some items before checking out.</p>
          <Link href="/shop">
            <Button variant="primary">Shop Now</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8 md:py-12">
        {/* Back Link */}
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm text-primary/60 hover:text-accent transition-colors mb-6 group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Cart
        </Link>

        <motion.h1
          className="heading-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Checkout
        </motion.h1>

        {/* Progress Indicator */}
        <div className="hidden md:flex items-center justify-center gap-4 mb-12">
          {['Cart', 'Checkout', 'Confirmation'].map((step, index) => (
            <div key={step} className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= 1
                      ? 'bg-accent text-primary'
                      : 'bg-primary/10 text-primary/40'
                  }`}
                >
                  {index + 1}
                </span>
                <span
                  className={`text-sm ${
                    index <= 1 ? 'text-primary font-medium' : 'text-primary/40'
                  }`}
                >
                  {step}
                </span>
              </div>
              {index < 2 && (
                <div
                  className={`w-16 h-0.5 ${
                    index < 1 ? 'bg-accent' : 'bg-primary/10'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Contact Information */}
              <motion.section
                className="bg-secondary p-6 rounded-lg mb-6"
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
                    id="email"
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    required
                    id="phone"
                  />
                </div>
              </motion.section>

              {/* Shipping Address */}
              <motion.section
                className="bg-secondary p-6 rounded-lg mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Truck size={20} className="text-accent" />
                  <h2 className="font-heading text-xl font-semibold">
                    Shipping Address
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    placeholder="John"
                    required
                    id="firstName"
                  />
                  <Input
                    label="Last Name"
                    placeholder="Doe"
                    required
                    id="lastName"
                  />
                  <div className="md:col-span-2">
                    <Input
                      label="Address"
                      placeholder="123 Main Street"
                      required
                      id="address"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Input
                      label="Apartment, suite, etc. (optional)"
                      placeholder="Apt 4B"
                      id="apartment"
                    />
                  </div>
                  <Input
                    label="City"
                    placeholder="New York"
                    required
                    id="city"
                  />
                  <Input
                    label="State"
                    placeholder="NY"
                    required
                    id="state"
                  />
                  <Input
                    label="ZIP Code"
                    placeholder="10001"
                    required
                    id="zip"
                  />
                  <Input
                    label="Country"
                    placeholder="United States"
                    required
                    id="country"
                  />
                </div>
              </motion.section>

              {/* Payment Method */}
              <motion.section
                className="bg-secondary p-6 rounded-lg mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard size={20} className="text-accent" />
                  <h2 className="font-heading text-xl font-semibold">
                    Payment Method
                  </h2>
                </div>
                
                {/* Payment Security Badge */}
                <div className="flex items-center gap-2 mb-4 p-3 bg-accent/10 rounded">
                  <Lock size={16} className="text-accent" />
                  <span className="text-sm text-primary/70">
                    Your payment information is encrypted and secure
                  </span>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Card Number"
                    placeholder="4242 4242 4242 4242"
                    required
                    id="cardNumber"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      placeholder="MM/YY"
                      required
                      id="expiry"
                    />
                    <Input
                      label="CVC"
                      placeholder="123"
                      required
                      id="cvc"
                    />
                  </div>
                  <Input
                    label="Name on Card"
                    placeholder="John Doe"
                    required
                    id="cardName"
                  />
                </div>

                {/* Accepted Cards */}
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-xs text-primary/50">Accepted:</span>
                  {['Visa', 'Mastercard', 'Amex', 'Discover'].map((card) => (
                    <span
                      key={card}
                      className="text-xs bg-primary/5 px-2 py-1 rounded"
                    >
                      {card}
                    </span>
                  ))}
                </div>
              </motion.section>

              {/* Submit Button (Mobile) */}
              <div className="lg:hidden">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full relative"
                  size="lg"
                  disabled={isProcessing}
                >
                  <span className={isProcessing ? 'opacity-0' : ''}>
                    Pay {formatPrice(total)}
                  </span>
                  {isProcessing && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-5 h-5 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-secondary p-6 rounded-lg sticky top-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="font-heading text-xl font-semibold mb-6">
                Order Summary ({itemCount} items)
              </h2>

              {/* Order Items */}
              <div className="space-y-4 pb-6 border-b border-primary/10 max-h-[300px] overflow-y-auto">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-4"
                    >
                      <div className="relative w-16 h-20 flex-shrink-0 bg-background rounded overflow-hidden">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-secondary text-xs flex items-center justify-center rounded-full">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-primary/60 mt-1">
                          {item.selectedSize} / {item.selectedColor.name}
                        </p>
                        <p className="text-sm font-medium mt-1">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Totals */}
              <div className="space-y-3 py-6 border-b border-primary/10 text-sm">
                <div className="flex justify-between">
                  <span className="text-primary/60">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/60">Shipping</span>
                  <span className={shipping === 0 ? 'text-accent font-medium' : ''}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/60">Tax (8%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>

              <div className="flex justify-between py-6 font-heading text-lg font-semibold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              {/* Submit Button (Desktop) */}
              <div className="hidden lg:block">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full relative"
                  size="lg"
                  disabled={isProcessing}
                  onClick={handleSubmit}
                >
                  <span className={isProcessing ? 'opacity-0' : ''}>
                    Pay {formatPrice(total)}
                  </span>
                  {isProcessing && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-5 h-5 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
                    </span>
                  )}
                </Button>
              </div>

              {/* Security Badges */}
              <div className="mt-6 pt-6 border-t border-primary/10">
                <div className="flex items-center justify-center gap-4 text-primary/40">
                  <div className="flex items-center gap-1">
                    <Shield size={14} />
                    <span className="text-xs">Secure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Lock size={14} />
                    <span className="text-xs">Encrypted</span>
                  </div>
                </div>
                <p className="text-xs text-primary/40 text-center mt-2">
                  Your payment is protected by SSL encryption
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
