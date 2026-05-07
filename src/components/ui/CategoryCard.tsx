'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export default function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <motion.div
      className={cn('group relative overflow-hidden', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/shop?category=${category.slug}`} className="block">
        <div className="relative aspect-[3/4] md:aspect-square lg:aspect-[3/4] overflow-hidden">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-secondary mb-2">
              {category.name}
            </h3>
            {category.description && (
              <p className="text-secondary/80 text-sm mb-4 line-clamp-2">
                {category.description}
              </p>
            )}
            <div className="flex items-center gap-2 text-secondary group-hover:text-accent transition-colors duration-300">
              <span className="text-sm uppercase tracking-wider font-medium">
                Shop Now
              </span>
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
