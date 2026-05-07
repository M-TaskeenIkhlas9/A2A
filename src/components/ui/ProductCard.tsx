'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (product.images.length > 1) {
      setCurrentImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };

  return (
    <motion.div
      className={cn('group relative', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/shop/${product.id}`}>
        <div
          className="relative aspect-[3/4] overflow-hidden bg-background"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={product.images[currentImageIndex]}
            alt={product.name}
            fill
            className={cn(
              'object-cover transition-transform duration-500',
              isHovered && 'scale-105'
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

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
            {product.originalPrice && (
              <span className="bg-red-500 text-white text-xs px-3 py-1 uppercase tracking-wider">
                Sale
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div
            className={cn(
              'absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300',
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            )}
          >
            <button
              className="p-2 bg-secondary text-primary hover:bg-accent transition-colors duration-300 shadow-md"
              aria-label="Add to wishlist"
            >
              <Heart size={18} />
            </button>
            <button
              className="p-2 bg-secondary text-primary hover:bg-accent transition-colors duration-300 shadow-md"
              aria-label="Add to cart"
            >
              <ShoppingBag size={18} />
            </button>
          </div>

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-primary/50 flex items-center justify-center">
              <span className="text-secondary text-sm uppercase tracking-wider">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="mt-4 text-center">
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-heading text-lg font-medium hover:text-accent transition-colors duration-300">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-primary/60 mt-1">{product.category}</p>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="font-medium">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-primary/50 line-through text-sm">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
