'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { Button, CategoryCard, ProductCard, SectionHeader, Input } from '@/components/ui';
import { useToast } from '@/components/ui/Toast';
import { categories } from '@/data/categories';
import { newArrivals, bestSellers } from '@/data/products';

export default function HomePage() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter your email', 'error');
      return;
    }
    
    setIsSubscribing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubscribing(false);
    setEmail('');
    showToast('Successfully subscribed to newsletter!', 'success');
  };

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 80,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[100vh] min-h-[700px] flex items-center -mt-16 md:-mt-20">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
            alt="AURELION Hero - Premium Fashion"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent" />
        </div>
        
        <div className="container-custom relative z-10 pt-16 md:pt-20">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-accent uppercase tracking-[0.3em] text-xs sm:text-sm font-medium mb-6 block"
            >
              New Collection 2024
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-semibold text-secondary mb-6 leading-[1.1]"
            >
              Redefine<br />Your Style
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-secondary/80 text-base sm:text-lg md:text-xl mb-8 max-w-lg leading-relaxed"
            >
              Discover timeless elegance with our premium clothing collection. 
              Where luxury meets modern sophistication.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/shop">
                <Button variant="accent" size="lg" className="min-w-[180px]">
                  Shop Collection
                </Button>
              </Link>
              <Link href="/about">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="min-w-[150px] border-secondary/60 text-secondary hover:bg-secondary hover:text-primary"
                >
                  Our Story
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-secondary/60 hover:text-accent transition-colors flex flex-col items-center gap-2"
          aria-label="Scroll to content"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={20} />
          </motion.div>
        </motion.button>
      </section>

      {/* Categories Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <SectionHeader
            title="Shop by Category"
            subtitle="Explore our curated collections designed for the modern individual"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Statement Section */}
      <section className="section-padding bg-primary text-secondary overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-accent uppercase tracking-[0.3em] text-xs font-medium mb-6 block">
                Our Philosophy
              </span>
              <h2 className="heading-lg text-secondary mb-6 leading-tight">
                Crafted for Those Who Seek Perfection
              </h2>
              <p className="text-secondary/70 text-base md:text-lg leading-relaxed mb-8">
                At AURELION, we believe that true luxury lies in the details. Every stitch, 
                every fabric choice, and every design decision is made with uncompromising 
                dedication to excellence. Our pieces are not just clothing—they are statements 
                of refined taste and timeless elegance.
              </p>
              <Link 
                href="/about" 
                className="inline-flex items-center gap-3 text-accent group"
              >
                <span className="uppercase tracking-wider text-sm font-medium">
                  Discover Our Story
                </span>
                <ArrowRight 
                  size={18} 
                  className="transition-transform duration-300 group-hover:translate-x-2" 
                />
              </Link>
            </motion.div>
            
            <motion.div
              className="relative aspect-[4/5] lg:aspect-square"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
                alt="AURELION Brand Philosophy"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Decorative Element */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 border-2 border-accent hidden lg:block" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            title="New Arrivals"
            subtitle="Be the first to discover our latest pieces"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/shop?filter=new">
              <Button variant="secondary">View All New Arrivals</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Campaign Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80"
            alt="Summer Campaign"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/40 to-primary/20" />
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <span className="text-accent uppercase tracking-[0.3em] text-xs font-medium mb-6 block">
              Summer 2024
            </span>
            <h2 className="heading-xl text-secondary mb-6">
              The Essence of Elegance
            </h2>
            <p className="text-secondary/80 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Experience our exclusive summer collection featuring breathable fabrics 
              and timeless silhouettes designed for the season.
            </p>
            <Link href="/shop">
              <Button variant="accent" size="lg">
                Explore Campaign
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <SectionHeader
            title="Best Sellers"
            subtitle="Our most loved pieces chosen by our discerning clientele"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/shop?filter=bestseller">
              <Button variant="secondary">View All Best Sellers</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-primary text-secondary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <span className="text-accent uppercase tracking-[0.3em] text-xs font-medium mb-4 block">
              Newsletter
            </span>
            <h2 className="heading-md text-secondary mb-4">
              Join the AURELION World
            </h2>
            <p className="text-secondary/70 mb-8 max-w-md mx-auto">
              Subscribe to receive exclusive updates on new arrivals, private sales, 
              and curated style inspirations.
            </p>
            <form 
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent border-secondary/30 text-secondary placeholder:text-secondary/50 focus:border-accent"
                required
              />
              <Button 
                variant="accent" 
                type="submit"
                disabled={isSubscribing}
                className="min-w-[120px]"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            <p className="text-secondary/40 text-xs mt-6">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
