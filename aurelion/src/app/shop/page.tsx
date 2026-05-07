"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Filter, Grid, List, ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/cards";
import { Button } from "@/components/ui";
import { products, categories } from "@/data/products";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
];

const priceRanges = [
  { value: "all", label: "All Prices" },
  { value: "0-100", label: "Under $100" },
  { value: "100-250", label: "$100 - $250" },
  { value: "250-500", label: "$250 - $500" },
  { value: "500+", label: "Over $500" },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedPrice !== "all") {
      result = result.filter((p) => {
        switch (selectedPrice) {
          case "0-100":
            return p.price < 100;
          case "100-250":
            return p.price >= 100 && p.price < 250;
          case "250-500":
            return p.price >= 250 && p.price < 500;
          case "500+":
            return p.price >= 500;
          default:
            return true;
        }
      });
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [selectedCategory, selectedPrice, sortBy]);

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-primary text-secondary py-16">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-xl mb-4"
          >
            Shop
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400"
          >
            Discover our curated collection of premium fashion
          </motion.p>
        </div>
      </section>

      {/* Shop Content */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter size={18} className="mr-2" />
                Filters
              </Button>
              <span className="text-sm text-gray-500">
                {filteredProducts.length} products
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* View Mode */}
              <div className="hidden sm:flex items-center border">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-primary text-secondary" : ""}`}
                  aria-label="Grid view"
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-primary text-secondary" : ""}`}
                  aria-label="List view"
                >
                  <List size={18} />
                </button>
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent border px-4 py-2 pr-10 text-sm focus:outline-none focus:border-primary cursor-pointer"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
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
              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                  Categories
                </h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className={`text-sm hover:text-accent transition-colors ${
                        selectedCategory === "all" ? "text-accent font-medium" : ""
                      }`}
                    >
                      All Products
                    </button>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <button
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`text-sm hover:text-accent transition-colors ${
                          selectedCategory === cat.id ? "text-accent font-medium" : ""
                        }`}
                      >
                        {cat.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                  Price Range
                </h3>
                <ul className="space-y-2">
                  {priceRanges.map((range) => (
                    <li key={range.value}>
                      <button
                        onClick={() => setSelectedPrice(range.value)}
                        className={`text-sm hover:text-accent transition-colors ${
                          selectedPrice === range.value ? "text-accent font-medium" : ""
                        }`}
                      >
                        {range.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No products found matching your criteria.</p>
                  <Button
                    variant="secondary"
                    className="mt-4"
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedPrice("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div
                  className={`grid gap-6 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
