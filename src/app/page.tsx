"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/30" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container-custom text-center z-10 pt-16"
        >
          <span className="inline-block text-accent text-sm tracking-[0.3em] uppercase mb-4">
            New Collection 2024
          </span>
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
            <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
              EXPLORE COLLECTION
              <ArrowRight size={18} />
            </Link>
            <Link href="/about" className="btn-secondary">
              OUR STORY
            </Link>
          </div>
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
              variants={fadeInUp}
              className="text-accent text-sm tracking-[0.2em] uppercase"
            >
              Browse By
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl sm:text-4xl font-bold text-primary mt-2"
            >
              Categories
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {["Men", "Women", "Accessories", "New Arrivals"].map((category) => (
              <motion.div key={category} variants={fadeInUp}>
                <Link
                  href={`/shop?category=${category.toLowerCase().replace(" ", "-")}`}
                  className="group block relative aspect-[3/4] bg-gray-200 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-end p-6">
                    <h3 className="font-serif text-xl text-white font-semibold">
                      {category}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
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
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between mb-12"
          >
            <div>
              <motion.span
                variants={fadeInUp}
                className="text-accent text-sm tracking-[0.2em] uppercase"
              >
                Just Landed
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="font-serif text-3xl sm:text-4xl font-bold text-primary mt-2"
              >
                New Arrivals
              </motion.h2>
            </div>
            <motion.div variants={fadeInUp}>
              <Link
                href="/shop?filter=new"
                className="text-primary font-medium hover:text-accent transition-colors flex items-center gap-2"
              >
                View All <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[1, 2, 3, 4].map((item) => (
              <motion.div key={item} variants={fadeInUp}>
                <Link href={`/shop/product-${item}`} className="group block">
                  <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="absolute top-4 left-4 bg-accent text-primary text-xs px-3 py-1 font-medium">
                      NEW
                    </span>
                  </div>
                  <h3 className="font-medium text-primary group-hover:text-accent transition-colors">
                    Premium Collection Item
                  </h3>
                  <p className="text-gray-500 mt-1">$299.00</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
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
              className="aspect-[4/5] bg-gray-200"
            />
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
              <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
                SHOP THE CAMPAIGN
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between mb-12"
          >
            <div>
              <motion.span
                variants={fadeInUp}
                className="text-accent text-sm tracking-[0.2em] uppercase"
              >
                Top Picks
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="font-serif text-3xl sm:text-4xl font-bold text-primary mt-2"
              >
                Best Sellers
              </motion.h2>
            </div>
            <motion.div variants={fadeInUp}>
              <Link
                href="/shop?filter=bestseller"
                className="text-primary font-medium hover:text-accent transition-colors flex items-center gap-2"
              >
                View All <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[1, 2, 3, 4].map((item) => (
              <motion.div key={item} variants={fadeInUp}>
                <Link href={`/shop/bestseller-${item}`} className="group block">
                  <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1 font-medium">
                      BEST SELLER
                    </span>
                  </div>
                  <h3 className="font-medium text-primary group-hover:text-accent transition-colors">
                    Signature Collection
                  </h3>
                  <p className="text-gray-500 mt-1">$349.00</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
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
