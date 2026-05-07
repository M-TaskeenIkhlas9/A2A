'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';
import { Button, Input } from '@/components/ui';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['123 Fashion Avenue', 'New York, NY 10001'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['hello@aurelion.com', 'support@aurelion.com'],
  },
  {
    icon: Clock,
    title: 'Hours',
    details: ['Mon - Sat: 10AM - 8PM', 'Sunday: 12PM - 6PM'],
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-16 md:py-24">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="heading-xl mb-4">Get in Touch</h1>
            <p className="text-secondary/70 text-lg max-w-2xl mx-auto">
              We&apos;d love to hear from you. Reach out with any questions, feedback, 
              or just to say hello.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-md mb-6">Send Us a Message</h2>
              
              {isSubmitted ? (
                <motion.div
                  className="bg-secondary p-8 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-primary/60 mb-6">
                    Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-secondary p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input
                      label="First Name"
                      placeholder="John"
                      required
                    />
                    <Input
                      label="Last Name"
                      placeholder="Doe"
                      required
                    />
                  </div>
                  <div className="space-y-4">
                    <Input
                      label="Email"
                      type="email"
                      placeholder="your@email.com"
                      required
                    />
                    <Input
                      label="Phone (optional)"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                    />
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Subject
                      </label>
                      <select
                        className="w-full px-4 py-3 border border-primary/20 bg-secondary text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="orders">Orders & Shipping</option>
                        <option value="returns">Returns & Exchanges</option>
                        <option value="products">Product Information</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Message
                      </label>
                      <textarea
                        rows={5}
                        placeholder="How can we help you?"
                        required
                        className="w-full px-4 py-3 border border-primary/20 bg-secondary text-primary placeholder:text-primary/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 resize-none"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full mt-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Send Message <Send size={18} />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="heading-md mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div
                    key={info.title}
                    className="bg-secondary p-6 flex gap-4"
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon size={24} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, index) => (
                        <p key={index} className="text-primary/60 text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="font-heading font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {['Instagram', 'Facebook', 'Twitter', 'Pinterest'].map((social) => (
                    <a
                      key={social}
                      href={`https://${social.toLowerCase()}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-secondary text-sm hover:bg-primary hover:text-secondary transition-all duration-300"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQ Link */}
              <div className="mt-8 p-6 bg-primary text-secondary">
                <h3 className="font-heading font-semibold mb-2">
                  Need Quick Answers?
                </h3>
                <p className="text-secondary/70 text-sm mb-4">
                  Check our frequently asked questions for immediate assistance.
                </p>
                <a
                  href="/faq"
                  className="text-accent hover:underline text-sm font-medium"
                >
                  Visit FAQ →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
