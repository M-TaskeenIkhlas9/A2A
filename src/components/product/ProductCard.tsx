"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";

interface ProductCardProps {
  id?: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  slug: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  onQuickAdd?: () => void;
}

export default function ProductCard({
  name,
  price,
  originalPrice,
  image,
  hoverImage,
  slug,
  isNew,
  isBestSeller,
  onQuickAdd,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/shop/${slug}`} className="block">
        <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
          {!imageError ? (
            <>
              <Image
                src={image}
                alt={name}
                fill
                className={`object-cover transition-all duration-500 ${
                  isHovered && hoverImage ? "opacity-0" : "opacity-100"
                } group-hover:scale-105`}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                onError={() => setImageError(true)}
              />
              {hoverImage && (
                <Image
                  src={hoverImage}
                  alt={`${name} alternate view`}
                  fill
                  className={`object-cover transition-all duration-500 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  } group-hover:scale-105`}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <span className="text-gray-400 text-sm">Image unavailable</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <span className="bg-accent text-primary text-xs px-3 py-1 font-medium">
                NEW
              </span>
            )}
            {isBestSeller && (
              <span className="bg-primary text-white text-xs px-3 py-1 font-medium">
                BEST SELLER
              </span>
            )}
            {discount > 0 && (
              <span className="bg-red-500 text-white text-xs px-3 py-1 font-medium">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white ${
              isWishlisted ? "opacity-100" : ""
            }`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              size={18}
              className={`transition-colors ${
                isWishlisted ? "fill-red-500 text-red-500" : "text-primary"
              }`}
            />
          </button>

          {/* Quick Add Button */}
          {onQuickAdd && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onQuickAdd();
              }}
              className="absolute bottom-3 left-3 right-3 bg-primary text-white py-2.5 text-sm font-medium flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-accent hover:text-primary"
            >
              <ShoppingBag size={16} />
              QUICK ADD
            </button>
          )}
        </div>
      </Link>

      <Link href={`/shop/${slug}`} className="block">
        <h3 className="font-medium text-primary group-hover:text-accent transition-colors duration-300 line-clamp-1">
          {name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-primary font-medium">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-gray-400 line-through text-sm">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
