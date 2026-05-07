"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ShoppingBag, Heart, User } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -ml-2 text-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation Links - Left */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-primary tracking-wider hover:text-accent transition-colors duration-300"
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* Logo - Center */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="font-serif text-2xl lg:text-3xl font-bold text-primary tracking-widest">
              AURELION
            </h1>
          </Link>

          {/* Desktop Navigation Links - Right */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-primary tracking-wider hover:text-accent transition-colors duration-300"
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* Icons - Right */}
          <div className="flex items-center space-x-4">
            <button
              className="p-2 text-primary hover:text-accent transition-colors duration-300"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link
              href="/cart"
              className="p-2 text-primary hover:text-accent transition-colors duration-300 relative"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-accent text-primary text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                0
              </span>
            </Link>
            <button
              className="hidden sm:block p-2 text-primary hover:text-accent transition-colors duration-300"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </button>
            <button
              className="hidden sm:block p-2 text-primary hover:text-accent transition-colors duration-300"
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
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-primary tracking-wider py-2 hover:text-accent transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label.toUpperCase()}
                  </Link>
                ))}
                <hr className="border-gray-200" />
                <div className="flex items-center space-x-4 py-2">
                  <Link
                    href="#"
                    className="flex items-center space-x-2 text-sm text-primary hover:text-accent"
                  >
                    <Heart size={18} />
                    <span>Wishlist</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center space-x-2 text-sm text-primary hover:text-accent"
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
