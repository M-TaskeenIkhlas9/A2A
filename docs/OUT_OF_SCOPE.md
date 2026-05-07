# AURELION - Out of Scope

This document defines features, functionality, and work explicitly excluded from the current project scope. These items are intentionally deferred to maintain focus on delivering a high-quality MVP frontend.

---

## Backend & Infrastructure

| Item | Reason |
|------|--------|
| **Backend server (Node.js/Express)** | Frontend-only deliverable; mock data sufficient for demo |
| **Database (MongoDB/PostgreSQL)** | No data persistence required; client-side storage used |
| **API development** | Will use static JSON data files |
| **Server deployment/hosting setup** | Build artifact ready for deployment but hosting not configured |
| **CI/CD pipelines** | Out of scope for initial build |
| **Docker/containerization** | Not required for frontend development |

---

## Authentication & User Management

| Item | Reason |
|------|--------|
| **User registration** | Requires backend infrastructure |
| **User login/logout** | Requires backend infrastructure |
| **Password reset flow** | Requires email service |
| **OAuth integration** | Requires third-party setup |
| **User profile management** | Requires database |
| **Order history** | Requires persistent storage |
| **Saved addresses** | Requires user accounts |

---

## Payment & Transactions

| Item | Reason |
|------|--------|
| **Payment gateway integration (Stripe, PayPal)** | Requires backend, security considerations |
| **Payment processing** | Requires PCI compliance |
| **Order confirmation emails** | Requires email service |
| **Invoice generation** | Requires backend processing |
| **Refund processing** | Requires payment infrastructure |

---

## E-commerce Backend Features

| Item | Reason |
|------|--------|
| **Inventory management** | Requires database and admin system |
| **Stock tracking** | Requires real-time data |
| **Order management system** | Requires backend |
| **Shipping calculation** | Requires API integration |
| **Tax calculation** | Requires location-based logic |
| **Discount/coupon system** | Requires backend validation |
| **Abandoned cart recovery** | Requires user tracking |

---

## Admin Functionality

| Item | Reason |
|------|--------|
| **Admin dashboard** | Separate application scope |
| **Product management (CRUD)** | Requires admin interface |
| **Order management** | Requires backend |
| **User management** | Requires database |
| **Analytics dashboard** | Requires data collection |
| **Content management** | Using static content for MVP |

---

## Advanced Features

| Item | Reason |
|------|--------|
| **AI-based product recommendations** | Requires ML infrastructure |
| **Personalized content** | Requires user data |
| **Live chat support** | Requires third-party integration |
| **Product reviews/ratings system** | Requires backend storage |
| **Wishlist with persistence** | Will be client-side only (localStorage) |
| **Size guide with measurements** | Content not provided |
| **Virtual try-on** | Requires AR/ML infrastructure |
| **Multi-language (i18n)** | Single language (English) only |
| **Multi-currency** | Single currency (USD) only |

---

## Third-Party Integrations

| Item | Reason |
|------|--------|
| **Email service (SendGrid, Mailchimp)** | Newsletter signup UI only, no actual sending |
| **Analytics (Google Analytics)** | Can be added post-MVP |
| **Social media login** | Requires OAuth setup |
| **Product feed for Facebook/Google** | Requires backend |
| **Affiliate tracking** | Requires tracking infrastructure |
| **CDN configuration** | Next.js handles basic optimization |

---

## Testing & Quality

| Item | Reason |
|------|--------|
| **End-to-end tests (Cypress/Playwright)** | Time constraint; manual testing sufficient |
| **Unit tests (Jest/RTL)** | Can be added iteratively |
| **Visual regression testing** | Can be added post-MVP |
| **Load/stress testing** | Requires deployment |
| **Security audit** | Post-launch activity |
| **Penetration testing** | Post-launch activity |

---

## Content & Assets

| Item | Reason |
|------|--------|
| **Real product photography** | Using placeholder/stock images |
| **Video content creation** | Not provided in requirements |
| **Blog/editorial content** | Not in initial page list |
| **Legal pages (Privacy Policy, Terms)** | Boilerplate can be added but not custom content |
| **Detailed size charts** | Content not provided |

---

## Browser & Platform Support

| Item | Reason |
|------|--------|
| **Internet Explorer support** | Deprecated browser |
| **Native mobile app** | Web-only deliverable |
| **PWA features (offline mode)** | Can be added post-MVP |
| **Print stylesheets** | Low priority |

---

## Deferred to Future Phases

These items are valuable but planned for future iterations:

### Phase 2 (Post-MVP)
- User authentication with NextAuth.js
- Wishlist persistence
- Product reviews display (read-only)
- Advanced search with suggestions
- Recently viewed products

### Phase 3 (Full E-commerce)
- Backend API development
- Database integration
- Payment gateway
- Order processing
- Email notifications

### Phase 4 (Enhancement)
- Admin dashboard
- Inventory management
- Analytics integration
- AI recommendations
- Multi-language support

---

## Clarifications

### What IS Included

| Feature | Scope |
|---------|-------|
| **Cart functionality** | Client-side with localStorage persistence |
| **Wishlist** | Client-side only, no account sync |
| **Search** | Client-side filtering of product data |
| **Newsletter** | Form UI with validation, mock submission |
| **Contact form** | Form UI with validation, mock submission |
| **Checkout form** | Form UI with validation, displays success state |
| **Product filters** | Client-side filtering, all options functional |
| **Responsive design** | All pages fully responsive |
| **Animations** | Full Framer Motion implementation |

### Placeholder Approach

Where real content/data is unavailable:
- **Product images**: High-quality stock/placeholder images
- **Product data**: Realistic mock JSON data (12-24 products)
- **Brand content**: Lorem ipsum replaced with realistic fashion copy
- **Prices**: Realistic luxury brand pricing ($100-$500 range)

---

## Notes

- This out-of-scope list may be revised based on stakeholder feedback
- Items can be moved to in-scope with proper timeline adjustment
- All out-of-scope items have been considered for future architecture compatibility
