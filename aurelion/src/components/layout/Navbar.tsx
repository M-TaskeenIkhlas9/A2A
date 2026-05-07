"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Search, User } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
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
      <nav className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation - Left */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium uppercase tracking-wider hover:text-[#C9A96E] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Logo - Center */}
          <Link
            href="/"
            className="font-serif text-2xl md:text-3xl font-bold tracking-wider"
          >
            AURELION
          </Link>

          {/* Desktop Navigation - Right */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium uppercase tracking-wider hover:text-[#C9A96E] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button
              className="p-2 hover:text-[#C9A96E] transition-colors hidden sm:block"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              className="p-2 hover:text-[#C9A96E] transition-colors hidden sm:block"
              aria-label="Account"
            >
              <User size={20} />
            </button>
            <Link
              href="/cart"
              className="p-2 hover:text-[#C9A96E] transition-colors relative"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-[#C9A96E] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
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
            className="lg:hidden bg-white border-t"
          >
            <div className="container py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-medium uppercase tracking-wider py-2 hover:text-[#C9A96E] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center space-x-4 pt-4 border-t">
                <button className="p-2 hover:text-[#C9A96E] transition-colors">
                  <Search size={20} />
                </button>
                <button className="p-2 hover:text-[#C9A96E] transition-colors">
                  <User size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
