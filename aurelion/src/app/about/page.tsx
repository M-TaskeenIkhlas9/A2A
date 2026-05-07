"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Newsletter } from "@/components/sections";

const values = [
  {
    title: "Craftsmanship",
    description:
      "Every piece is meticulously crafted by skilled artisans who bring decades of experience to their craft.",
  },
  {
    title: "Sustainability",
    description:
      "We're committed to ethical sourcing and sustainable practices that respect both people and planet.",
  },
  {
    title: "Timelessness",
    description:
      "Our designs transcend seasons, created to be treasured and worn for years to come.",
  },
  {
    title: "Excellence",
    description:
      "We never compromise on quality, using only the finest materials and techniques available.",
  },
];

const team = [
  {
    name: "Alexandra Dubois",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
  },
  {
    name: "Marcus Chen",
    role: "Head of Design",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
  },
  {
    name: "Sofia Laurent",
    role: "Brand Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&h=1080&fit=crop"
            alt="About AURELION"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container-custom relative z-10 text-secondary text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-accent text-sm uppercase tracking-[0.3em] mb-4"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-xl"
          >
            About AURELION
          </motion.h1>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-accent text-sm uppercase tracking-[0.2em] mb-4 block">
                Since 2011
              </span>
              <h2 className="heading-lg mb-6">
                A Legacy of
                <br />
                <span className="text-accent">Elegance</span>
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded in the heart of Paris, AURELION was born from a passion for 
                exceptional craftsmanship and timeless design. What began as a small 
                atelier has grown into a globally recognized symbol of luxury fashion.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our founder, inspired by the golden light of dawn – &quot;Aurelion&quot; 
                meaning &quot;golden&quot; – envisioned a brand that would illuminate 
                the world of fashion with pieces that radiate sophistication and grace.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we continue to honor that vision, creating collections that 
                celebrate the art of dressing well while respecting the traditions 
                of haute couture.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative aspect-[4/5]"
            >
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1000&fit=crop"
                alt="AURELION Atelier"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-primary text-secondary">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-accent text-sm uppercase tracking-[0.2em] mb-4 block">
                Our Vision
              </span>
              <h3 className="heading-md mb-4">
                Redefining Luxury for the Modern Era
              </h3>
              <p className="text-gray-400 leading-relaxed">
                We envision a world where luxury fashion is not just about exclusivity, 
                but about expressing one&apos;s authentic self through meticulously 
                crafted garments that stand the test of time.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-accent text-sm uppercase tracking-[0.2em] mb-4 block">
                Our Mission
              </span>
              <h3 className="heading-md mb-4">
                Crafting Tomorrow&apos;s Heirlooms
              </h3>
              <p className="text-gray-400 leading-relaxed">
                To create exceptional fashion pieces that combine innovative design 
                with traditional craftsmanship, empowering our clients to express 
                their unique style with confidence and grace.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-accent text-sm uppercase tracking-[0.2em] mb-2 block">
              What We Stand For
            </span>
            <h2 className="heading-lg">Our Values</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 border-2 border-accent rounded-full flex items-center justify-center">
                  <span className="text-2xl font-serif text-accent">
                    {index + 1}
                  </span>
                </div>
                <h3 className="heading-sm mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-accent text-sm uppercase tracking-[0.2em] mb-2 block">
              The Visionaries
            </span>
            <h2 className="heading-lg">Our Team</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative aspect-[4/5] mb-4 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="font-serif text-xl mb-1">{member.name}</h3>
                <p className="text-sm text-gray-500 uppercase tracking-wider">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
