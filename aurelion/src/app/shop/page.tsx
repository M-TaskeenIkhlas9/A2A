"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SlidersHorizontal, ChevronDown, Grid, LayoutGrid, X } from "lucide-react";

const categories = ["All", "Men", "Women", "Accessories"];
const sizes = ["XS", "S", "M", "L", "XL"];
const colors = ["Black", "White", "Navy", "Beige", "Gold"];
const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
];

const products = [
  { id: 1, name: "Classic Black Blazer", price: 299, category: "Men", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Silk Cream Blouse", price: 189, category: "Women", image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Tailored Wool Pants", price: 249, category: "Men", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Leather Tote Bag", price: 399, category: "Accessories", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Cashmere Sweater", price: 349, category: "Women", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=400&q=80" },
  { id: 6, name: "Linen Summer Dress", price: 279, category: "Women", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80" },
  { id: 7, name: "Premium Denim Jeans", price: 199, category: "Men", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&q=80" },
  { id: 8, name: "Gold Chain Necklace", price: 159, category: "Accessories", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80" },
  { id: 9, name: "Wool Overcoat", price: 599, category: "Men", image: "https://images.unsplash.com/photo-1544923246-77307dd628b0?auto=format&fit=crop&w=400&q=80" },
  { id: 10, name: "Silk Scarf", price: 129, category: "Accessories", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80" },
  { id: 11, name: "Pleated Midi Skirt", price: 219, category: "Women", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0uj8a?auto=format&fit=crop&w=400&q=80" },
  { id: 12, name: "Leather Belt", price: 89, category: "Accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80" },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [gridCols, setGridCols] = useState(4);

  const filteredProducts = products.filter(
    (p) => selectedCategory === "All" || p.category === selectedCategory
  );

  return (
    <div className="pt-20 md:pt-24">
      {/* Page Header */}
      <section className="bg-black text-white py-12 md:py-16">
        <div className="container text-center">
          <motion.h1
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Shop
          </motion.h1>
          <motion.p
            className="text-gray-400 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Discover our curated collection of premium fashion pieces
          </motion.p>
        </div>
      </section>

      <div className="container py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:border-black transition-colors text-sm"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
            <div className="hidden md:flex items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-sm transition-colors ${
                    selectedCategory === cat
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => setGridCols(3)}
                className={`p-2 ${gridCols === 3 ? "text-black" : "text-gray-400"}`}
                aria-label="3 column grid"
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-2 ${gridCols === 4 ? "text-black" : "text-gray-400"}`}
                aria-label="4 column grid"
              >
                <LayoutGrid size={18} />
              </button>
            </div>
            <div className="relative">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="appearance-none px-4 py-2 pr-10 border border-gray-300 text-sm focus:outline-none focus:border-black cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-full lg:w-64 flex-shrink-0`}
          >
            <div className="lg:sticky lg:top-24 space-y-8">
              {/* Mobile Close */}
              <div className="lg:hidden flex justify-between items-center mb-4">
                <h3 className="font-medium">Filters</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X size={20} />
                </button>
              </div>

              {/* Category Filter - Mobile */}
              <div className="lg:hidden">
                <h4 className="text-sm font-medium uppercase tracking-wider mb-4">
                  Category
                </h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-left px-3 py-2 text-sm transition-colors ${
                        selectedCategory === cat
                          ? "bg-black text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <h4 className="text-sm font-medium uppercase tracking-wider mb-4">
                  Size
                </h4>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className="w-10 h-10 border border-gray-300 text-sm hover:border-black transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div>
                <h4 className="text-sm font-medium uppercase tracking-wider mb-4">
                  Color
                </h4>
                <div className="space-y-2">
                  {colors.map((color) => (
                    <label
                      key={color}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 border-gray-300 accent-black"
                      />
                      <span className="text-sm group-hover:text-[#C9A96E] transition-colors">
                        {color}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h4 className="text-sm font-medium uppercase tracking-wider mb-4">
                  Price Range
                </h4>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-6">
              Showing {filteredProducts.length} products
            </p>
            <div
              className={`grid grid-cols-2 md:grid-cols-3 ${
                gridCols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
              } gap-4 md:gap-6`}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link href={`/product/${product.id}`} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <button
                        className="absolute bottom-4 left-4 right-4 py-3 bg-black text-white text-sm font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#C9A96E]"
                        onClick={(e) => {
                          e.preventDefault();
                          alert("Added to cart!");
                        }}
                      >
                        Quick Add
                      </button>
                    </div>
                    <h3 className="text-sm font-medium mb-1 group-hover:text-[#C9A96E] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600">${product.price}</p>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-12">
              <button className="w-10 h-10 flex items-center justify-center border border-black bg-black text-white">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:border-black transition-colors">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:border-black transition-colors">
                3
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
