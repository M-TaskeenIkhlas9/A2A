"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Heart, Minus, Plus, Share2, Truck, RotateCcw, Shield } from "lucide-react";

const sizes = ["XS", "S", "M", "L", "XL"];
const colors = [
  { name: "Black", hex: "#000000" },
  { name: "Navy", hex: "#1a365d" },
  { name: "Beige", hex: "#d4c4a8" },
];

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const product = {
    name: "Premium Wool Blend Coat",
    price: 449,
    originalPrice: 599,
    description:
      "Crafted from the finest wool blend, this elegant coat combines timeless sophistication with modern comfort. Features a tailored fit, luxurious lining, and meticulous attention to detail that defines the AURELION experience.",
    images: [1, 2, 3, 4],
  };

  const relatedProducts = [
    { id: 1, name: "Silk Evening Dress", price: 389 },
    { id: 2, name: "Cashmere Sweater", price: 279 },
    { id: 3, name: "Tailored Trousers", price: 199 },
    { id: 4, name: "Leather Belt", price: 129 },
  ];

  return (
    <div className="pt-20 lg:pt-24">
      {/* Breadcrumb */}
      <div className="bg-background py-4">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary">
              Home
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link href="/shop" className="text-gray-500 hover:text-primary">
              Shop
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-primary">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-8 lg:py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-[3/4] bg-gray-100 mb-4">
                {/* Main image placeholder */}
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square bg-gray-100 border-2 transition-colors ${
                      activeImage === index
                        ? "border-primary"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:pl-8"
            >
              <span className="text-accent text-sm tracking-[0.2em] uppercase">
                New Arrival
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary mt-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mt-4">
                <span className="text-2xl font-semibold text-primary">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed mt-6">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mt-8">
                <h3 className="text-sm font-medium text-primary mb-3">
                  Color: <span className="text-gray-500">{selectedColor}</span>
                </h3>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color.name
                          ? "border-primary scale-110"
                          : "border-gray-200 hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-primary">
                    Size: <span className="text-gray-500">{selectedSize || "Select"}</span>
                  </h3>
                  <button className="text-sm text-accent hover:underline">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-12 border text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? "border-primary bg-primary text-white"
                          : "border-gray-300 text-gray-600 hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-gray-300">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 h-12 flex items-center justify-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <button className="btn-primary flex-1">ADD TO CART</button>
              </div>

              {/* Wishlist & Share */}
              <div className="flex items-center gap-6 mt-6">
                <button className="flex items-center gap-2 text-gray-600 hover:text-accent transition-colors">
                  <Heart size={20} />
                  <span className="text-sm">Add to Wishlist</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-accent transition-colors">
                  <Share2 size={20} />
                  <span className="text-sm">Share</span>
                </button>
              </div>

              {/* Features */}
              <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
                <div className="flex items-center gap-3">
                  <Truck size={20} className="text-accent" />
                  <span className="text-sm text-gray-600">
                    Free shipping on orders over $200
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw size={20} className="text-accent" />
                  <span className="text-sm text-gray-600">
                    30-day return policy
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield size={20} className="text-accent" />
                  <span className="text-sm text-gray-600">
                    Authenticity guaranteed
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container-custom">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/shop/related-${item.id}`} className="group">
                <div className="aspect-[3/4] bg-gray-200 mb-4 overflow-hidden">
                  <div className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-medium text-primary group-hover:text-accent transition-colors">
                  {item.name}
                </h3>
                <p className="text-gray-500 mt-1">${item.price}.00</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
