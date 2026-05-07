'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/Toast';
import { cn, formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  className?: string;
  index?: number;
}

export default function ProductCard({ product, className, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();
  const { showToast } = useToast();

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

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.inStock) {
      showToast('Product is out of stock', 'error');
      return;
    }

    const defaultSize = product.sizes[0];
    const defaultColor = product.colors[0];
    
    addItem(product, defaultSize, defaultColor, 1);
    showToast(`${product.name} added to cart`, 'success');
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    showToast(
      isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      'success'
    );
  };

  return (
    <motion.div
      className={cn('group relative', className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/shop/${product.id}`}>
        <div
          className="relative aspect-[3/4] overflow-hidden bg-background"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main Image */}
          <Image
            src={product.images[currentImageIndex]}
            alt={product.name}
            fill
            className={cn(
              'object-cover transition-all duration-700 ease-out',
              isHovered && 'scale-110'
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-primary text-secondary text-[10px] px-2 py-1 uppercase tracking-wider font-medium"
              >
                New
              </motion.span>
            )}
            {product.isBestSeller && (
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-accent text-primary text-[10px] px-2 py-1 uppercase tracking-wider font-medium"
              >
                Best Seller
              </motion.span>
            )}
            {product.originalPrice && (
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-red-500 text-white text-[10px] px-2 py-1 uppercase tracking-wider font-medium"
              >
                {Math.round((1 - product.price / product.originalPrice) * 100)}% Off
              </motion.span>
            )}
          </div>

          {/* Quick Actions */}
          <div
            className={cn(
              'absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300',
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            )}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlist}
              className={cn(
                'p-2.5 bg-secondary text-primary shadow-md transition-all duration-300',
                isWishlisted ? 'bg-accent' : 'hover:bg-accent'
              )}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart size={16} className={cn(isWishlisted && 'fill-primary')} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleQuickAdd}
              className="p-2.5 bg-secondary text-primary hover:bg-accent shadow-md transition-all duration-300"
              aria-label="Quick add to cart"
            >
              <ShoppingBag size={16} />
            </motion.button>
            <Link
              href={`/shop/${product.id}`}
              className="p-2.5 bg-secondary text-primary hover:bg-accent shadow-md transition-all duration-300 flex items-center justify-center"
              aria-label="Quick view"
            >
              <Eye size={16} />
            </Link>
          </div>

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
              <span className="text-secondary text-sm uppercase tracking-wider font-medium bg-primary/80 px-4 py-2">
                Out of Stock
              </span>
            </div>
          )}

          {/* Quick Add Button (Bottom) */}
          <motion.button
            initial={{ y: '100%' }}
            animate={{ y: isHovered ? 0 : '100%' }}
            transition={{ duration: 0.3 }}
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className="absolute bottom-0 left-0 right-0 bg-primary text-secondary py-3 text-sm font-medium uppercase tracking-wider hover:bg-accent hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.inStock ? 'Quick Add' : 'Out of Stock'}
          </motion.button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="mt-4 text-center">
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-heading text-base font-medium hover:text-accent transition-colors duration-300 line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-primary/50 mt-1 uppercase tracking-wider">
          {product.category}
        </p>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="font-medium">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-primary/40 line-through text-sm">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        {/* Color Swatches */}
        {product.colors.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-2">
            {product.colors.map((color) => (
              <span
                key={color.name}
                className="w-3 h-3 rounded-full border border-primary/20"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
