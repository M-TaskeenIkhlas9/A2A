"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, Heart, Share2, Truck, RotateCcw, Shield } from "lucide-react";
import { Button } from "@/components/ui";
import { ProductCard } from "@/components/cards";
import { getProductById, products } from "@/data/products";
import { cn } from "@/lib/utils";

export default function ProductPage() {
  const params = useParams();
  const product = getProductById(params.id as string);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-lg mb-4">Product Not Found</h1>
          <p className="text-gray-500 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = [product.image, product.hoverImage].filter(Boolean) as string[];
  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="container-custom py-4">
        <nav className="text-sm text-gray-500">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-accent transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-primary">{product.name}</span>
        </nav>
      </div>

      {/* Product Details */}
      <section className="section-padding pt-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Main Image */}
              <div className="relative aspect-[3/4] bg-gray-100 mb-4">
                <Image
                  src={images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-primary text-secondary text-xs font-medium uppercase tracking-wider px-3 py-1">
                    New
                  </span>
                )}
                {hasDiscount && (
                  <span className="absolute top-4 right-4 bg-accent text-primary text-xs font-medium uppercase tracking-wider px-3 py-1">
                    Sale
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-4">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={cn(
                        "relative w-20 h-24 bg-gray-100 border-2 transition-colors",
                        activeImage === index ? "border-primary" : "border-transparent"
                      )}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="heading-md mb-4">{product.name}</h1>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-semibold">${product.price}</span>
                {hasDiscount && (
                  <span className="text-gray-400 line-through text-lg">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-8">{product.description}</p>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">
                  Color: {selectedColor || "Select a color"}
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 transition-all",
                        selectedColor === color.name
                          ? "border-primary scale-110"
                          : "border-gray-200"
                      )}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                      aria-label={`Select ${color.name}`}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">
                  Size: {selectedSize || "Select a size"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "min-w-[48px] h-12 px-4 border text-sm font-medium transition-all",
                        selectedSize === size
                          ? "border-primary bg-primary text-secondary"
                          : "border-gray-300 hover:border-primary"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">
                  Quantity
                </h3>
                <div className="flex items-center border w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-16 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Button size="lg" className="flex-1 min-w-[200px]">
                  Add to Cart
                </Button>
                <Button variant="secondary" size="lg" className="w-12 !px-0">
                  <Heart size={20} />
                </Button>
                <Button variant="secondary" size="lg" className="w-12 !px-0">
                  <Share2 size={20} />
                </Button>
              </div>

              {/* Features */}
              <div className="border-t pt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Truck size={20} className="text-accent" />
                  <span>Free shipping on orders over $200</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RotateCcw size={20} className="text-accent" />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield size={20} className="text-accent" />
                  <span>2-year warranty included</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-custom">
            <h2 className="heading-md text-center mb-12">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
