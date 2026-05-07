"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown, Grid3X3, LayoutGrid, SlidersHorizontal, X } from "lucide-react";

const categories = ["All", "Men", "Women", "Accessories", "New Arrivals"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Navy", hex: "#1a365d" },
  { name: "Beige", hex: "#d4c4a8" },
  { name: "Gold", hex: "#C9A96E" },
];
const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Popularity", value: "popular" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [showFilters, setShowFilters] = useState(false);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedSizes([]);
    setSelectedColors([]);
    setSortBy("newest");
  };

  const products = Array.from({ length: 12 }, (_, i) => ({
    id: `product-${i + 1}`,
    name: `Premium Item ${i + 1}`,
    price: 199 + i * 50,
    isNew: i < 3,
    isBestSeller: i >= 3 && i < 6,
  }));

  return (
    <div className="pt-20 lg:pt-24">
      {/* Page Header */}
      <section className="bg-background py-12 lg:py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-accent text-sm tracking-[0.2em] uppercase">
              Explore
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-primary mt-2">
              Our Collection
            </h1>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              Discover curated pieces that blend timeless elegance with
              contemporary style.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-8 lg:py-12">
        <div className="container-custom">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 text-primary hover:text-accent transition-colors"
              >
                <SlidersHorizontal size={18} />
                Filters
              </button>
              <span className="text-gray-500 text-sm">
                Showing {products.length} products
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent border border-gray-300 px-4 py-2 pr-10 text-sm focus:outline-none focus:border-primary cursor-pointer"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                />
              </div>

              {/* Grid Toggle */}
              <div className="hidden sm:flex items-center gap-2 border-l border-gray-300 pl-4">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-1 ${gridCols === 3 ? "text-primary" : "text-gray-400"}`}
                  aria-label="3 columns"
                >
                  <Grid3X3 size={20} />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-1 ${gridCols === 4 ? "text-primary" : "text-gray-400"}`}
                  aria-label="4 columns"
                >
                  <LayoutGrid size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside
              className={`lg:w-64 flex-shrink-0 ${
                showFilters ? "block" : "hidden lg:block"
              }`}
            >
              <div className="sticky top-24 space-y-8">
                {/* Categories */}
                <div>
                  <h3 className="font-medium text-primary mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full text-left px-3 py-2 text-sm transition-colors ${
                          selectedCategory === category
                            ? "bg-primary text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div>
                  <h3 className="font-medium text-primary mb-4">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`w-10 h-10 border text-sm font-medium transition-colors ${
                          selectedSizes.includes(size)
                            ? "border-primary bg-primary text-white"
                            : "border-gray-300 text-gray-600 hover:border-primary"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div>
                  <h3 className="font-medium text-primary mb-4">Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => toggleColor(color.name)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColors.includes(color.name)
                            ? "border-primary scale-110"
                            : "border-transparent hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        aria-label={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-medium text-primary mb-4">Price Range</h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      className="w-full accent-accent"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>$0</span>
                      <span>$1000</span>
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                {(selectedCategory !== "All" ||
                  selectedSizes.length > 0 ||
                  selectedColors.length > 0) && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
                  >
                    <X size={16} />
                    Clear all filters
                  </button>
                )}
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <motion.div
                initial="initial"
                animate="animate"
                variants={{
                  animate: { transition: { staggerChildren: 0.05 } },
                }}
                className={`grid grid-cols-2 ${
                  gridCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
                } gap-4 lg:gap-6`}
              >
                {products.map((product) => (
                  <motion.div key={product.id} variants={fadeInUp}>
                    <Link href={`/shop/${product.id}`} className="group block">
                      <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {product.isNew && (
                          <span className="absolute top-3 left-3 bg-accent text-primary text-xs px-2 py-1 font-medium">
                            NEW
                          </span>
                        )}
                        {product.isBestSeller && (
                          <span className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 font-medium">
                            BEST SELLER
                          </span>
                        )}
                      </div>
                      <h3 className="font-medium text-sm sm:text-base text-primary group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 mt-1">${product.price}.00</p>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-2 mt-12">
                <button className="w-10 h-10 border border-primary bg-primary text-white font-medium">
                  1
                </button>
                <button className="w-10 h-10 border border-gray-300 text-gray-600 hover:border-primary transition-colors">
                  2
                </button>
                <button className="w-10 h-10 border border-gray-300 text-gray-600 hover:border-primary transition-colors">
                  3
                </button>
                <span className="px-2">...</span>
                <button className="w-10 h-10 border border-gray-300 text-gray-600 hover:border-primary transition-colors">
                  8
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
