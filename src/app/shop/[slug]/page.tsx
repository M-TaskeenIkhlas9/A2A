"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Heart, Minus, Plus, Share2, Truck, RotateCcw, Shield } from "lucide-react";
import { ProductCard } from "@/components/product";
import { getProductBySlug, products } from "@/data/products";
import { useCart, useToast } from "@/context";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || "");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { addItem } = useCart();
  const { showToast } = useToast();

  if (!product) {
    return (
      <div className="pt-20 lg:pt-24 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-primary mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/shop" className="btn-primary">
            BACK TO SHOP
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast("Please select a size", "error");
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
    showToast(`${product.name} added to cart`, "cart");
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

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
            <Link href="/shop" className="text-gray-500 hover:text-primary transition-colors">
              Shop
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-primary truncate">{product.name}</span>
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
              <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-accent text-primary text-xs px-3 py-1 font-medium">
                    NEW
                  </span>
                )}
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative aspect-square bg-gray-100 border-2 transition-colors overflow-hidden ${
                      activeImage === index
                        ? "border-primary"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
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
              className="lg:pl-8"
            >
              {product.isNew && (
                <span className="text-accent text-sm tracking-[0.2em] uppercase">
                  New Arrival
                </span>
              )}
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary mt-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mt-4">
                <span className="text-2xl font-semibold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-sm text-red-500 font-medium">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
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
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color.name
                          ? "ring-2 ring-primary ring-offset-2"
                          : "hover:scale-110"
                      } ${color.hex === "#FFFFFF" ? "border-gray-300" : "border-transparent"}`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                      title={color.name}
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
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[3rem] px-3 h-12 border text-sm font-medium transition-all ${
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
                  <span className="w-12 h-12 flex items-center justify-center font-medium border-x border-gray-300">
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
                <button
                  onClick={handleAddToCart}
                  className="btn-primary flex-1"
                >
                  ADD TO CART
                </button>
              </div>

              {/* Wishlist & Share */}
              <div className="flex items-center gap-6 mt-6">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="flex items-center gap-2 text-gray-600 hover:text-accent transition-colors"
                >
                  <Heart
                    size={20}
                    className={isWishlisted ? "fill-red-500 text-red-500" : ""}
                  />
                  <span className="text-sm">
                    {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
                  </span>
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
      {relatedProducts.length > 0 && (
        <section className="py-12 lg:py-16 bg-background">
          <div className="container-custom">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  originalPrice={item.originalPrice}
                  image={item.images[0]}
                  hoverImage={item.images[1]}
                  slug={item.slug}
                  isNew={item.isNew}
                  isBestSeller={item.isBestSeller}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
