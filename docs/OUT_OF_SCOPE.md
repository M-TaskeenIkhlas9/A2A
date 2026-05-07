# AURELION – Out of Scope

This document explicitly defines features, functionality, and requirements that are **NOT** part of the current project scope. These items may be considered for future enhancements.

---

## Backend & Database

| Item | Reason |
|------|--------|
| Node.js backend server | Frontend-only project; mock data used |
| Firebase integration | Backend deferred |
| MongoDB / PostgreSQL database | Backend deferred |
| Real API endpoints | Using mock/static data |
| Server-side data persistence | Frontend-only |

---

## Authentication & User Management

| Item | Reason |
|------|--------|
| User registration | Marked optional in README |
| User login / logout | Marked optional in README |
| Password reset | Depends on auth |
| User profiles | Depends on auth |
| Order history | Requires backend |
| Session management | Requires backend |

---

## Payment & Transactions

| Item | Reason |
|------|--------|
| Payment gateway integration | Listed as future enhancement |
| Real payment processing | Requires backend + security |
| Order submission to server | Frontend-only |
| Invoice generation | Requires backend |
| Tax calculation | Requires backend logic |

---

## Admin & Management

| Item | Reason |
|------|--------|
| Admin dashboard | Listed as future enhancement |
| Inventory management | Listed as future enhancement |
| Product CRUD operations | Requires backend |
| Order management | Requires backend |
| Analytics dashboard | Requires backend |

---

## Advanced Features

| Item | Reason |
|------|--------|
| AI-based recommendations | Listed as future enhancement |
| Wishlist functionality | Marked optional in README |
| Real-time inventory updates | Requires backend |
| Email notifications | Requires backend |
| SMS notifications | Requires backend |
| Social media login (OAuth) | Requires backend |

---

## Testing

| Item | Reason |
|------|--------|
| Unit tests | Not required in current milestone |
| Integration tests | Not required in current milestone |
| E2E tests | Not required in current milestone |
| Visual regression tests | Not required in current milestone |

*Note: Cross-browser testing, mobile responsiveness testing, and Lighthouse audits are IN SCOPE as manual verification.*

---

## Infrastructure

| Item | Reason |
|------|--------|
| CI/CD pipelines | Deployment not in scope |
| Docker containerization | Deployment not in scope |
| Production deployment | Deployment not in scope |
| CDN configuration | Deployment not in scope |
| SSL/HTTPS setup | Deployment not in scope |
| Environment management | Single dev environment sufficient |

---

## Internationalization

| Item | Reason |
|------|--------|
| Multi-language support | Not in README requirements |
| Currency conversion | Not in README requirements |
| RTL layout support | Not in README requirements |
| Locale-specific formatting | Not in README requirements |

---

## Accessibility (Advanced)

| Item | Reason |
|------|--------|
| WCAG AAA compliance | Basic accessibility in scope; AAA not required |
| Screen reader optimization | Basic support in scope; advanced deferred |
| Voice navigation | Not required |
| High contrast mode | Not required |

*Note: Basic accessibility (semantic HTML, alt text, contrast, keyboard navigation) IS IN SCOPE.*

---

## Third-Party Integrations

| Item | Reason |
|------|--------|
| Google Analytics | Not in README requirements |
| Facebook Pixel | Not in README requirements |
| Live chat widget | Not in README requirements |
| Social sharing buttons | Not required (social links in footer are in scope) |
| Reviews/ratings system | Not in README requirements |

---

## Mobile Applications

| Item | Reason |
|------|--------|
| iOS native app | Web-only project |
| Android native app | Web-only project |
| PWA functionality | Not required |
| Push notifications | Not required |

---

## Content Management

| Item | Reason |
|------|--------|
| CMS integration | Not required |
| Blog functionality | Not in design |
| Dynamic content editing | Not required |

---

## Summary

The current scope focuses on delivering a **complete, production-quality frontend** that:
- Matches the design reference pixel-perfectly
- Is fully responsive
- Has smooth animations and interactions
- Uses mock/static data
- Is ready for backend integration in future phases

All backend, authentication, payment, and admin features are explicitly **deferred to future phases**.
