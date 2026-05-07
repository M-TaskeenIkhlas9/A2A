# AURELION - Out of Scope

## Overview

This document explicitly defines features, functionality, and work that are **NOT** included in the current project scope. These items may be considered for future phases.

---

## Explicitly Out of Scope

### Backend & Server-Side

| Item | Reason |
|------|--------|
| **Node.js/Express backend** | Frontend-only implementation; mock data used |
| **Database (MongoDB/PostgreSQL)** | No persistent storage required for demo |
| **Firebase integration** | Not needed for static frontend demo |
| **API development** | Data mocked client-side |
| **Server-side authentication** | No user accounts in current scope |

### E-commerce Functionality

| Item | Reason |
|------|--------|
| **Payment gateway integration** | Requires merchant accounts, legal compliance |
| **Real payment processing** | Security and PCI compliance requirements |
| **Order management system** | Backend dependency |
| **Inventory tracking** | Requires database and backend |
| **Shipping calculations** | Requires third-party API integration |
| **Tax calculations** | Varies by jurisdiction, backend needed |
| **Order history** | Requires user accounts and database |
| **Invoice generation** | Backend PDF generation required |

### User Management

| Item | Reason |
|------|--------|
| **User registration/login** | Marked optional in requirements |
| **Password reset flow** | Depends on user auth |
| **User profiles** | Requires authentication system |
| **Address book** | Requires persistent user data |
| **Order tracking** | Requires backend order system |
| **Social login (Google, Facebook)** | OAuth integration complexity |

### Optional Features (Deferred)

| Item | Reason |
|------|--------|
| **Wishlist functionality** | Marked optional; lower priority |
| **AI-based recommendations** | Listed as future enhancement |
| **Admin dashboard** | Requires separate application |
| **Inventory management UI** | Admin feature, future enhancement |
| **Customer reviews/ratings** | Requires moderation system |
| **Product comparisons** | Nice-to-have, not in design |

### Third-Party Integrations

| Item | Reason |
|------|--------|
| **Email service (SendGrid, etc.)** | Newsletter signup is UI-only |
| **Analytics (Google Analytics)** | Can be added post-launch |
| **Live chat support** | Third-party widget, not core feature |
| **Social media feeds** | API integration complexity |
| **CMS integration** | Static content sufficient |
| **CDN setup** | Hosting provider handles this |

### Advanced Features

| Item | Reason |
|------|--------|
| **Multi-language (i18n)** | English only for initial scope |
| **Multi-currency** | Single currency (USD implied) |
| **Size guides with measurements** | Basic size selection only |
| **Zoom/360° product views** | Standard gallery only |
| **AR try-on features** | Advanced feature, future phase |
| **Gift cards/vouchers** | Requires backend support |
| **Loyalty/rewards program** | Complex backend integration |

### DevOps & Infrastructure

| Item | Reason |
|------|--------|
| **CI/CD pipeline setup** | Project focus is on code, not deployment |
| **Docker containerization** | Not required for Vercel deployment |
| **Kubernetes orchestration** | Overkill for frontend project |
| **Load balancing** | Handled by hosting provider |
| **Database backups** | No database in scope |
| **Monitoring/alerting** | Post-launch concern |

### Testing

| Item | Reason |
|------|--------|
| **Unit tests** | Not specified in requirements |
| **Integration tests** | Not specified in requirements |
| **E2E tests (Cypress/Playwright)** | Not specified in requirements |
| **Visual regression tests** | Nice-to-have, not required |

*Note: Manual testing and Lighthouse audits ARE in scope.*

---

## Boundary Conditions

### Cart Behavior
- Cart data persists in browser session/localStorage only
- No server-side cart persistence
- Cart is not synced across devices

### Checkout Flow
- Checkout form collects data but does NOT process payments
- "Place Order" shows success message (mock)
- No confirmation emails sent
- No order numbers generated

### Search Functionality
- Client-side filtering only
- No fuzzy search or typo tolerance
- No search suggestions/autocomplete

### Product Data
- Static JSON data
- No real-time inventory updates
- Fixed set of products (not dynamically added)

---

## Future Phase Considerations

These items are documented for potential future work:

### Phase 2 (Post-MVP)
- User authentication
- Wishlist functionality
- Product reviews

### Phase 3 (Full E-commerce)
- Payment gateway integration
- Order management
- Inventory system

### Phase 4 (Enterprise)
- Admin dashboard
- AI recommendations
- Multi-language support

---

## Assumptions Made

1. **Content**: Product names, descriptions, and prices will use placeholder/sample data that follows the luxury brand aesthetic
2. **Images**: Placeholder images or Unsplash/similar free stock images will be used for products
3. **Currency**: USD ($) is the default currency
4. **Language**: English only
5. **Shipping**: Flat rate or free shipping messaging (no real calculations)
6. **Legal**: No terms of service, privacy policy, or cookie consent (though placeholder links may exist)

---

## Change Control

Any additions to scope require:
1. Documentation of the new requirement
2. Assessment of impact on timeline
3. Update to SCOPE.md
4. Removal from this OUT_OF_SCOPE.md document
