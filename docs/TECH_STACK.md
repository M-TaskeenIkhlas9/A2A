# AURELION – Tech Stack Decision

## Selected Stack

### Frontend Framework: **Next.js 14 (App Router)**

**Rationale:**
- Built on React.js as recommended in the README
- Server-side rendering for SEO optimization (critical for e-commerce)
- App Router provides modern routing patterns and layouts
- Built-in image optimization (critical for fashion/product images)
- API routes available if backend functionality is needed later
- Industry standard for production e-commerce sites
- Excellent developer experience and performance

### Styling: **Tailwind CSS**

**Rationale:**
- Explicitly recommended in the README
- Utility-first approach enables rapid UI development
- Easy responsive design with built-in breakpoint utilities
- Consistent spacing and typography scales
- Small production bundle with purging
- Works seamlessly with Next.js

### Animations: **Framer Motion**

**Rationale:**
- Explicitly recommended in the README
- Powerful animation library for React
- Declarative API for complex animations
- Built-in support for gestures and scroll animations
- Excellent performance with hardware acceleration
- Easy integration with Next.js and Tailwind

### Icons: **Lucide React**

**Rationale:**
- Recommended in the README (Lucide / Heroicons)
- Clean, consistent icon design fitting luxury aesthetic
- Tree-shakable for small bundle size
- TypeScript support
- Active maintenance and comprehensive icon set

### State Management: **React Context API + useState**

**Rationale:**
- Sufficient for frontend-only e-commerce UI
- No need for Redux complexity in this scope
- Cart state and UI state easily manageable
- Built into React, no additional dependencies
- Can be upgraded to Zustand or Redux if needed later

### Package Manager: **npm**

**Rationale:**
- Standard Node.js package manager
- Wide compatibility
- Lock file for reproducible builds

---

## Stack Boundaries

### What Next.js Handles
- Page routing and navigation
- Server-side rendering and static generation
- Image optimization
- API routes (if needed for mock data)
- Code splitting and lazy loading

### What Tailwind CSS Handles
- All component styling
- Responsive breakpoints
- Color system and typography
- Spacing and layout
- Hover/focus/active states

### What Framer Motion Handles
- Page transitions
- Scroll-triggered animations
- Hover animations on cards
- Loading states and skeletons
- Modal animations

### What React Context Handles
- Shopping cart state
- User preferences (if any)
- UI state (modals, mobile menu)

---

## Folder Structure

```
aurelion/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── shop/
│   │   ├── product/[id]/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── about/
│   │   └── contact/
│   ├── components/
│   │   ├── layout/             # Navbar, Footer
│   │   ├── ui/                 # Button, Input, Modal, Loader
│   │   ├── cards/              # ProductCard, CategoryCard
│   │   └── sections/           # Hero, Categories, Newsletter, etc.
│   ├── context/                # React Context providers
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities and helpers
│   ├── data/                   # Mock product data
│   └── styles/                 # Global styles, Tailwind config
├── public/
│   └── images/                 # Static images and assets
├── tailwind.config.ts
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## Dependencies

### Production Dependencies
```json
{
  "next": "^14.x",
  "react": "^18.x",
  "react-dom": "^18.x",
  "framer-motion": "^11.x",
  "lucide-react": "^0.x",
  "clsx": "^2.x",
  "tailwind-merge": "^2.x"
}
```

### Development Dependencies
```json
{
  "typescript": "^5.x",
  "@types/react": "^18.x",
  "@types/node": "^20.x",
  "tailwindcss": "^3.x",
  "postcss": "^8.x",
  "autoprefixer": "^10.x",
  "eslint": "^8.x",
  "eslint-config-next": "^14.x"
}
```

---

## Configuration Notes

### Tailwind Configuration
- Custom colors: primary (#000000), secondary (#FFFFFF), accent (#C9A96E), background (#F5F5F5)
- Custom fonts: Playfair Display, Inter
- Extended spacing if needed for luxury feel
- Custom breakpoints aligned with spec

### TypeScript
- Strict mode enabled
- Path aliases for clean imports (@/components, @/lib, etc.)

### Next.js Configuration
- Image domains for external images (if any)
- Metadata configuration for SEO

---

## Why NOT Other Options

| Option | Reason Not Selected |
|--------|---------------------|
| Plain React (CRA) | Lacks SSR, image optimization, routing conveniences |
| Vite + React | Good but lacks Next.js's e-commerce-friendly features |
| CSS Modules | Less efficient for rapid development than Tailwind |
| SCSS | More verbose, harder to maintain at scale |
| Redux | Overkill for frontend-only state management |
| Zustand | Good alternative, but Context sufficient for scope |
| styled-components | Runtime CSS-in-JS adds bundle size and complexity |
