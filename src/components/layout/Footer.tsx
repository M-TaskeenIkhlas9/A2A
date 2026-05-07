import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const footerSections = [
  {
    title: 'Shop',
    links: [
      { label: 'New Arrivals', href: '/shop?filter=new' },
      { label: 'Best Sellers', href: '/shop?filter=bestseller' },
      { label: 'Men', href: '/shop?category=men' },
      { label: 'Women', href: '/shop?category=women' },
      { label: 'Accessories', href: '/shop?category=accessories' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Shipping', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
      { label: 'Size Guide', href: '/size-guide' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-secondary">
      <div className="container-custom py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link
              href="/"
              className="font-heading text-2xl font-semibold tracking-wider block mb-4"
            >
              AURELION
            </Link>
            <p className="text-secondary/70 text-sm leading-relaxed mb-6">
              Premium clothing for those who appreciate luxury and elegance in every detail.
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary/10 rounded-full hover:bg-accent hover:text-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-secondary/70 text-sm hover:text-accent transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-secondary/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-secondary/60 text-sm">
            &copy; {new Date().getFullYear()} AURELION. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <span className="text-secondary/60 text-sm">Payment Methods:</span>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-secondary/10 px-2 py-1 rounded">Visa</span>
              <span className="text-xs bg-secondary/10 px-2 py-1 rounded">Mastercard</span>
              <span className="text-xs bg-secondary/10 px-2 py-1 rounded">PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
