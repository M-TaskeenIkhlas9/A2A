'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-secondary/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-2xl md:text-3xl font-semibold tracking-wider"
          >
            AURELION
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide uppercase hover:text-accent transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              aria-label="Search"
              className="p-2 hover:text-accent transition-colors duration-300"
            >
              <Search size={20} />
            </button>
            <button
              aria-label="Account"
              className="p-2 hover:text-accent transition-colors duration-300"
            >
              <User size={20} />
            </button>
            <Link
              href="/cart"
              className="p-2 hover:text-accent transition-colors duration-300 relative"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-primary text-xs flex items-center justify-center rounded-full">
                0
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              href="/cart"
              className="p-2 hover:text-accent transition-colors duration-300 relative"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-primary text-xs flex items-center justify-center rounded-full">
                0
              </span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:text-accent transition-colors duration-300"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-secondary"
            >
              <div className="py-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-base font-medium tracking-wide uppercase hover:text-accent transition-colors duration-300 py-2"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex items-center space-x-4 pt-4 border-t border-primary/10">
                  <button
                    aria-label="Search"
                    className="p-2 hover:text-accent transition-colors duration-300"
                  >
                    <Search size={20} />
                  </button>
                  <button
                    aria-label="Account"
                    className="p-2 hover:text-accent transition-colors duration-300"
                  >
                    <User size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
