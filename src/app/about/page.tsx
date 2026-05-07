"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const values = [
  {
    title: "Craftsmanship",
    description:
      "Every piece is meticulously crafted with attention to the finest details, ensuring exceptional quality that stands the test of time.",
  },
  {
    title: "Sustainability",
    description:
      "We are committed to ethical sourcing and sustainable practices, creating fashion that respects both people and planet.",
  },
  {
    title: "Innovation",
    description:
      "Blending timeless elegance with contemporary design, we continuously evolve while honoring our heritage.",
  },
  {
    title: "Excellence",
    description:
      "From fabric selection to final stitch, we pursue perfection in every aspect of our creations.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] lg:h-[60vh] bg-background flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
            alt="About AURELION"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-accent text-sm tracking-[0.2em] uppercase">
              Our Story
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mt-4 leading-tight">
              The Art of
              <br />
              Timeless Fashion
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <span className="text-accent text-sm tracking-[0.2em] uppercase">
                Since 2015
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mt-4 mb-6">
                Our Heritage
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  AURELION was born from a vision to create fashion that
                  transcends trends. Founded in the heart of Milan, our brand
                  embodies the perfect fusion of Italian craftsmanship and
                  modern sophistication.
                </p>
                <p>
                  What began as a small atelier has grown into a global symbol
                  of luxury fashion, yet we remain true to our founding
                  principles: exceptional quality, timeless design, and
                  uncompromising attention to detail.
                </p>
                <p>
                  Each collection tells a story of heritage and innovation,
                  where classic silhouettes meet contemporary sensibilities. We
                  believe in creating pieces that become treasured additions to
                  your wardrobe for years to come.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
                  alt="Our Heritage"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 lg:py-24 bg-primary text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-accent text-sm tracking-[0.2em] uppercase">
              Our Vision
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl mt-4 mb-8 leading-relaxed">
              &ldquo;To inspire confidence and elegance in every individual who
              wears our creations&rdquo;
            </h2>
            <p className="text-gray-400 leading-relaxed">
              We envision a world where fashion is not just about appearance,
              but about expression. Where every garment carries the weight of
              artistry and the lightness of modern living. AURELION strives to
              be the bridge between classic luxury and contemporary lifestyle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-accent text-sm tracking-[0.2em] uppercase">
              What Drives Us
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mt-4">
              Our Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <span className="font-serif text-2xl text-accent font-bold">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-primary mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                  alt="Our Philosophy"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-accent text-sm tracking-[0.2em] uppercase">
                Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mt-4 mb-6">
                Fashion with Purpose
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  At AURELION, we believe that true luxury lies in the details.
                  Every stitch, every seam, every carefully selected fabric
                  reflects our commitment to excellence.
                </p>
                <p>
                  Our design philosophy centers on creating pieces that
                  transcend seasons and trends. We craft garments that feel as
                  beautiful as they look, using only the finest materials
                  sourced from trusted artisans around the world.
                </p>
                <p>
                  Fashion, to us, is more than clothing—it&apos;s an extension of
                  identity. We design for those who appreciate quality, seek
                  sophistication, and understand that style is eternal.
                </p>
              </div>
              <Link
                href="/shop"
                className="btn-primary inline-flex items-center gap-2 mt-8 group"
              >
                EXPLORE COLLECTION
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-6">
              Experience AURELION
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-8">
              Discover our latest collections and find pieces that speak to your
              sense of style and sophistication.
            </p>
            <Link href="/shop" className="btn-primary inline-flex items-center gap-2 group">
              SHOP NOW
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
