"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, CreditCard, Truck, Shield, Check, CheckCircle } from "lucide-react";
import { useCart, useToast } from "@/context";

const steps = ["Information", "Shipping", "Payment"];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { items, subtotal, clearCart } = useCart();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
    shippingMethod: "standard",
    paymentMethod: "card",
  });

  const shipping = formData.shippingMethod === "express" ? 25 : (subtotal > 200 ? 0 : 25);
  const total = subtotal + shipping;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsComplete(true);
    clearCart();
    showToast("Order placed successfully!", "success");
  };

  if (items.length === 0 && !isComplete) {
    return (
      <div className="pt-20 lg:pt-24 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-primary mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add some items to your cart before checking out.
          </p>
          <Link href="/shop" className="btn-primary">
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="pt-20 lg:pt-24 min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-primary mb-4">
            Thank You!
          </h1>
          <p className="text-gray-600 mb-2">
            Your order has been placed successfully.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Order confirmation has been sent to {formData.email || "your email"}.
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
            <Link href="/cart" className="text-gray-500 hover:text-primary transition-colors">
              Cart
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-primary">Checkout</span>
          </nav>
        </div>
      </div>

      {/* Checkout Content */}
      <section className="py-8 lg:py-12">
        <div className="container-custom">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <button
                  onClick={() => index < currentStep && setCurrentStep(index)}
                  disabled={index > currentStep}
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                    index <= currentStep
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300 text-gray-400"
                  } ${index < currentStep ? "cursor-pointer hover:bg-accent hover:border-accent" : ""}`}
                >
                  {index < currentStep ? (
                    <Check size={16} />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </button>
                <span
                  className={`ml-2 text-sm font-medium hidden sm:block ${
                    index <= currentStep ? "text-primary" : "text-gray-400"
                  }`}
                >
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 sm:w-24 h-0.5 mx-4 ${
                      index < currentStep ? "bg-primary" : "bg-gray-300"
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
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {/* Contact Information */}
                  <div className="mb-8">
                    <h2 className="font-serif text-xl font-bold text-primary mb-6">
                      Contact Information
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary transition-colors"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="mb-8">
                    <h2 className="font-serif text-xl font-bold text-primary mb-6">
                      Shipping Address
                    </h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">
                          Address *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary transition-colors"
                          placeholder="Street address"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-2">
                            Country *
                          </label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary transition-colors bg-white"
                          >
                            <option value="">Select</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="UK">United Kingdom</option>
                            <option value="DE">Germany</option>
                            <option value="FR">France</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-2">
                            Postal Code *
                          </label>
                          <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div className="mb-8">
                    <h2 className="font-serif text-xl font-bold text-primary mb-6">
                      Shipping Method
                    </h2>
                    <div className="space-y-3">
                      <label className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                        formData.shippingMethod === "standard"
                          ? "border-primary bg-gray-50"
                          : "border-gray-300 hover:border-primary"
                      }`}>
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="standard"
                            checked={formData.shippingMethod === "standard"}
                            onChange={handleInputChange}
                            className="accent-primary"
                          />
                          <div>
                            <p className="font-medium text-primary">
                              Standard Shipping
                            </p>
                            <p className="text-sm text-gray-500">5-7 business days</p>
                          </div>
                        </div>
                        <span className="font-medium">
                          {subtotal > 200 ? "FREE" : "$25.00"}
                        </span>
                      </label>
                      <label className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                        formData.shippingMethod === "express"
                          ? "border-primary bg-gray-50"
                          : "border-gray-300 hover:border-primary"
                      }`}>
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="express"
                            checked={formData.shippingMethod === "express"}
                            onChange={handleInputChange}
                            className="accent-primary"
                          />
                          <div>
                            <p className="font-medium text-primary">
                              Express Shipping
                            </p>
                            <p className="text-sm text-gray-500">2-3 business days</p>
                          </div>
                        </div>
                        <span className="font-medium">$25.00</span>
                      </label>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-8">
                    <h2 className="font-serif text-xl font-bold text-primary mb-6">
                      Payment Method
                    </h2>
                    <div className="space-y-3">
                      <label className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${
                        formData.paymentMethod === "card"
                          ? "border-primary bg-gray-50"
                          : "border-gray-300 hover:border-primary"
                      }`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === "card"}
                          onChange={handleInputChange}
                          className="accent-primary"
                        />
                        <CreditCard size={20} className="text-gray-500" />
                        <span className="font-medium text-primary">
                          Credit / Debit Card
                        </span>
                      </label>
                    </div>

                    {formData.paymentMethod === "card" && (
                      <div className="mt-4 p-4 bg-gray-50 space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-2">
                            Card Number
                          </label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary transition-colors bg-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary transition-colors bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                              CVV
                            </label>
                            <input
                              type="text"
                              placeholder="123"
                              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary transition-colors bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Place Order Button */}
                  <button type="submit" className="btn-primary w-full">
                    PLACE ORDER
                  </button>
                </motion.div>
              </form>
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

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                      <div className="w-16 h-20 bg-gray-200 flex-shrink-0 relative overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-primary text-sm line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.size} / {item.color} / Qty: {item.quantity}
                        </p>
                        <p className="font-medium text-primary mt-2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="border-gray-300 mb-6" />

                {/* Totals */}
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <hr className="border-gray-300 mb-6" />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Truck size={18} className="text-accent" />
                    <span>Free shipping over $200</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Shield size={18} className="text-accent" />
                    <span>Secure checkout</span>
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
