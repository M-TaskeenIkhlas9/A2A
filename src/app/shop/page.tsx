'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import { ProductCard, Button, SectionHeader } from '@/components/ui';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { cn } from '@/lib/utils';

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Popularity', value: 'popularity' },
];

const priceRanges = [
  { label: 'Under $200', min: 0, max: 200 },
  { label: '$200 - $500', min: 200, max: 500 },
  { label: '$500 - $800', min: 500, max: 800 },
  { label: 'Over $800', min: 800, max: Infinity },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function ShopPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number } | null>(null);
  const [sortBy, setSortBy] = useState('newest');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      if (selectedSize && !product.sizes.includes(selectedSize)) {
        return false;
      }
      if (selectedPriceRange && (product.price < selectedPriceRange.min || product.price > selectedPriceRange.max)) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSize(null);
    setSelectedPriceRange(null);
  };

  const hasActiveFilters = selectedCategory || selectedSize || selectedPriceRange;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="bg-primary text-secondary py-16 md:py-24">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="heading-xl mb-4">Shop All</h1>
            <p className="text-secondary/70 text-lg max-w-2xl mx-auto">
              Discover our complete collection of premium clothing and accessories
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-custom py-12">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-primary/10">
          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 text-sm font-medium"
          >
            <Filter size={18} />
            Filters
            {hasActiveFilters && (
              <span className="w-5 h-5 bg-accent text-primary text-xs flex items-center justify-center rounded-full">
                !
              </span>
            )}
          </button>

          {/* Results Count */}
          <p className="text-sm text-primary/60">
            {filteredProducts.length} products
          </p>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 text-sm font-medium"
            >
              Sort by: {sortOptions.find((o) => o.value === sortBy)?.label}
              <ChevronDown size={16} className={cn(
                'transition-transform duration-300',
                showSortDropdown && 'rotate-180'
              )} />
            </button>
            
            {showSortDropdown && (
              <div className="absolute right-0 top-full mt-2 bg-secondary border border-primary/10 shadow-lg z-20 min-w-[180px]">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSortDropdown(false);
                    }}
                    className={cn(
                      'block w-full text-left px-4 py-2 text-sm hover:bg-background transition-colors',
                      sortBy === option.value && 'bg-background font-medium'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside
            className={cn(
              'lg:w-64 flex-shrink-0',
              'fixed lg:relative inset-0 z-40 lg:z-0 bg-secondary lg:bg-transparent',
              'transform lg:transform-none transition-transform duration-300',
              showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            )}
          >
            <div className="h-full overflow-y-auto p-6 lg:p-0">
              {/* Mobile Filter Header */}
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="font-heading text-xl font-semibold">Filters</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X size={24} />
                </button>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-accent hover:underline mb-6 block"
                >
                  Clear all filters
                </button>
              )}

              {/* Category Filter */}
              <div className="mb-8">
                <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4">
                  Category
                </h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(
                        selectedCategory === category.slug ? null : category.slug
                      )}
                      className={cn(
                        'block w-full text-left py-2 text-sm transition-colors',
                        selectedCategory === category.slug
                          ? 'text-accent font-medium'
                          : 'text-primary/70 hover:text-primary'
                      )}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4">
                  Price
                </h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => setSelectedPriceRange(
                        selectedPriceRange?.min === range.min ? null : range
                      )}
                      className={cn(
                        'block w-full text-left py-2 text-sm transition-colors',
                        selectedPriceRange?.min === range.min
                          ? 'text-accent font-medium'
                          : 'text-primary/70 hover:text-primary'
                      )}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-8">
                <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4">
                  Size
                </h4>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                      className={cn(
                        'w-10 h-10 border text-sm font-medium transition-all',
                        selectedSize === size
                          ? 'bg-primary text-secondary border-primary'
                          : 'border-primary/20 hover:border-primary'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Apply Button (Mobile) */}
              <div className="lg:hidden mt-8">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </aside>

          {/* Overlay (Mobile) */}
          {showFilters && (
            <div
              className="fixed inset-0 bg-primary/50 z-30 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-primary/60 text-lg">No products found matching your filters.</p>
                <button
                  onClick={clearFilters}
                  className="text-accent hover:underline mt-4"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
