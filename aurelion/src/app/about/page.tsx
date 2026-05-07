"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const values = [
  {
    title: "Craftsmanship",
    description:
      "Every piece is meticulously crafted using time-honored techniques and the finest materials sourced from around the world.",
  },
  {
    title: "Sustainability",
    description:
      "We are committed to ethical production practices and minimizing our environmental footprint at every stage.",
  },
  {
    title: "Timelessness",
    description:
      "Our designs transcend fleeting trends, focusing on enduring style that lasts for years to come.",
  },
  {
    title: "Innovation",
    description:
      "While respecting tradition, we embrace innovation in fabric technology and design to deliver superior comfort and fit.",
  },
];

const milestones = [
  { year: "2018", event: "AURELION founded in New York City" },
  { year: "2019", event: "First flagship store opens in Manhattan" },
  { year: "2020", event: "Launch of sustainable collection" },
  { year: "2021", event: "Expansion to international markets" },
  { year: "2022", event: "Opening of Paris atelier" },
  { year: "2023", event: "Introduction of made-to-measure service" },
];

export default function AboutPage() {
  return (
    <div className="pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center bg-black text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm md:text-base uppercase tracking-[0.3em] text-[#C9A96E] mb-4">
            Our Story
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight">
            The Art of Refined Living
          </h1>
        </motion.div>
      </section>

      {/* Brand Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80"
                  alt="AURELION Atelier"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-[#C9A96E] mb-4">
                Est. 2018
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Born from a Passion for Excellence
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  AURELION was founded with a singular vision: to create clothing
                  that embodies the perfect balance of timeless elegance and modern
                  sophistication. What began as a small atelier in New York City has
                  grown into a globally recognized symbol of luxury fashion.
                </p>
                <p>
                  Our founder, inspired by the golden age of tailoring and the
                  precision of contemporary design, set out to redefine what premium
                  clothing could be. Every collection is a testament to this
                  commitment—pieces that honor tradition while embracing innovation.
                </p>
                <p>
                  Today, AURELION stands as more than a brand. It is a philosophy of
                  living well, dressing thoughtfully, and appreciating the artistry
                  that goes into every stitch, every seam, every carefully chosen
                  fabric.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-[#F5F5F5]">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-[#C9A96E] mb-4">
              What We Stand For
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Our Values
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 mx-auto mb-6 border-2 border-[#C9A96E] rounded-full flex items-center justify-center">
                  <span className="font-serif text-2xl font-bold text-[#C9A96E]">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-24 md:py-32 bg-black text-white">
        <div className="container">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-[#C9A96E] mb-6">
              Our Vision
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8">
              &ldquo;To create clothing that becomes a second skin—pieces that make
              you feel confident, powerful, and authentically yourself.&rdquo;
            </h2>
            <p className="text-gray-400">— AURELION Founding Principle</p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-[#C9A96E] mb-4">
              Our Journey
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Milestones
            </h2>
          </motion.div>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className="flex gap-6 md:gap-8 pb-8 last:pb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-16 md:w-20">
                  <span className="font-serif text-xl md:text-2xl font-bold text-[#C9A96E]">
                    {milestone.year}
                  </span>
                </div>
                <div className="flex-1 pb-8 border-l border-gray-200 pl-6 md:pl-8">
                  <p className="text-gray-600">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#F5F5F5]">
        <div className="container">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Experience AURELION
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Discover our latest collection and find pieces that speak to your
              unique sense of style.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center px-8 py-4 bg-black text-white font-medium uppercase tracking-wider text-sm hover:bg-[#C9A96E] transition-colors"
            >
              Shop the Collection
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
