# AURELION - Out of Scope Items

## Overview

This document explicitly lists features, functionality, and work items that are **not included** in the current implementation phase. These items may be considered for future phases.

---

## Out of Scope - Backend & Infrastructure

| Item | Reason | Future Phase |
|------|--------|--------------|
| Backend API development | Frontend-only scope | Phase 2+ |
| Database setup (MongoDB/PostgreSQL) | No persistent data required | Phase 2+ |
| Server deployment | Local development only | Phase 2+ |
| CI/CD pipeline | Manual builds acceptable | Phase 2+ |
| Docker containerization | Development simplicity | Phase 2+ |
| Cloud hosting configuration | Focus on code quality | Phase 2+ |

---

## Out of Scope - Authentication & Security

| Item | Reason | Future Phase |
|------|--------|--------------|
| User registration | Requires backend | Phase 2+ |
| User login/logout | Requires backend | Phase 2+ |
| Password reset flow | Requires backend | Phase 2+ |
| Session management | Requires backend | Phase 2+ |
| OAuth integration | Requires backend | Phase 2+ |
| Role-based access control | Requires backend | Phase 2+ |
| CSRF protection | Frontend-only scope | Phase 2+ |
| Rate limiting | Requires backend | Phase 2+ |

---

## Out of Scope - E-Commerce Backend Features

| Item | Reason | Future Phase |
|------|--------|--------------|
| Payment gateway integration | Requires Stripe/PayPal setup | Phase 2+ |
| Order processing | Requires backend | Phase 2+ |
| Order history | Requires backend | Phase 2+ |
| Inventory management | Requires backend | Phase 2+ |
| Stock tracking | Requires backend | Phase 2+ |
| Shipping calculations | Requires backend | Phase 2+ |
| Tax calculations | Requires backend | Phase 2+ |
| Discount/coupon system | Requires backend | Phase 2+ |
| Email notifications | Requires backend | Phase 2+ |
| Order confirmation emails | Requires backend | Phase 2+ |

---

## Out of Scope - Optional Features from README

| Item | Status | Reason |
|------|--------|--------|
| Wishlist functionality | EXCLUDED | Marked optional in README |
| User authentication | EXCLUDED | Marked optional in README |
| AI-based recommendations | EXCLUDED | Listed as future enhancement |
| Admin dashboard | EXCLUDED | Listed as future enhancement |
| Inventory management | EXCLUDED | Listed as future enhancement |
| Payment gateway integration | EXCLUDED | Listed as future enhancement |

---

## Out of Scope - Advanced UI Features

| Item | Reason | Future Phase |
|------|--------|--------------|
| Multi-language support (i18n) | Not in requirements | Phase 3+ |
| Dark mode | Not in design reference | Phase 3+ |
| Size guide/fitting tool | Advanced feature | Phase 3+ |
| Product reviews/ratings | Requires backend | Phase 2+ |
| Social sharing integration | Not in requirements | Phase 3+ |
| Product comparison | Advanced feature | Phase 3+ |
| Recently viewed products | Requires persistence | Phase 2+ |
| Product zoom/360 view | Advanced feature | Phase 3+ |

---

## Out of Scope - Testing

| Item | Reason | Future Phase |
|------|--------|--------------|
| Unit tests | Time constraints | Phase 2 |
| Integration tests | Time constraints | Phase 2 |
| E2E tests (Cypress/Playwright) | Time constraints | Phase 2 |
| Visual regression tests | Time constraints | Phase 3+ |
| Load/performance testing | Time constraints | Phase 3+ |

*Note: Manual testing and Lighthouse audits will be performed.*

---

## Out of Scope - Third-Party Integrations

| Item | Reason | Future Phase |
|------|--------|--------------|
| Analytics (Google Analytics) | Privacy considerations | Phase 2+ |
| Live chat support | Not in requirements | Phase 3+ |
| Email marketing (Mailchimp) | Requires API setup | Phase 2+ |
| Social media feeds | Not in requirements | Phase 3+ |
| CMS integration (Contentful/Sanity) | Static content acceptable | Phase 2+ |
| CDN configuration | Deployment concern | Phase 2+ |

---

## Out of Scope - Content

| Item | Reason | Alternative |
|------|--------|-------------|
| Real product photography | Not available | Placeholder images from Unsplash |
| Actual brand copy | Not provided | Lorem ipsum or inferred from design |
| Legal pages (Privacy, Terms) | Not in requirements | Not implemented |
| Blog/News section | Not in requirements | Not implemented |
| Size charts with real measurements | Not provided | Generic placeholder |

---

## In Scope vs Out of Scope Summary

### What IS Being Built

| Area | Included |
|------|----------|
| 7 pages | Home, Shop, Product, Cart, Checkout, About, Contact |
| UI Components | All global and page-specific components |
| Responsive Design | Mobile, Tablet, Desktop |
| Animations | Scroll, hover, transitions |
| Cart functionality | Client-side cart management |
| Search/Filter | Client-side product filtering |
| Form validation | Checkout and contact forms |
| Mock data | Static product catalog |

### What is NOT Being Built

| Area | Excluded |
|------|----------|
| Backend | No server, API, or database |
| Authentication | No user accounts |
| Payments | UI mockup only |
| Order processing | No actual orders |
| Automated testing | Manual testing only |
| Production deployment | Development environment only |

---

## Assumptions Made

1. **Product data** will be mocked with 12-20 products
2. **Images** will use high-quality placeholders from Unsplash
3. **Cart state** persists only in browser session (no localStorage in initial phase)
4. **Checkout** is a UI demonstration only (no actual order placement)
5. **Newsletter** signup shows success feedback (no actual subscription)
6. **Contact form** shows success feedback (no actual email sending)

---

## Escalation Path

If any out-of-scope item becomes necessary during development:

1. Document the requirement
2. Assess impact on timeline
3. Update scope documents
4. Proceed only if approved

---

*Document Version: 1.0*
*Last Updated: May 7, 2026*
