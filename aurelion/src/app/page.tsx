"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.p
            className="text-sm md:text-base uppercase tracking-[0.3em] text-[#C9A96E] mb-4"
            variants={fadeInUp}
          >
            New Collection 2026
          </motion.p>
          <motion.h1
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            variants={fadeInUp}
          >
            Elegance Redefined
          </motion.h1>
          <motion.p
            className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Discover our latest collection of premium fashion pieces crafted for
            the modern individual who values sophistication and style.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link
              href="/shop"
              className="inline-flex items-center px-8 py-4 bg-[#C9A96E] text-black font-medium uppercase tracking-wider text-sm hover:bg-white transition-colors"
            >
              Shop Now
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Explore our curated collections designed for every occasion
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Men",
                image:
                  "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=80",
              },
              {
                title: "Women",
                image:
                  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
              },
              {
                title: "Accessories",
                image:
                  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
              },
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={`/shop?category=${category.title.toLowerCase()}`}
                  className="group relative block aspect-[3/4] overflow-hidden"
                >
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-white">
                      {category.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Statement Section */}
      <section className="py-16 md:py-24 bg-[#F5F5F5]">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-[#C9A96E] mb-4">
              Our Philosophy
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Where Timeless Elegance Meets Modern Craftsmanship
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              At AURELION, we believe that true luxury lies in the details. Every
              piece in our collection is thoughtfully designed and meticulously
              crafted to embody sophistication, quality, and enduring style.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center text-sm font-medium uppercase tracking-wider hover:text-[#C9A96E] transition-colors"
            >
              Discover Our Story
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#C9A96E] mb-2">
                Just In
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold">
                New Arrivals
              </h2>
            </div>
            <Link
              href="/shop?filter=new"
              className="mt-4 md:mt-0 inline-flex items-center text-sm font-medium uppercase tracking-wider hover:text-[#C9A96E] transition-colors"
            >
              View All
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                name: "Classic Black Blazer",
                price: "$299",
                image:
                  "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Silk Cream Blouse",
                price: "$189",
                image:
                  "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Tailored Wool Pants",
                price: "$249",
                image:
                  "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Leather Tote Bag",
                price: "$399",
                image:
                  "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80",
              },
            ].map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href="/product/1" className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-sm font-medium mb-1 group-hover:text-[#C9A96E] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600">{product.price}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Section */}
      <section className="relative py-24 md:py-32 bg-black text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <motion.div
          className="container relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-[#C9A96E] mb-4">
              Summer Campaign
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              The Art of Effortless Style
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl">
              Explore our summer collection featuring lightweight fabrics and
              timeless silhouettes designed for warm-weather elegance.
            </p>
            <Link
              href="/shop?collection=summer"
              className="inline-flex items-center px-8 py-4 bg-white text-black font-medium uppercase tracking-wider text-sm hover:bg-[#C9A96E] transition-colors"
            >
              Explore Collection
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#C9A96E] mb-2">
                Most Loved
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold">
                Best Sellers
              </h2>
            </div>
            <Link
              href="/shop?filter=bestsellers"
              className="mt-4 md:mt-0 inline-flex items-center text-sm font-medium uppercase tracking-wider hover:text-[#C9A96E] transition-colors"
            >
              View All
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                name: "Cashmere Sweater",
                price: "$349",
                image:
                  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Linen Summer Dress",
                price: "$279",
                image:
                  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Premium Denim Jeans",
                price: "$199",
                image:
                  "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Gold Chain Necklace",
                price: "$159",
                image:
                  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80",
              },
            ].map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href="/product/1" className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-sm font-medium mb-1 group-hover:text-[#C9A96E] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600">{product.price}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-[#F5F5F5]">
        <div className="container">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Join the AURELION Circle
            </h2>
            <p className="text-gray-600 mb-8">
              Subscribe to receive exclusive offers, early access to new
              collections, and style inspiration delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 focus:border-[#C9A96E] focus:outline-none transition-colors"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-black text-white font-medium uppercase tracking-wider text-sm hover:bg-[#C9A96E] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
