'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Minus, Plus, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button, ProductCard, SectionHeader } from '@/components/ui';
import { products } from '@/data/products';
import { cn, formatPrice } from '@/lib/utils';
import type { ProductColor } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const product = products.find((p) => p.id === params.id);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-lg mb-4">Product Not Found</h1>
          <Link href="/shop">
            <Button variant="primary">Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Breadcrumb */}
      <div className="container-custom py-4">
        <nav className="text-sm text-primary/60">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-primary">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-primary">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[3/4] bg-background overflow-hidden">
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-secondary/90 flex items-center justify-center hover:bg-secondary transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-secondary/90 flex items-center justify-center hover:bg-secondary transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-primary text-secondary text-xs px-3 py-1 uppercase tracking-wider">
                    New
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="bg-accent text-primary text-xs px-3 py-1 uppercase tracking-wider">
                    Best Seller
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-4 mt-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      'relative w-20 h-24 overflow-hidden border-2 transition-all',
                      currentImageIndex === index
                        ? 'border-primary'
                        : 'border-transparent opacity-60 hover:opacity-100'
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
          >
            <span className="text-primary/60 text-sm uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="heading-lg mt-2 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-medium">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-primary/50 line-through text-lg">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-primary/70 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="mb-6">
              <h4 className="text-sm font-medium uppercase tracking-wider mb-3">
                Color: {selectedColor?.name || 'Select a color'}
              </h4>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      'w-10 h-10 rounded-full border-2 transition-all relative',
                      selectedColor?.name === color.name
                        ? 'border-primary'
                        : 'border-transparent'
                    )}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                  >
                    {selectedColor?.name === color.name && (
                      <Check
                        size={16}
                        className={cn(
                          'absolute inset-0 m-auto',
                          color.hex === '#FFFFFF' || color.hex === '#FFFFF0'
                            ? 'text-primary'
                            : 'text-secondary'
                        )}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h4 className="text-sm font-medium uppercase tracking-wider mb-3">
                Size: {selectedSize || 'Select a size'}
              </h4>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      'min-w-[48px] h-12 px-4 border text-sm font-medium transition-all',
                      selectedSize === size
                        ? 'bg-primary text-secondary border-primary'
                        : 'border-primary/20 hover:border-primary'
                    )}
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
                  className="w-12 h-12 flex items-center justify-center hover:bg-background transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 h-12 flex items-center justify-center font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-background transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <Button
                variant={isAddedToCart ? 'accent' : 'primary'}
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {isAddedToCart ? 'Added to Cart!' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <button
                className="w-14 h-14 border border-primary/20 flex items-center justify-center hover:bg-background transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart size={20} />
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t border-primary/10 pt-8">
              <h4 className="text-sm font-medium uppercase tracking-wider mb-4">
                Product Details
              </h4>
              <ul className="text-sm text-primary/70 space-y-2">
                <li>Premium quality materials</li>
                <li>Ethically sourced and crafted</li>
                <li>Dry clean recommended</li>
                <li>Made in Italy</li>
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
