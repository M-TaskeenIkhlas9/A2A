"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Heart, Share2, Truck, RotateCcw, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui";
import { ProductCard } from "@/components/cards";
import { getProductById, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

export default function ProductPage() {
  const params = useParams();
  const product = getProductById(params.id as string);
  const { addItem } = useCart();
  const { showToast } = useToast();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

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

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast("Please select a size", "warning");
      return;
    }
    if (!selectedColor) {
      showToast("Please select a color", "warning");
      return;
    }

    setIsAdding(true);
    addItem(product, selectedSize, selectedColor, quantity);
    showToast(`${product.name} added to cart`, "success");

    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    showToast(
      isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      isWishlisted ? "info" : "success"
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("Link copied to clipboard", "success");
  };

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="container-custom py-4">
        <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
          <ol className="flex items-center">
            <li>
              <Link href="/" className="hover:text-accent transition-colors focus:outline-none focus-visible:text-accent">
                Home
              </Link>
            </li>
            <li className="mx-2" aria-hidden="true">/</li>
            <li>
              <Link href="/shop" className="hover:text-accent transition-colors focus:outline-none focus-visible:text-accent">
                Shop
              </Link>
            </li>
            <li className="mx-2" aria-hidden="true">/</li>
            <li>
              <span className="text-primary" aria-current="page">{product.name}</span>
            </li>
          </ol>
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
              <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[activeImage]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-primary text-secondary text-xs font-medium uppercase tracking-wider px-3 py-1 z-10">
                    New
                  </span>
                )}
                {hasDiscount && (
                  <span className="absolute top-4 right-4 bg-accent text-primary text-xs font-medium uppercase tracking-wider px-3 py-1 z-10">
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
                        "relative w-20 h-24 bg-gray-100 border-2 transition-all",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                        activeImage === index ? "border-primary" : "border-transparent hover:border-gray-300"
                      )}
                      aria-label={`View image ${index + 1}`}
                      aria-current={activeImage === index}
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
                  <>
                    <span className="text-gray-400 line-through text-lg">
                      ${product.originalPrice}
                    </span>
                    <span className="bg-accent/20 text-accent px-2 py-1 text-xs font-medium uppercase">
                      Save ${(product.originalPrice! - product.price).toFixed(0)}
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">
                  Color: <span className="font-normal text-gray-600">{selectedColor || "Select a color"}</span>
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 transition-all relative",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                        selectedColor === color.name
                          ? "border-primary scale-110"
                          : "border-gray-200 hover:border-gray-400"
                      )}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                      aria-label={`Select ${color.name}`}
                      aria-pressed={selectedColor === color.name}
                    >
                      {selectedColor === color.name && (
                        <Check
                          size={16}
                          className={cn(
                            "absolute inset-0 m-auto",
                            color.value === "#000000" || color.value === "#1a237e"
                              ? "text-white"
                              : "text-primary"
                          )}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider">
                    Size: <span className="font-normal text-gray-600">{selectedSize || "Select a size"}</span>
                  </h3>
                  <button className="text-sm text-accent hover:underline focus:outline-none focus-visible:underline">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "min-w-[48px] h-12 px-4 border text-sm font-medium transition-all",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                        selectedSize === size
                          ? "border-primary bg-primary text-secondary"
                          : "border-gray-300 hover:border-primary"
                      )}
                      aria-pressed={selectedSize === size}
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
                    disabled={quantity <= 1}
                    className={cn(
                      "w-12 h-12 flex items-center justify-center transition-colors",
                      "focus:outline-none focus-visible:bg-gray-100",
                      quantity <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                    )}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-16 text-center font-medium" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors focus:outline-none focus-visible:bg-gray-100"
                    aria-label="Increase quantity"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Button
                  size="lg"
                  className="flex-1 min-w-[200px]"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                >
                  {isAdding ? (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2"
                    >
                      <Check size={18} /> Added!
                    </motion.span>
                  ) : (
                    "Add to Cart"
                  )}
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-12 !px-0"
                  onClick={handleWishlist}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  aria-pressed={isWishlisted}
                >
                  <Heart
                    size={20}
                    className={cn(
                      "transition-colors",
                      isWishlisted && "fill-red-500 text-red-500"
                    )}
                  />
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-12 !px-0"
                  onClick={handleShare}
                  aria-label="Share product"
                >
                  <Share2 size={20} />
                </Button>
              </div>

              {/* Features */}
              <div className="border-t pt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
                    <Truck size={20} className="text-accent" />
                  </div>
                  <span>Free shipping on orders over $200</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
                    <RotateCcw size={20} className="text-accent" />
                  </div>
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
                    <Shield size={20} className="text-accent" />
                  </div>
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
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-md text-center mb-12"
            >
              You May Also Like
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
