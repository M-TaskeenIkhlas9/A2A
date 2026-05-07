'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button, CategoryCard, ProductCard, SectionHeader, Input } from '@/components/ui';
import { categories } from '@/data/categories';
import { newArrivals, bestSellers } from '@/data/products';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
            alt="AURELION Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/40 to-transparent" />
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-accent uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
              New Collection 2024
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-semibold text-secondary mb-6 leading-tight">
              Redefine Your Style
            </h1>
            <p className="text-secondary/80 text-lg md:text-xl mb-8 max-w-lg">
              Discover timeless elegance with our premium clothing collection. Where luxury meets modern sophistication.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop">
                <Button variant="accent" size="lg">
                  Shop Collection
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary" size="lg" className="border-secondary text-secondary hover:bg-secondary hover:text-primary">
                  Our Story
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <SectionHeader
            title="Shop by Category"
            subtitle="Explore our curated collections designed for the modern individual"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Statement Section */}
      <section className="section-padding bg-primary text-secondary">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-accent uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
                Our Philosophy
              </span>
              <h2 className="heading-lg text-secondary mb-6">
                Crafted for Those Who Seek Perfection
              </h2>
              <p className="text-secondary/70 text-lg leading-relaxed mb-8">
                At AURELION, we believe that true luxury lies in the details. Every stitch, 
                every fabric choice, and every design decision is made with uncompromising 
                dedication to excellence. Our pieces are not just clothing—they are statements 
                of refined taste and timeless elegance.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-accent hover:gap-4 transition-all duration-300">
                <span className="uppercase tracking-wider text-sm font-medium">Discover Our Story</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>
            
            <motion.div
              className="relative aspect-[4/5] lg:aspect-square"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
                alt="AURELION Brand"
                fill
                className="object-cover"
              />
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/shop?filter=new">
              <Button variant="secondary">View All New Arrivals</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Campaign Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80"
            alt="Summer Campaign"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/50" />
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
              Summer 2024
            </span>
            <h2 className="heading-xl text-secondary mb-6">
              The Essence of Elegance
            </h2>
            <p className="text-secondary/80 text-lg max-w-2xl mx-auto mb-8">
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/shop?filter=bestseller">
              <Button variant="secondary">View All Best Sellers</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-primary text-secondary">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-md text-secondary mb-4">
                Join the AURELION World
              </h2>
              <p className="text-secondary/70 mb-8">
                Subscribe to receive exclusive updates on new arrivals, private sales, 
                and curated style inspirations.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent border-secondary/30 text-secondary placeholder:text-secondary/50 focus:border-accent"
                />
                <Button variant="accent" type="submit">
                  Subscribe
                </Button>
              </form>
              <p className="text-secondary/50 text-xs mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
