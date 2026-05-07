"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ProductCard, CategoryCard } from "@/components/product";
import { categories, newArrivals, bestSellers } from "@/data/products";
import { useCart, useToast } from "@/context";

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleQuickAdd = (product: typeof newArrivals[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: product.sizes[0],
      color: product.colors[0].name,
      quantity: 1,
    });
    showToast(`${product.name} added to cart`, "cart");
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-background">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80"
            alt="Fashion hero"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/80" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container-custom text-center z-10 pt-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block text-accent text-sm tracking-[0.3em] uppercase mb-4"
          >
            New Collection 2024
          </motion.span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight">
            Elegance in
            <br />
            Every Detail
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto mb-8">
            Discover timeless pieces that redefine luxury fashion. Crafted with
            precision, designed for the modern individual.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/shop" className="btn-primary inline-flex items-center gap-2 group">
              EXPLORE COLLECTION
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/about" className="btn-secondary">
              OUR STORY
            </Link>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center"
          >
            <motion.div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent text-sm tracking-[0.2em] uppercase"
            >
              Browse By
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl font-bold text-primary mt-2"
            >
              Categories
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                slug={category.slug}
                image={category.image}
                productCount={category.productCount}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Statement Section */}
      <section className="py-16 lg:py-24 bg-primary text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-accent text-sm tracking-[0.2em] uppercase mb-4 block">
              Our Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-relaxed">
              &ldquo;Fashion is not just about clothes. It&apos;s about expressing who
              you are and who you want to become.&rdquo;
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto mt-8" />
          </motion.div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-accent text-sm tracking-[0.2em] uppercase"
              >
                Just Landed
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-serif text-3xl sm:text-4xl font-bold text-primary mt-2"
              >
                New Arrivals
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/shop?filter=new"
                className="text-primary font-medium hover:text-accent transition-colors flex items-center gap-2 group mt-4 sm:mt-0"
              >
                View All
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {newArrivals.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.images[0]}
                hoverImage={product.images[1]}
                slug={product.slug}
                isNew={product.isNew}
                isBestSeller={product.isBestSeller}
                onQuickAdd={() => handleQuickAdd(product)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/5] overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
                alt="Summer Campaign"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:pl-8"
            >
              <span className="text-accent text-sm tracking-[0.2em] uppercase">
                Summer Campaign
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mt-4 mb-6">
                The Art of
                <br />
                Modern Luxury
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Experience the fusion of contemporary design and timeless
                elegance. Our latest campaign celebrates the essence of modern
                luxury - where every piece tells a story of craftsmanship and
                sophistication.
              </p>
              <Link href="/shop" className="btn-primary inline-flex items-center gap-2 group">
                SHOP THE CAMPAIGN
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-accent text-sm tracking-[0.2em] uppercase"
              >
                Top Picks
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-serif text-3xl sm:text-4xl font-bold text-primary mt-2"
              >
                Best Sellers
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/shop?filter=bestseller"
                className="text-primary font-medium hover:text-accent transition-colors flex items-center gap-2 group mt-4 sm:mt-0"
              >
                View All
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {bestSellers.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.images[0]}
                hoverImage={product.images[1]}
                slug={product.slug}
                isNew={product.isNew}
                isBestSeller={product.isBestSeller}
                onQuickAdd={() => handleQuickAdd(product)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 lg:py-24 bg-primary text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <span className="text-accent text-sm tracking-[0.2em] uppercase mb-4 block">
              Stay Connected
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              Join Our Newsletter
            </h2>
            <p className="text-gray-400 mb-8">
              Subscribe to receive exclusive updates, early access to new
              collections, and special offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-accent transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-accent text-primary px-6 py-3 font-medium hover:bg-white transition-colors"
              >
                SUBSCRIBE
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
