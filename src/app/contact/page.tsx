"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    details: ["hello@aurelion.com", "support@aurelion.com"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["123 Fashion Avenue", "New York, NY 10001"],
  },
  {
    icon: Clock,
    title: "Hours",
    details: ["Mon - Fri: 9AM - 8PM", "Sat - Sun: 10AM - 6PM"],
  },
];

const socialLinks = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://facebook.com", label: "Facebook" },
  { href: "https://twitter.com", label: "Twitter" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="bg-background py-12 lg:py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="text-accent text-sm tracking-[0.2em] uppercase">
              Get in Touch
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-primary mt-4 mb-4">
              Contact Us
            </h1>
            <p className="text-gray-600">
              We&apos;d love to hear from you. Whether you have a question about our
              collections, sizing, or anything else, our team is ready to
              answer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 lg:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-serif text-2xl font-bold text-primary mb-6">
                  Send Us a Message
                </h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 p-8 text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                      <Send className="text-green-600" size={24} />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-green-800 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-green-700">
                      Thank you for reaching out. We&apos;ll get back to you within
                      24-48 hours.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="mt-6 text-green-700 underline hover:no-underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary transition-colors bg-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="order">Order Status</option>
                        <option value="returns">Returns & Exchanges</option>
                        <option value="sizing">Sizing Help</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-primary transition-colors resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <button type="submit" className="btn-primary">
                      SEND MESSAGE
                    </button>
                  </form>
                )}
              </motion.div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                <h2 className="font-serif text-2xl font-bold text-primary">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  {contactInfo.map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center flex-shrink-0">
                        <item.icon size={20} className="text-accent" />
                      </div>
                      <div>
                        <h3 className="font-medium text-primary">{item.title}</h3>
                        {item.details.map((detail, index) => (
                          <p key={index} className="text-gray-600 text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-medium text-primary mb-4">Follow Us</h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-background rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors text-sm font-medium"
                        aria-label={social.label}
                      >
                        {social.label[0]}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[400px] bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Map Integration</p>
            <p className="text-sm text-gray-400">123 Fashion Avenue, New York</p>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent text-sm tracking-[0.2em] uppercase">
              Need Help?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mt-4 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-8">
              Find quick answers to common questions about shipping, returns,
              sizing, and more.
            </p>
            <button className="btn-secondary">VIEW FAQ</button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
