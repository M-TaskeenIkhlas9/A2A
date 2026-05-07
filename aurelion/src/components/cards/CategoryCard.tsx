"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    image: string;
    description?: string;
  };
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function CategoryCard({
  category,
  className,
  size = "md",
}: CategoryCardProps) {
  const sizeStyles = {
    sm: "aspect-square",
    md: "aspect-[3/4]",
    lg: "aspect-[2/3] md:aspect-[3/4]",
  };

  return (
    <motion.div
      className={cn("group relative overflow-hidden", sizeStyles[size], className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/shop?category=${category.id}`} className="block w-full h-full">
        {/* Background Image */}
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-secondary p-6 text-center">
          <h3 className="text-2xl md:text-3xl font-serif mb-2">{category.name}</h3>
          {category.description && (
            <p className="text-sm opacity-90 mb-4 max-w-xs">{category.description}</p>
          )}
          <span className="inline-flex items-center gap-2 text-sm uppercase tracking-wider font-medium group-hover:gap-3 transition-all duration-300">
            Explore
            <ArrowRight size={16} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
