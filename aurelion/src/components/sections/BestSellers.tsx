"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/cards";
import { getBestSellers } from "@/data/products";

export default function BestSellers() {
  const bestSellers = getBestSellers();

  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <span className="text-accent text-sm uppercase tracking-[0.2em] mb-2 block">
              Most Loved
            </span>
            <h2 className="heading-lg">Best Sellers</h2>
          </div>
          <Link
            href="/shop?category=bestsellers"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-wider font-medium mt-4 md:mt-0 hover:text-accent hover:gap-3 transition-all duration-300"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
