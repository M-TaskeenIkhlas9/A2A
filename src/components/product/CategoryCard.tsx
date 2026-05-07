"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

interface CategoryCardProps {
  name: string;
  slug: string;
  image: string;
  productCount?: number;
}

export default function CategoryCard({
  name,
  slug,
  image,
  productCount,
}: CategoryCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Link
        href={`/shop?category=${slug}`}
        className="group block relative aspect-[3/4] bg-gray-200 overflow-hidden"
      >
        {!imageError ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400" />
        )}

        <div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/50 transition-colors duration-300" />

        <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
          <h3 className="font-serif text-xl sm:text-2xl text-white font-semibold mb-1">
            {name}
          </h3>
          {productCount !== undefined && (
            <p className="text-white/70 text-sm mb-3">
              {productCount} Products
            </p>
          )}
          <span className="flex items-center gap-2 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            SHOP NOW
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
