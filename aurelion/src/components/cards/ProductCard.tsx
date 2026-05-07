"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

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
      <Link href={`/product/${product.id}`} className="block relative overflow-hidden bg-gray-100 aspect-[3/4]">
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

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-primary text-secondary text-xs font-medium uppercase tracking-wider px-3 py-1">
              New
            </span>
          )}
          {hasDiscount && (
            <span className="bg-accent text-primary text-xs font-medium uppercase tracking-wider px-3 py-1">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div
          className={cn(
            "absolute bottom-4 left-4 right-4 flex justify-center gap-2 transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 bg-white flex items-center justify-center hover:bg-primary hover:text-secondary transition-colors duration-300"
            aria-label="Add to wishlist"
          >
            <Heart size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex-1 bg-primary text-secondary flex items-center justify-center gap-2 py-2 text-xs font-medium uppercase tracking-wider hover:bg-accent hover:text-primary transition-colors duration-300"
            aria-label="Add to cart"
          >
            <ShoppingBag size={16} />
            Add to Cart
          </motion.button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="mt-4 text-center">
        <Link href={`/product/${product.id}`}>
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
              className="w-4 h-4 rounded-full border border-gray-200"
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
