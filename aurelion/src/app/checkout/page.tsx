"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, CreditCard, Truck, Shield } from "lucide-react";

const orderItems = [
  {
    id: 1,
    name: "Classic Black Blazer",
    price: 299,
    size: "M",
    quantity: 1,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 2,
    name: "Silk Cream Blouse",
    price: 189,
    size: "S",
    quantity: 2,
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=100&q=80",
  },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    phone: "",
    shippingMethod: "standard",
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = formData.shippingMethod === "express" ? 35 : subtotal > 500 ? 0 : 25;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pt-20 md:pt-24 bg-[#F5F5F5] min-h-screen">
      {/* Breadcrumb */}
      <div className="container py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/cart" className="hover:text-black transition-colors">
            Cart
          </Link>
          <ChevronRight size={14} />
          <span className={step >= 1 ? "text-black" : ""}>Information</span>
          <ChevronRight size={14} />
          <span className={step >= 2 ? "text-black" : ""}>Shipping</span>
          <ChevronRight size={14} />
          <span className={step >= 3 ? "text-black" : ""}>Payment</span>
        </nav>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <motion.div
              className="bg-white p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Step 1: Contact & Shipping Info */}
              {step === 1 && (
                <div>
                  <h2 className="font-serif text-2xl font-bold mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-4 mb-8">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email address"
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <h2 className="font-serif text-2xl font-bold mb-6">
                    Shipping Address
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First name"
                      className="px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last name"
                      className="px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                      required
                    />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Address"
                      className="md:col-span-2 px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                      required
                    />
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State"
                        className="px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                        required
                      />
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        placeholder="ZIP code"
                        className="px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                      className="px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="w-full mt-8 py-4 bg-black text-white font-medium uppercase tracking-wider text-sm hover:bg-[#C9A96E] transition-colors"
                  >
                    Continue to Shipping
                  </button>
                </div>
              )}

              {/* Step 2: Shipping Method */}
              {step === 2 && (
                <div>
                  <h2 className="font-serif text-2xl font-bold mb-6">
                    Shipping Method
                  </h2>
                  <div className="space-y-4">
                    <label
                      className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                        formData.shippingMethod === "standard"
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="standard"
                          checked={formData.shippingMethod === "standard"}
                          onChange={handleInputChange}
                          className="w-4 h-4 accent-black"
                        />
                        <div>
                          <p className="font-medium">Standard Shipping</p>
                          <p className="text-sm text-gray-500">5-7 business days</p>
                        </div>
                      </div>
                      <span>{subtotal > 500 ? "Free" : "$25"}</span>
                    </label>
                    <label
                      className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                        formData.shippingMethod === "express"
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="express"
                          checked={formData.shippingMethod === "express"}
                          onChange={handleInputChange}
                          className="w-4 h-4 accent-black"
                        />
                        <div>
                          <p className="font-medium">Express Shipping</p>
                          <p className="text-sm text-gray-500">2-3 business days</p>
                        </div>
                      </div>
                      <span>$35</span>
                    </label>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => setStep(1)}
                      className="px-8 py-4 border border-gray-300 font-medium uppercase tracking-wider text-sm hover:border-black transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 py-4 bg-black text-white font-medium uppercase tracking-wider text-sm hover:bg-[#C9A96E] transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div>
                  <h2 className="font-serif text-2xl font-bold mb-6">
                    Payment Details
                  </h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="nameOnCard"
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                      placeholder="Name on card"
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                      required
                    />
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="Card number"
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        placeholder="MM / YY"
                        className="px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                        required
                      />
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="CVV"
                        className="px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => setStep(2)}
                      className="px-8 py-4 border border-gray-300 font-medium uppercase tracking-wider text-sm hover:border-black transition-colors"
                    >
                      Back
                    </button>
                    <button className="flex-1 py-4 bg-black text-white font-medium uppercase tracking-wider text-sm hover:bg-[#C9A96E] transition-colors">
                      Place Order - ${total}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="flex flex-col items-center text-center p-4">
                <Shield size={24} className="text-[#C9A96E] mb-2" />
                <p className="text-xs text-gray-600">Secure Checkout</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <Truck size={24} className="text-[#C9A96E] mb-2" />
                <p className="text-xs text-gray-600">Free Returns</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <CreditCard size={24} className="text-[#C9A96E] mb-2" />
                <p className="text-xs text-gray-600">Encrypted Payment</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <motion.div
              className="bg-white p-6 md:p-8 sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-serif text-xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="divide-y">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4">
                    <div className="relative w-16 h-20 bg-gray-100 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-xs flex items-center justify-center rounded-full">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Size: {item.size}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax}</span>
                </div>
              </div>

              <div className="flex justify-between py-6 border-t mt-4">
                <span className="font-medium">Total</span>
                <span className="font-bold text-xl">${total}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
