"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ShoppingBag, Heart, User } from "lucide-react";
import { useCart } from "@/context";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -ml-2 text-primary hover:text-accent transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation Links - Left */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-primary tracking-wider hover:text-accent transition-colors duration-300 relative group"
              >
                {link.label.toUpperCase()}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Logo - Center */}
          <Link href="/" className="flex-shrink-0 group">
            <h1 className="font-serif text-2xl lg:text-3xl font-bold text-primary tracking-widest group-hover:text-accent transition-colors duration-300">
              AURELION
            </h1>
          </Link>

          {/* Desktop Navigation Links - Right */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-primary tracking-wider hover:text-accent transition-colors duration-300 relative group"
              >
                {link.label.toUpperCase()}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Icons - Right */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              className="p-2 text-primary hover:text-accent transition-colors duration-300 hover:bg-gray-100 rounded-full"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link
              href="/cart"
              className="p-2 text-primary hover:text-accent transition-colors duration-300 relative hover:bg-gray-100 rounded-full"
              aria-label={`Cart with ${itemCount} items`}
            >
              <ShoppingBag size={20} />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-accent text-primary text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium"
                  >
                    {itemCount > 9 ? "9+" : itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <button
              className="hidden sm:block p-2 text-primary hover:text-accent transition-colors duration-300 hover:bg-gray-100 rounded-full"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </button>
            <button
              className="hidden sm:block p-2 text-primary hover:text-accent transition-colors duration-300 hover:bg-gray-100 rounded-full"
              aria-label="Account"
            >
              <User size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="container-custom py-4">
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-primary tracking-wider py-3 px-2 hover:text-accent hover:bg-gray-50 transition-all duration-300 rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label.toUpperCase()}
                  </Link>
                ))}
                <hr className="border-gray-200 my-2" />
                <div className="flex items-center gap-4 py-3 px-2">
                  <Link
                    href="#"
                    className="flex items-center space-x-2 text-sm text-primary hover:text-accent transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Heart size={18} />
                    <span>Wishlist</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center space-x-2 text-sm text-primary hover:text-accent transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <User size={18} />
                    <span>Account</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
