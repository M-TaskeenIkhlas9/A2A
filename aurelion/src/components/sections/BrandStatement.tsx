"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function BrandStatement() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/5] lg:aspect-square"
          >
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop"
              alt="AURELION Brand"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:pl-12"
          >
            <span className="text-accent text-sm uppercase tracking-[0.2em] mb-4 block">
              Our Philosophy
            </span>
            <h2 className="heading-lg mb-6">
              Crafted for
              <br />
              <span className="text-accent">Excellence</span>
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At AURELION, we believe that true luxury lies in the details. 
              Every stitch, every fabric choice, every silhouette is carefully 
              considered to create pieces that transcend trends and stand the 
              test of time.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our commitment to exceptional craftsmanship and sustainable 
              practices ensures that each garment not only looks extraordinary 
              but feels extraordinary too. This is fashion with purpose.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <span className="block text-3xl md:text-4xl font-serif text-accent">15+</span>
                <span className="text-sm text-gray-500 uppercase tracking-wider">Years</span>
              </div>
              <div>
                <span className="block text-3xl md:text-4xl font-serif text-accent">50K+</span>
                <span className="text-sm text-gray-500 uppercase tracking-wider">Clients</span>
              </div>
              <div>
                <span className="block text-3xl md:text-4xl font-serif text-accent">100%</span>
                <span className="text-sm text-gray-500 uppercase tracking-wider">Quality</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
