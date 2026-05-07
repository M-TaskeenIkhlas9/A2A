"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Grid3X3, LayoutGrid, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/product";
import { products, categories } from "@/data/products";
import { useCart, useToast } from "@/context";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Navy", hex: "#1a365d" },
  { name: "Camel", hex: "#C19A6B" },
  { name: "Gray", hex: "#808080" },
];
const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Sellers", value: "bestseller" },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const { addItem } = useCart();
  const { showToast } = useToast();

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
    setSelectedCategory("all");
    setSelectedSizes([]);
    setSelectedColors([]);
    setSortBy("newest");
    setPriceRange([0, 1000]);
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 1000;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => selectedSizes.includes(s))
      );
    }

    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => selectedColors.includes(c.name))
      );
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "bestseller":
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case "newest":
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [selectedCategory, selectedSizes, selectedColors, sortBy, priceRange]);

  const handleQuickAdd = (product: typeof products[0]) => {
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
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-accent rounded-full" />
                )}
              </button>
              <span className="text-gray-500 text-sm">
                {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
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
                  className={`p-1.5 rounded transition-colors ${
                    gridCols === 3 ? "text-primary bg-gray-100" : "text-gray-400 hover:text-primary"
                  }`}
                  aria-label="3 columns"
                >
                  <Grid3X3 size={20} />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-1.5 rounded transition-colors ${
                    gridCols === 4 ? "text-primary bg-gray-100" : "text-gray-400 hover:text-primary"
                  }`}
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
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                        selectedCategory === "all"
                          ? "bg-primary text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      All Products
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.slug}
                        onClick={() => setSelectedCategory(category.slug)}
                        className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                          selectedCategory === category.slug
                            ? "bg-primary text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {category.name}
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
                        className={`w-10 h-10 border text-sm font-medium transition-all ${
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
                            ? "ring-2 ring-primary ring-offset-2"
                            : "hover:scale-110"
                        } ${color.name === "White" ? "border-gray-300" : "border-transparent"}`}
                        style={{ backgroundColor: color.hex }}
                        aria-label={color.name}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-medium text-primary mb-4">Price Range</h3>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-accent"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
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
              {filteredProducts.length > 0 ? (
                <div
                  className={`grid grid-cols-2 ${
                    gridCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
                  } gap-4 lg:gap-6`}
                >
                  {filteredProducts.map((product) => (
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
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-500 mb-4">No products found matching your criteria.</p>
                  <button
                    onClick={clearFilters}
                    className="text-accent hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
