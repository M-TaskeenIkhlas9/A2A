"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  const isHomePage = pathname === "/";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || !isHomePage
          ? "bg-white/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "lg:hidden p-2 -ml-2 rounded-sm transition-all duration-300",
              "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
              !isScrolled && isHomePage && "text-white"
            )}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium uppercase tracking-wider transition-colors duration-300",
                    "focus:outline-none focus-visible:text-accent",
                    "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full",
                    pathname === link.href
                      ? "text-accent after:w-full"
                      : !isScrolled && isHomePage
                      ? "text-white hover:text-accent"
                      : "hover:text-accent"
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm",
              !isScrolled && isHomePage && "text-white"
            )}
          >
            <h1 className="text-2xl font-serif font-semibold tracking-widest">
              AURELION
            </h1>
          </Link>

          {/* Right Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              aria-label="Search"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={cn(
                "p-2 rounded-sm transition-colors duration-300",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                !isScrolled && isHomePage
                  ? "text-white hover:text-accent"
                  : "hover:text-accent"
              )}
            >
              <Search size={20} />
            </button>
            <Link
              href="/cart"
              aria-label={`Shopping cart with ${itemCount} items`}
              className={cn(
                "p-2 rounded-sm transition-colors duration-300 relative",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                !isScrolled && isHomePage
                  ? "text-white hover:text-accent"
                  : "hover:text-accent"
              )}
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
              aria-label="Account"
              className={cn(
                "hidden sm:block p-2 rounded-sm transition-colors duration-300",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                !isScrolled && isHomePage
                  ? "text-white hover:text-accent"
                  : "hover:text-accent"
              )}
            >
              <User size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white border-t border-b"
          >
            <div className="container-custom py-4">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search for products..."
                  autoFocus
                  className="w-full pl-12 pr-4 py-3 bg-background border-0 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                  aria-label="Close search"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <ul className="container-custom py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block text-lg font-medium uppercase tracking-wider transition-colors duration-300",
                      "focus:outline-none focus-visible:text-accent",
                      pathname === link.href
                        ? "text-accent"
                        : "hover:text-accent"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
