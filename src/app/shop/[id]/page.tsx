'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Minus, Plus, ChevronLeft, ChevronRight, Check, Truck, RotateCcw, Shield } from 'lucide-react';
import { Button, ProductCard, SectionHeader } from '@/components/ui';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/Toast';
import { products } from '@/data/products';
import { cn, formatPrice } from '@/lib/utils';
import type { ProductColor } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const product = products.find((p) => p.id === params.id);
  const { addItem, setCartOpen } = useCart();
  const { showToast } = useToast();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    if (product && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="heading-lg mb-4">Product Not Found</h1>
          <p className="text-primary/60 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/shop">
            <Button variant="primary">Back to Shop</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setSizeError(true);
      showToast('Please select a size', 'error');
      return;
    }

    if (!selectedColor) {
      showToast('Please select a color', 'error');
      return;
    }

    setIsAdding(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    addItem(product, selectedSize, selectedColor, quantity);
    setIsAdding(false);
    showToast(`${product.name} added to cart`, 'success');
    setCartOpen(true);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    showToast(
      isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      'success'
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const features = [
    { icon: Truck, text: 'Free shipping over $500' },
    { icon: RotateCcw, text: '30-day easy returns' },
    { icon: Shield, text: 'Secure checkout' },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      {/* Breadcrumb */}
      <div className="container-custom py-4">
        <nav className="text-sm text-primary/60" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/shop" className="hover:text-accent transition-colors">Shop</Link></li>
            <li>/</li>
            <li className="text-primary font-medium truncate max-w-[200px]">{product.name}</li>
          </ol>
        </nav>
      </div>

      {/* Product Section */}
      <section className="container-custom py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="relative aspect-[3/4] bg-background overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-secondary/90 flex items-center justify-center hover:bg-accent hover:text-primary transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-secondary/90 flex items-center justify-center hover:bg-accent hover:text-primary transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-primary text-secondary text-xs px-3 py-1 uppercase tracking-wider font-medium">
                    New
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="bg-accent text-primary text-xs px-3 py-1 uppercase tracking-wider font-medium">
                    Best Seller
                  </span>
                )}
                {product.originalPrice && (
                  <span className="bg-red-500 text-white text-xs px-3 py-1 uppercase tracking-wider font-medium">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% Off
                  </span>
                )}
              </div>

              {/* Image Counter */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary/70 text-secondary text-xs px-3 py-1 rounded-full">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      'relative w-20 h-24 flex-shrink-0 overflow-hidden border-2 transition-all',
                      currentImageIndex === index
                        ? 'border-accent'
                        : 'border-transparent opacity-60 hover:opacity-100 hover:border-primary/20'
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
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
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <span className="text-primary/50 text-xs uppercase tracking-[0.2em]">
              {product.category}
            </span>
            <h1 className="heading-lg mt-2 mb-4">{product.name}</h1>
            
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-heading font-semibold">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-primary/40 line-through text-lg">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-primary/70 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium uppercase tracking-wider">
                  Color
                </h4>
                <span className="text-sm text-primary/60">{selectedColor?.name}</span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      'w-10 h-10 rounded-full border-2 transition-all relative hover:scale-110',
                      selectedColor?.name === color.name
                        ? 'border-accent ring-2 ring-accent/30'
                        : 'border-primary/20 hover:border-primary/40'
                    )}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                    aria-pressed={selectedColor?.name === color.name}
                  >
                    {selectedColor?.name === color.name && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Check
                          size={16}
                          className={cn(
                            color.hex === '#FFFFFF' || color.hex === '#FFFFF0'
                              ? 'text-primary'
                              : 'text-secondary'
                          )}
                        />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className={cn(
                  'text-sm font-medium uppercase tracking-wider',
                  sizeError && 'text-red-500'
                )}>
                  Size {sizeError && '*'}
                </h4>
                <button className="text-xs text-accent hover:underline">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={cn(
                      'min-w-[48px] h-11 px-4 border text-sm font-medium transition-all',
                      selectedSize === size
                        ? 'bg-primary text-secondary border-primary'
                        : sizeError
                          ? 'border-red-300 hover:border-red-500'
                          : 'border-primary/20 hover:border-primary'
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
              <h4 className="text-sm font-medium uppercase tracking-wider mb-3">
                Quantity
              </h4>
              <div className="flex items-center border border-primary/20 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 flex items-center justify-center hover:bg-background transition-colors disabled:opacity-50"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 h-11 flex items-center justify-center font-medium border-x border-primary/20">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 flex items-center justify-center hover:bg-background transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-6">
              <Button
                variant="primary"
                size="lg"
                className="flex-1 relative overflow-hidden"
                onClick={handleAddToCart}
                disabled={!product.inStock || isAdding}
              >
                <span className={cn(
                  'transition-all duration-300',
                  isAdding ? 'opacity-0' : 'opacity-100'
                )}>
                  {product.inStock ? `Add to Cart - ${formatPrice(product.price * quantity)}` : 'Out of Stock'}
                </span>
                {isAdding && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span className="w-5 h-5 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
                  </motion.span>
                )}
              </Button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWishlist}
                className={cn(
                  'w-14 h-14 border flex items-center justify-center transition-all',
                  isWishlisted
                    ? 'bg-accent border-accent text-primary'
                    : 'border-primary/20 hover:border-primary hover:bg-background'
                )}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                aria-pressed={isWishlisted}
              >
                <Heart size={20} className={cn(isWishlisted && 'fill-primary')} />
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-primary/10">
              {features.map((feature) => (
                <div key={feature.text} className="text-center">
                  <feature.icon size={20} className="mx-auto text-accent mb-2" />
                  <p className="text-xs text-primary/60">{feature.text}</p>
                </div>
              ))}
            </div>

            {/* Product Details */}
            <div className="pt-6">
              <h4 className="text-sm font-medium uppercase tracking-wider mb-4">
                Product Details
              </h4>
              <ul className="text-sm text-primary/70 space-y-2">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-accent" />
                  Premium quality materials
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-accent" />
                  Ethically sourced and crafted
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-accent" />
                  Dry clean recommended
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-accent" />
                  Made in Italy
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-custom">
            <SectionHeader
              title="You May Also Like"
              subtitle="Explore similar pieces from our collection"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
