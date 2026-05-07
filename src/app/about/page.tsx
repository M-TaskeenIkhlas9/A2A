'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button, SectionHeader } from '@/components/ui';

const values = [
  {
    title: 'Craftsmanship',
    description: 'Every piece is meticulously crafted by skilled artisans who have honed their craft over generations.',
  },
  {
    title: 'Sustainability',
    description: 'We are committed to ethical practices and sustainable materials throughout our supply chain.',
  },
  {
    title: 'Timelessness',
    description: 'Our designs transcend trends, creating pieces that remain elegant and relevant for years to come.',
  },
  {
    title: 'Excellence',
    description: 'We never compromise on quality, selecting only the finest materials for our collections.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80"
            alt="About AURELION"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-xl text-secondary mb-6">Our Story</h1>
            <p className="text-secondary/80 text-lg max-w-2xl mx-auto">
              A journey of passion, craftsmanship, and the pursuit of timeless elegance
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-accent uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
                Our Beginning
              </span>
              <h2 className="heading-lg mb-6">Founded on Passion</h2>
              <div className="space-y-4 text-primary/70 leading-relaxed">
                <p>
                  AURELION was born from a singular vision: to create clothing that embodies 
                  the essence of luxury while remaining timeless in its appeal. Founded in 
                  2015, our journey began in a small atelier where every piece was crafted 
                  with meticulous attention to detail.
                </p>
                <p>
                  Today, we continue to honor that founding spirit. Each collection is a 
                  testament to our commitment to excellence, featuring premium fabrics sourced 
                  from the world&apos;s finest mills and designs that speak to the sophisticated 
                  individual.
                </p>
                <p>
                  Our name, derived from the Latin word for &quot;golden,&quot; reflects our aspiration 
                  to bring a touch of refinement and luxury to everyday life.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              className="relative aspect-[4/5]"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
                alt="AURELION Atelier"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-primary text-secondary">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-accent uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
                Our Vision
              </span>
              <h3 className="heading-md text-secondary mb-4">
                Redefining Luxury Fashion
              </h3>
              <p className="text-secondary/70 leading-relaxed">
                To be the defining voice of modern luxury fashion, creating pieces that 
                inspire confidence and elegance in every individual who wears them. We 
                envision a world where quality and sustainability coexist, where fashion 
                is both an expression of self and a force for positive change.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-accent uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
                Our Mission
              </span>
              <h3 className="heading-md text-secondary mb-4">
                Excellence in Every Detail
              </h3>
              <p className="text-secondary/70 leading-relaxed">
                To craft timeless pieces that combine exceptional quality with 
                contemporary design. We are committed to ethical practices, sustainable 
                materials, and creating clothing that empowers our customers to express 
                their unique sense of style with confidence and grace.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            title="Our Values"
            subtitle="The principles that guide everything we do"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 border-2 border-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-heading text-2xl font-semibold text-accent">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3">
                  {value.title}
                </h3>
                <p className="text-primary/60 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fashion Philosophy */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              className="relative aspect-square order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80"
                alt="Fashion Philosophy"
                fill
                className="object-cover"
              />
            </motion.div>
            
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-accent uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
                Philosophy
              </span>
              <h2 className="heading-lg mb-6">Beyond Fashion</h2>
              <div className="space-y-4 text-primary/70 leading-relaxed">
                <p>
                  At AURELION, we believe that true style is not about following trends—
                  it&apos;s about expressing your authentic self. Our philosophy centers on 
                  creating pieces that become extensions of who you are.
                </p>
                <p>
                  We design for the modern individual who appreciates quality over quantity, 
                  who values craftsmanship over fast fashion, and who understands that the 
                  right piece can transform not just an outfit, but an entire presence.
                </p>
                <p>
                  Every collection tells a story, every piece is a chapter—and together, 
                  they create a wardrobe that speaks to enduring elegance.
                </p>
              </div>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-accent hover:gap-4 transition-all duration-300 mt-6"
              >
                <span className="uppercase tracking-wider text-sm font-medium">Explore Our Collection</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-secondary">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-lg text-secondary mb-6">
              Experience AURELION
            </h2>
            <p className="text-secondary/70 text-lg max-w-2xl mx-auto mb-8">
              Discover pieces that resonate with your sense of style and elevate 
              your everyday elegance.
            </p>
            <Link href="/shop">
              <Button variant="accent" size="lg">
                Shop Collection
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
