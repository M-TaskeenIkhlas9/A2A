import Link from "next/link";
import { Link2, Globe, MessageCircle, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "New Arrivals", href: "/shop?filter=new" },
    { label: "Best Sellers", href: "/shop?filter=bestsellers" },
    { label: "Men", href: "/shop?category=men" },
    { label: "Women", href: "/shop?category=women" },
    { label: "Accessories", href: "/shop?category=accessories" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
  support: [
    { label: "FAQ", href: "/faq" },
    { label: "Shipping", href: "/shipping" },
    { label: "Returns", href: "/returns" },
    { label: "Size Guide", href: "/size-guide" },
  ],
};

const socialLinks = [
  { icon: Globe, href: "https://instagram.com", label: "Instagram" },
  { icon: Link2, href: "https://facebook.com", label: "Facebook" },
  { icon: MessageCircle, href: "https://twitter.com", label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-serif text-2xl font-bold tracking-wider">
              AURELION
            </Link>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Premium fashion for the modern individual. Crafted with precision,
              designed for elegance.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-full hover:bg-[#C9A96E] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#C9A96E] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#C9A96E] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-[#C9A96E] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">
                  123 Fashion Avenue<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-[#C9A96E] flex-shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="text-sm text-gray-400 hover:text-[#C9A96E] transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-[#C9A96E] flex-shrink-0" />
                <a
                  href="mailto:hello@aurelion.com"
                  className="text-sm text-gray-400 hover:text-[#C9A96E] transition-colors"
                >
                  hello@aurelion.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} AURELION. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="text-xs text-gray-500 hover:text-[#C9A96E] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-gray-500 hover:text-[#C9A96E] transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
