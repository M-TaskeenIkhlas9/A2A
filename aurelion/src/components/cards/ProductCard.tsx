"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toast";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();
  const { showToast } = useToast();

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes[0];
    const defaultColor = product.colors[0].name;
    addItem(product, defaultSize, defaultColor, 1);
    showToast(`${product.name} added to cart`, "success");
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    showToast(
      isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      isWishlisted ? "info" : "success"
    );
  };

  return (
    <motion.div
      className={cn("group relative", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="block relative overflow-hidden bg-gray-100 aspect-[3/4]">
        <Link
          href={`/product/${product.id}`}
          className="block w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
        >
          <Image
            src={isHovered && product.hoverImage ? product.hoverImage : product.image}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-all duration-500",
              isHovered ? "scale-105" : "scale-100",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.isNew && (
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-primary text-secondary text-xs font-medium uppercase tracking-wider px-3 py-1"
            >
              New
            </motion.span>
          )}
          {hasDiscount && (
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-accent text-primary text-xs font-medium uppercase tracking-wider px-3 py-1"
            >
              -{discountPercent}%
            </motion.span>
          )}
        </div>

        {/* Wishlist Button (Always Visible on Mobile) */}
        <motion.button
          onClick={handleWishlist}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "absolute top-4 right-4 w-10 h-10 bg-white flex items-center justify-center transition-all duration-300 z-10",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
            "sm:opacity-0 sm:translate-x-4 group-hover:opacity-100 group-hover:translate-x-0",
            isWishlisted && "!opacity-100 !translate-x-0"
          )}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={18}
            className={cn(
              "transition-colors duration-300",
              isWishlisted ? "fill-red-500 text-red-500" : "hover:text-red-500"
            )}
          />
        </motion.button>

        {/* Quick Actions */}
        <div
          className={cn(
            "absolute bottom-4 left-4 right-4 flex justify-center gap-2 transition-all duration-300 z-10",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "w-10 h-10 bg-white flex items-center justify-center transition-colors duration-300",
              "hover:bg-primary hover:text-secondary",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            )}
            aria-label="Quick view"
          >
            <Eye size={18} />
          </motion.button>
          <motion.button
            onClick={handleAddToCart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "flex-1 bg-primary text-secondary flex items-center justify-center gap-2 py-3",
              "text-xs font-medium uppercase tracking-wider",
              "hover:bg-accent hover:text-primary transition-colors duration-300",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            )}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={16} />
            Add to Cart
          </motion.button>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 text-center">
        <Link
          href={`/product/${product.id}`}
          className="focus:outline-none focus-visible:text-accent"
        >
          <h3 className="font-medium text-sm uppercase tracking-wider hover:text-accent transition-colors duration-300">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="font-semibold">${product.price}</span>
          {hasDiscount && (
            <span className="text-gray-400 line-through text-sm">
              ${product.originalPrice}
            </span>
          )}
        </div>
        {/* Colors */}
        <div className="mt-2 flex justify-center gap-1">
          {product.colors.slice(0, 3).map((color) => (
            <span
              key={color.name}
              className={cn(
                "w-4 h-4 rounded-full border border-gray-200 transition-transform duration-200",
                "hover:scale-125 cursor-pointer"
              )}
              style={{ backgroundColor: color.value }}
              title={color.name}
              role="button"
              aria-label={`Color: ${color.name}`}
            />
          ))}
          {product.colors.length > 3 && (
            <span className="text-xs text-gray-400 ml-1">
              +{product.colors.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
