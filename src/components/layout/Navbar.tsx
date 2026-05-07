'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';
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
  const pathname = usePathname();
  const { itemCount, setCartOpen } = useCart();
  const { openSearch } = useUI();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isHomePage = pathname === '/';
  const showTransparent = isHomePage && !isScrolled;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        showTransparent
          ? 'bg-transparent'
          : 'bg-secondary/95 backdrop-blur-md shadow-sm'
      )}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              'font-heading text-2xl md:text-3xl font-semibold tracking-wider transition-colors duration-300',
              showTransparent ? 'text-secondary' : 'text-primary'
            )}
          >
            AURELION
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium tracking-wide uppercase transition-colors duration-300 relative group',
                  showTransparent
                    ? 'text-secondary/90 hover:text-accent'
                    : 'text-primary hover:text-accent',
                  pathname === link.href && 'text-accent'
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full',
                    pathname === link.href && 'w-full'
                  )}
                />
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <button
              onClick={openSearch}
              aria-label="Search"
              className={cn(
                'p-2 rounded-full transition-all duration-300',
                showTransparent
                  ? 'text-secondary/90 hover:text-accent hover:bg-secondary/10'
                  : 'text-primary hover:text-accent hover:bg-primary/5'
              )}
            >
              <Search size={20} />
            </button>
            <button
              aria-label="Account"
              className={cn(
                'p-2 rounded-full transition-all duration-300',
                showTransparent
                  ? 'text-secondary/90 hover:text-accent hover:bg-secondary/10'
                  : 'text-primary hover:text-accent hover:bg-primary/5'
              )}
            >
              <User size={20} />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className={cn(
                'p-2 rounded-full transition-all duration-300 relative',
                showTransparent
                  ? 'text-secondary/90 hover:text-accent hover:bg-secondary/10'
                  : 'text-primary hover:text-accent hover:bg-primary/5'
              )}
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-primary text-xs font-medium flex items-center justify-center rounded-full"
                  >
                    {itemCount > 9 ? '9+' : itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-1">
            <button
              onClick={openSearch}
              aria-label="Search"
              className={cn(
                'p-2 rounded-full transition-all duration-300',
                showTransparent
                  ? 'text-secondary/90 hover:text-accent'
                  : 'text-primary hover:text-accent'
              )}
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className={cn(
                'p-2 rounded-full transition-all duration-300 relative',
                showTransparent
                  ? 'text-secondary/90 hover:text-accent'
                  : 'text-primary hover:text-accent'
              )}
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-primary text-xs font-medium flex items-center justify-center rounded-full"
                  >
                    {itemCount > 9 ? '9+' : itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                'p-2 rounded-full transition-all duration-300',
                showTransparent
                  ? 'text-secondary/90 hover:text-accent'
                  : 'text-primary hover:text-accent'
              )}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
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
              className="lg:hidden overflow-hidden bg-secondary border-t border-primary/10"
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'block text-base font-medium tracking-wide uppercase py-3 transition-colors duration-300',
                        pathname === link.href
                          ? 'text-accent'
                          : 'text-primary hover:text-accent'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center space-x-4 pt-4 border-t border-primary/10"
                >
                  <button
                    aria-label="Account"
                    className="flex items-center gap-2 text-primary hover:text-accent transition-colors duration-300 py-2"
                  >
                    <User size={20} />
                    <span className="text-sm font-medium">Account</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
