'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { useUI } from '@/context/UIContext';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';

export default function SearchModal() {
  const { isSearchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredProducts = query.length > 0
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSearch();
      }
    };

    if (isSearchOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isSearchOpen, closeSearch]);

  const handleClose = () => {
    setQuery('');
    closeSearch();
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-x-0 top-0 z-50 bg-secondary"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="container-custom py-6">
              {/* Search Input */}
              <div className="flex items-center gap-4">
                <Search size={24} className="text-primary/50" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="flex-1 text-xl md:text-2xl bg-transparent border-none outline-none placeholder:text-primary/40"
                />
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-background rounded-full transition-colors"
                  aria-label="Close search"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Search Results */}
              {query.length > 0 && (
                <div className="mt-8 max-h-[60vh] overflow-y-auto">
                  {filteredProducts.length > 0 ? (
                    <>
                      <p className="text-sm text-primary/60 mb-4">
                        {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} found
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filteredProducts.slice(0, 8).map((product) => (
                          <Link
                            key={product.id}
                            href={`/shop/${product.id}`}
                            onClick={handleClose}
                            className="flex items-center gap-4 p-3 hover:bg-background rounded-lg transition-colors group"
                          >
                            <div className="relative w-16 h-20 flex-shrink-0 bg-background overflow-hidden">
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate group-hover:text-accent transition-colors">
                                {product.name}
                              </h4>
                              <p className="text-xs text-primary/60 mt-1">
                                {product.category}
                              </p>
                              <p className="text-sm font-medium mt-1">
                                {formatPrice(product.price)}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      {filteredProducts.length > 8 && (
                        <Link
                          href={`/shop?search=${encodeURIComponent(query)}`}
                          onClick={handleClose}
                          className="mt-6 flex items-center justify-center gap-2 text-accent hover:gap-4 transition-all"
                        >
                          <span className="text-sm font-medium">View all {filteredProducts.length} results</span>
                          <ArrowRight size={16} />
                        </Link>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-primary/60">No products found for &quot;{query}&quot;</p>
                      <p className="text-sm text-primary/40 mt-2">
                        Try searching for something else
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Popular Searches */}
              {query.length === 0 && (
                <div className="mt-8">
                  <p className="text-sm font-medium text-primary/60 mb-4">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {['Blazer', 'Cashmere', 'Silk', 'Wool', 'Dress', 'Accessories'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 bg-background text-sm hover:bg-primary hover:text-secondary transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
