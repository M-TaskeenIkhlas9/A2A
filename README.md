# AURELION - Premium Clothing Brand Website

A modern, elegant, and luxury clothing brand e-commerce frontend built with Next.js, Tailwind CSS, and Framer Motion.

![AURELION](https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80)

## Live Features

- **7 Fully Responsive Pages**: Home, Shop, Product Detail, Cart, Checkout, About, Contact
- **Interactive Shopping Experience**: Add to cart, wishlist, search, filters
- **Premium Design**: High contrast black/white with gold accents
- **Smooth Animations**: Framer Motion powered transitions and hover effects
- **Persistent Cart**: LocalStorage backed cart state

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

Visit `http://localhost:3000` to see the site.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── shop/              # Shop and product pages
│   ├── cart/              # Cart page
│   ├── checkout/          # Checkout page
│   ├── about/             # About page
│   └── contact/           # Contact page
├── components/
│   ├── layout/            # Navbar, Footer
│   └── ui/                # Reusable UI components
├── context/               # React Context providers
├── data/                  # Mock product data
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── types/                 # TypeScript definitions
```

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14 | React framework with App Router |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.4 | Utility-first styling |
| Framer Motion | 12.x | Animations |
| Lucide React | 0.294 | Icons |

## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#000000` | Text, dark backgrounds |
| Secondary | `#FFFFFF` | Light backgrounds, text on dark |
| Accent | `#C9A96E` | CTAs, highlights, gold accents |
| Background | `#F5F5F5` | Page backgrounds |

### Typography

- **Headings**: Playfair Display (Serif)
- **Body**: Inter (Sans-serif)

### Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Features Implemented

### Pages

- [x] **Home** - Hero, categories, brand statement, new arrivals, campaign, best sellers, newsletter
- [x] **Shop** - Product grid, filters (category/price/size), sorting
- [x] **Product Detail** - Gallery, size/color selection, add to cart, related products
- [x] **Cart** - Item management, quantity, totals, promo code
- [x] **Checkout** - Contact, shipping, payment forms, order summary
- [x] **About** - Brand story, mission, values, philosophy
- [x] **Contact** - Contact form, info cards, social links

### Components

- [x] Navbar (sticky, animated, mobile menu)
- [x] Footer (links, social, payment badges)
- [x] ProductCard (hover swap, badges, quick actions)
- [x] CategoryCard (overlay, hover effects)
- [x] Button (primary, secondary, accent, ghost)
- [x] Input (with label and error states)
- [x] SearchModal (full-screen, filtering)
- [x] CartDrawer (slide-in panel)
- [x] Toast notifications
- [x] Loader/Skeleton components

### Interactions

- [x] Smooth scroll
- [x] Section fade-in animations
- [x] Hover zoom on product images
- [x] Image swap on product cards
- [x] Add to cart feedback (toast + drawer)
- [x] Wishlist toggle
- [x] Search with filtering
- [x] Form validation

## Documentation

| Document | Description |
|----------|-------------|
| [SCOPE.md](./docs/SCOPE.md) | Project scope and deliverables |
| [TECH_STACK.md](./docs/TECH_STACK.md) | Technology decisions |
| [OUT_OF_SCOPE.md](./docs/OUT_OF_SCOPE.md) | Excluded features |
| [ACCEPTANCE_CRITERIA.md](./docs/ACCEPTANCE_CRITERIA.md) | Checklist of requirements |

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Browser Support

- Chrome (latest 2)
- Firefox (latest 2)
- Safari (latest 2)
- Edge (latest 2)

## Performance

- Next.js automatic code splitting
- Image optimization with next/image
- Lazy loading for off-screen content
- Minimal bundle size

## Author

**Taskeen Ikhlas**

## License

This project is for educational and development purposes.
