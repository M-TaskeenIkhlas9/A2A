"use client";

import { motion } from "framer-motion";
import { CategoryCard } from "@/components/cards";
import { categories } from "@/data/products";

export default function Categories() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent text-sm uppercase tracking-[0.2em] mb-2 block">
            Collections
          </span>
          <h2 className="heading-lg">Shop by Category</h2>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CategoryCard category={category} size="lg" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
