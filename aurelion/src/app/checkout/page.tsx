"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, CreditCard, Truck, Check } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { products } from "@/data/products";

const mockOrderItems = [
  { productId: "1", size: "M", color: "Black", quantity: 1 },
  { productId: "2", size: "S", color: "Gold", quantity: 2 },
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
    zipCode: "",
    country: "United States",
    phone: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getProductDetails = (productId: string) => {
    return products.find((p) => p.id === productId);
  };

  const subtotal = mockOrderItems.reduce((total, item) => {
    const product = getProductDetails(item.productId);
    return total + (product?.price || 0) * item.quantity;
  }, 0);

  const shipping = subtotal > 200 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const steps = [
    { number: 1, title: "Information", icon: Truck },
    { number: 2, title: "Payment", icon: CreditCard },
    { number: 3, title: "Review", icon: Check },
  ];

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container-custom py-6">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center">
                <div
                  className={`flex items-center gap-2 ${
                    step >= s.number ? "text-primary" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      step >= s.number
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {step > s.number ? (
                      <Check size={16} />
                    ) : (
                      <span className="text-sm font-medium">{s.number}</span>
                    )}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">
                    {s.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 md:w-16 h-px mx-2 md:mx-4 ${
                      step > s.number ? "bg-primary" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Checkout Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step 1: Information */}
                {step === 1 && (
                  <div className="bg-white p-8">
                    <h2 className="heading-sm mb-6">Contact & Shipping</h2>

                    <div className="space-y-6">
                      <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Input
                          label="First Name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                        <Input
                          label="Last Name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <Input
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Street address"
                        required
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <Input
                          label="City"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                        <Input
                          label="State"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                        />
                        <Input
                          label="ZIP Code"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <Input
                        label="Phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div className="flex justify-between mt-8">
                      <Link href="/cart">
                        <Button variant="ghost">
                          <ChevronLeft size={18} className="mr-2" />
                          Back to Cart
                        </Button>
                      </Link>
                      <Button onClick={() => setStep(2)}>Continue to Payment</Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                  <div className="bg-white p-8">
                    <h2 className="heading-sm mb-6">Payment Method</h2>

                    <div className="space-y-6">
                      <Input
                        label="Card Number"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        required
                      />

                      <Input
                        label="Name on Card"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                      />

                      <div className="grid grid-cols-2 gap-6">
                        <Input
                          label="Expiry Date"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          required
                        />
                        <Input
                          label="CVV"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button variant="ghost" onClick={() => setStep(1)}>
                        <ChevronLeft size={18} className="mr-2" />
                        Back
                      </Button>
                      <Button onClick={() => setStep(3)}>Review Order</Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Review */}
                {step === 3 && (
                  <div className="bg-white p-8">
                    <h2 className="heading-sm mb-6">Review Your Order</h2>

                    {/* Shipping Info */}
                    <div className="border-b pb-6 mb-6">
                      <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">
                        Shipping Address
                      </h3>
                      <p className="text-gray-600">
                        {formData.firstName} {formData.lastName}
                        <br />
                        {formData.address}
                        <br />
                        {formData.city}, {formData.state} {formData.zipCode}
                      </p>
                    </div>

                    {/* Payment Info */}
                    <div className="border-b pb-6 mb-6">
                      <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">
                        Payment Method
                      </h3>
                      <p className="text-gray-600">
                        Card ending in {formData.cardNumber.slice(-4) || "****"}
                      </p>
                    </div>

                    {/* Items */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                        Order Items
                      </h3>
                      <div className="space-y-4">
                        {mockOrderItems.map((item) => {
                          const product = getProductDetails(item.productId);
                          if (!product) return null;

                          return (
                            <div
                              key={`${item.productId}-${item.size}`}
                              className="flex gap-4"
                            >
                              <div className="relative w-16 h-20 bg-gray-100 flex-shrink-0">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                  sizes="64px"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-gray-500">
                                  {item.size} / {item.color} × {item.quantity}
                                </p>
                              </div>
                              <p className="font-medium">
                                ${(product.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button variant="ghost" onClick={() => setStep(2)}>
                        <ChevronLeft size={18} className="mr-2" />
                        Back
                      </Button>
                      <Button size="lg">Place Order</Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 sticky top-24">
                <h2 className="heading-sm mb-6">Order Summary</h2>

                {/* Items Preview */}
                <div className="space-y-4 mb-6 pb-6 border-b">
                  {mockOrderItems.map((item) => {
                    const product = getProductDetails(item.productId);
                    if (!product) return null;

                    return (
                      <div
                        key={`${item.productId}-${item.size}`}
                        className="flex gap-3"
                      >
                        <div className="relative w-12 h-16 bg-gray-100 flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                          <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.size} / {item.color}
                          </p>
                        </div>
                        <p className="text-sm font-medium">
                          ${(product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Totals */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
