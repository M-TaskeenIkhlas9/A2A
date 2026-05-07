"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, Globe, Link2, MessageCircle } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Fashion Avenue", "New York, NY 10001"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+1 (234) 567-890", "Mon-Fri: 9AM - 6PM EST"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@aurelion.com", "support@aurelion.com"],
  },
  {
    icon: Clock,
    title: "Store Hours",
    details: ["Mon-Sat: 10AM - 8PM", "Sun: 11AM - 6PM"],
  },
];

const socialLinks = [
  { icon: Globe, href: "https://instagram.com", label: "Instagram" },
  { icon: Link2, href: "https://facebook.com", label: "Facebook" },
  { icon: MessageCircle, href: "https://twitter.com", label: "Twitter" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="bg-black text-white py-16 md:py-24">
        <div className="container text-center">
          <motion.p
            className="text-sm uppercase tracking-[0.3em] text-[#C9A96E] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Get in Touch
          </motion.p>
          <motion.h1
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-gray-400 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We&apos;d love to hear from you. Whether you have a question about our
            collections, need styling advice, or anything else, our team is ready
            to help.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                className="bg-white p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-black rounded-full flex items-center justify-center">
                  <info.icon size={20} className="text-[#C9A96E]" />
                </div>
                <h3 className="font-medium mb-2">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-sm text-gray-600">
                    {detail}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl font-bold mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <motion.div
                  className="bg-green-50 border border-green-200 p-8 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <Send size={24} className="text-green-600" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for reaching out. We&apos;ll be in touch soon.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-sm font-medium uppercase tracking-wider hover:text-[#C9A96E] transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Support</option>
                      <option value="returns">Returns & Exchanges</option>
                      <option value="styling">Styling Advice</option>
                      <option value="wholesale">Wholesale Inquiry</option>
                      <option value="press">Press & Media</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-12 py-4 bg-black text-white font-medium uppercase tracking-wider text-sm hover:bg-[#C9A96E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Map & Social */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="aspect-square md:aspect-[4/3] bg-gray-200 mb-8 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095919417!2d-74.00425878428698!3d40.74076904379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="AURELION Store Location"
                />
              </div>

              <div className="bg-[#F5F5F5] p-6 md:p-8">
                <h3 className="font-serif text-xl font-bold mb-4">
                  Follow Us
                </h3>
                <p className="text-gray-600 mb-6">
                  Stay connected with us on social media for the latest updates,
                  style inspiration, and exclusive offers.
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-[#C9A96E] transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 md:py-24 bg-[#F5F5F5]">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Can&apos;t find what you&apos;re looking for? Check our FAQ section for
              quick answers to common questions.
            </p>
            <a
              href="/faq"
              className="inline-flex items-center text-sm font-medium uppercase tracking-wider hover:text-[#C9A96E] transition-colors"
            >
              View All FAQs
              <Send size={16} className="ml-2 rotate-45" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
