"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Minus, Plus, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";

const product = {
  id: 1,
  name: "Classic Black Blazer",
  price: 299,
  description:
    "Crafted from premium Italian wool, this classic black blazer features a tailored fit with subtle satin lapels. Perfect for both formal occasions and elevated casual wear, it embodies the essence of timeless sophistication.",
  details: [
    "100% Italian Wool",
    "Satin-lined interior",
    "Two-button closure",
    "Notch lapels",
    "Three interior pockets",
    "Dry clean only",
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: [
    { name: "Black", hex: "#000000" },
    { name: "Navy", hex: "#1a1a2e" },
    { name: "Charcoal", hex: "#36454F" },
  ],
  images: [
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80",
  ],
};

const relatedProducts = [
  { id: 2, name: "Silk Cream Blouse", price: 189, image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Tailored Wool Pants", price: 249, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Leather Tote Bag", price: 399, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Cashmere Sweater", price: 349, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=400&q=80" },
];

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="pt-20 md:pt-24">
      {/* Breadcrumb */}
      <div className="container py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-black transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
              <img
                src={product.images[currentImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`aspect-square overflow-hidden bg-gray-100 ${
                    currentImage === index ? "ring-2 ring-black" : ""
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:py-8"
          >
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              {product.name}
            </h1>
            <p className="text-2xl mb-6">${product.price}</p>
            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium uppercase tracking-wider mb-3">
                Color: {selectedColor.name}
              </h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor.name === color.name
                        ? "border-[#C9A96E] scale-110"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium uppercase tracking-wider">
                  Size
                </h3>
                <button className="text-sm text-gray-500 underline hover:text-black transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-12 border text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm font-medium uppercase tracking-wider mb-3">
                Quantity
              </h3>
              <div className="inline-flex items-center border border-gray-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 h-12 flex items-center justify-center border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="flex-1 py-4 bg-black text-white font-medium uppercase tracking-wider text-sm hover:bg-[#C9A96E] transition-colors">
                Add to Cart
              </button>
              <button
                className="w-14 h-14 border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart size={20} />
              </button>
              <button
                className="w-14 h-14 border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
                aria-label="Share"
              >
                <Share2 size={20} />
              </button>
            </div>

            {/* Details */}
            <div className="border-t pt-8">
              <h3 className="text-sm font-medium uppercase tracking-wider mb-4">
                Product Details
              </h3>
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    • {detail}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 md:py-24 bg-[#F5F5F5]">
        <div className="container">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/product/${item.id}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-white mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-sm font-medium mb-1 group-hover:text-[#C9A96E] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600">${item.price}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
