"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, CreditCard, Truck, Check, Lock } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCart();
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.zipCode) newErrors.zipCode = "ZIP code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.cardNumber) newErrors.cardNumber = "Card number is required";
    if (!formData.cardName) newErrors.cardName = "Name on card is required";
    if (!formData.expiry) newErrors.expiry = "Expiry date is required";
    if (!formData.cvv) newErrors.cvv = "CVV is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearCart();
    showToast("Order placed successfully!", "success");
    router.push("/");
  };

  const subtotal = getSubtotal();
  const shipping = subtotal > 200 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const steps = [
    { number: 1, title: "Information", icon: Truck },
    { number: 2, title: "Payment", icon: CreditCard },
    { number: 3, title: "Review", icon: Check },
  ];

  if (items.length === 0) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="heading-lg mb-4">No Items to Checkout</h1>
          <p className="text-gray-500 mb-8">Your cart is empty. Add some items before checkout.</p>
          <Link href="/shop">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container-custom py-6">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center">
                <button
                  onClick={() => step > s.number && setStep(s.number)}
                  disabled={step < s.number}
                  className={cn(
                    "flex items-center gap-2 transition-colors",
                    step >= s.number ? "text-primary" : "text-gray-400",
                    step > s.number && "cursor-pointer hover:text-accent"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all",
                      step >= s.number
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300"
                    )}
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
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-8 md:w-16 h-px mx-2 md:mx-4 transition-colors",
                      step > s.number ? "bg-primary" : "bg-gray-300"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Checkout Content */}
      <section className="section-padding-sm">
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
                  <div className="bg-white p-6 md:p-8">
                    <h2 className="heading-sm mb-6">Contact & Shipping</h2>

                    <div className="space-y-6">
                      <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        error={errors.email}
                        required
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Input
                          label="First Name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          error={errors.firstName}
                          required
                        />
                        <Input
                          label="Last Name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          error={errors.lastName}
                          required
                        />
                      </div>

                      <Input
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Street address"
                        error={errors.address}
                        required
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <Input
                          label="City"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          error={errors.city}
                          required
                        />
                        <Input
                          label="State"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          error={errors.state}
                          required
                        />
                        <Input
                          label="ZIP Code"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          error={errors.zipCode}
                          required
                        />
                      </div>

                      <Input
                        label="Phone (Optional)"
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
                      <Button onClick={handleContinue}>Continue to Payment</Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                  <div className="bg-white p-6 md:p-8">
                    <h2 className="heading-sm mb-6">Payment Method</h2>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 p-3 bg-background rounded">
                      <Lock size={16} className="text-accent" />
                      Your payment information is secure and encrypted
                    </div>

                    <div className="space-y-6">
                      <Input
                        label="Card Number"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        error={errors.cardNumber}
                        required
                      />

                      <Input
                        label="Name on Card"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        error={errors.cardName}
                        required
                      />

                      <div className="grid grid-cols-2 gap-6">
                        <Input
                          label="Expiry Date"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          error={errors.expiry}
                          required
                        />
                        <Input
                          label="CVV"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          error={errors.cvv}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button variant="ghost" onClick={() => setStep(1)}>
                        <ChevronLeft size={18} className="mr-2" />
                        Back
                      </Button>
                      <Button onClick={handleContinue}>Review Order</Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Review */}
                {step === 3 && (
                  <div className="bg-white p-6 md:p-8">
                    <h2 className="heading-sm mb-6">Review Your Order</h2>

                    {/* Shipping Info */}
                    <div className="border-b pb-6 mb-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-sm font-semibold uppercase tracking-wider">
                          Shipping Address
                        </h3>
                        <button
                          onClick={() => setStep(1)}
                          className="text-sm text-accent hover:underline"
                        >
                          Edit
                        </button>
                      </div>
                      <p className="text-gray-600">
                        {formData.firstName} {formData.lastName}
                        <br />
                        {formData.address}
                        <br />
                        {formData.city}, {formData.state} {formData.zipCode}
                        <br />
                        {formData.email}
                      </p>
                    </div>

                    {/* Payment Info */}
                    <div className="border-b pb-6 mb-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-sm font-semibold uppercase tracking-wider">
                          Payment Method
                        </h3>
                        <button
                          onClick={() => setStep(2)}
                          className="text-sm text-accent hover:underline"
                        >
                          Edit
                        </button>
                      </div>
                      <p className="text-gray-600 flex items-center gap-2">
                        <CreditCard size={18} />
                        Card ending in {formData.cardNumber.slice(-4) || "****"}
                      </p>
                    </div>

                    {/* Items */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                        Order Items ({items.length})
                      </h3>
                      <div className="space-y-4 max-h-64 overflow-y-auto">
                        {items.map((item) => (
                          <div
                            key={`${item.product.id}-${item.size}-${item.color}`}
                            className="flex gap-4"
                          >
                            <div className="relative w-16 h-20 bg-gray-100 flex-shrink-0">
                              <Image
                                src={item.product.image}
                                alt={item.product.name}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{item.product.name}</p>
                              <p className="text-sm text-gray-500">
                                {item.size} / {item.color} × {item.quantity}
                              </p>
                            </div>
                            <p className="font-medium">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button variant="ghost" onClick={() => setStep(2)}>
                        <ChevronLeft size={18} className="mr-2" />
                        Back
                      </Button>
                      <Button
                        size="lg"
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <span className="flex items-center gap-2">
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Processing...
                          </span>
                        ) : (
                          `Place Order - $${total.toFixed(2)}`
                        )}
                      </Button>
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
                  {items.slice(0, 3).map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      className="flex gap-3"
                    >
                      <div className="relative w-12 h-16 bg-gray-100 flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
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
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.size} / {item.color}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  {items.length > 3 && (
                    <p className="text-sm text-gray-500 text-center">
                      +{items.length - 3} more items
                    </p>
                  )}
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
