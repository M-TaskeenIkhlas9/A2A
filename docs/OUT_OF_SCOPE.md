# AURELION - Out of Scope Items

## Purpose

This document explicitly lists features, functionality, and work items that are **NOT** included in the current project scope. This ensures alignment on deliverables and prevents scope creep.

---

## Explicitly Out of Scope

### Backend & Infrastructure

| Item | Reason |
|------|--------|
| **Backend API development** | Frontend-only project; mock data used |
| **Database setup (MongoDB/PostgreSQL)** | No persistent data layer required |
| **Server deployment/hosting** | Development/local build only |
| **CI/CD pipeline setup** | Not required for MVP |
| **Docker containerization** | Out of scope for frontend deliverable |
| **Cloud services (AWS/GCP/Azure)** | Frontend-only scope |

### Authentication & Security

| Item | Reason |
|------|--------|
| **User authentication system** | Listed as optional in README |
| **User registration/login** | No backend to support |
| **Password reset flow** | No auth system |
| **OAuth/social login** | No auth system |
| **Session management** | No backend |
| **Role-based access control** | No admin functionality |

### Payment & Transactions

| Item | Reason |
|------|--------|
| **Payment gateway integration** | Listed as future enhancement |
| **Real payment processing** | No backend/payment provider |
| **Order management system** | No database |
| **Invoice generation** | No backend |
| **Tax calculation** | Complex business logic, no backend |
| **Shipping rate calculation** | Requires external API |

### E-commerce Backend Features

| Item | Reason |
|------|--------|
| **Inventory management** | Listed as future enhancement |
| **Order tracking** | No backend |
| **Admin dashboard** | Listed as future enhancement |
| **Product CRUD operations** | No backend |
| **Customer accounts/history** | No database |
| **Email notifications** | No backend |
| **Wishlist persistence** | Listed as optional; no backend |

### Advanced Features

| Item | Reason |
|------|--------|
| **AI-based recommendations** | Listed as future enhancement |
| **Search with Elasticsearch** | Client-side filtering sufficient |
| **Real-time inventory updates** | No backend |
| **Multi-language/i18n** | Not in original requirements |
| **Multi-currency support** | Not in original requirements |
| **Product reviews/ratings** | No backend persistence |

### Testing & QA

| Item | Reason |
|------|--------|
| **Unit test suite** | Not specified in requirements |
| **Integration tests** | Not specified in requirements |
| **E2E test automation** | Not specified in requirements |
| **Load testing** | Not specified in requirements |
| **Security auditing** | Not specified in requirements |

### Content & Assets

| Item | Reason |
|------|--------|
| **Real product photography** | Using placeholders/stock |
| **Copywriting services** | Using placeholder text where needed |
| **Brand asset creation** | Using generic luxury-style assets |
| **Video content production** | Not in design reference |

---

## Deferred to Future Phases

These items are mentioned in the README as future enhancements and are explicitly not part of the current deliverable:

1. **AI-based recommendations** - Requires ML infrastructure
2. **Admin dashboard** - Requires backend + auth
3. **Inventory management** - Requires database
4. **Payment gateway integration** - Requires backend + payment provider setup
5. **Wishlist feature** - Listed as optional, no backend persistence

---

## Reduced Scope Items

These items are **partially** implemented with limitations:

| Feature | What's Included | What's Excluded |
|---------|-----------------|-----------------|
| **Search** | Client-side filter over products | Full-text search, search API |
| **Cart** | LocalStorage persistence | Server-side cart, cross-device sync |
| **Checkout** | Form UI with validation | Actual order submission |
| **Products** | Static mock data (20-30 items) | Dynamic catalog, CMS |
| **Newsletter** | Form UI | Actual email service integration |
| **Contact Form** | Form UI with validation | Actual email sending |

---

## Assumptions Based on Scope

1. **Mock Data**: All product data is static JSON; no real inventory
2. **No Real Transactions**: Checkout flow ends at order summary; no payment
3. **Local State Only**: Cart persists in localStorage, not across devices
4. **Placeholder Images**: Using Unsplash/stock fashion imagery
5. **Form Submissions**: Console-logged, not sent to any service
6. **Single Language**: English only
7. **Single Currency**: USD only (or no currency conversion)

---

## Scope Change Process

If any out-of-scope items need to be added:

1. Document the requirement
2. Assess impact on timeline and complexity
3. Update scope documents
4. Get stakeholder approval before implementation

---

## Summary

This project delivers a **production-quality frontend** for a luxury e-commerce brand. It is explicitly a **UI/UX showcase** and **frontend implementation**, not a full-stack e-commerce platform.

The deliverable demonstrates:
- Modern React/Next.js architecture
- Premium visual design and animations
- Responsive, accessible UI
- Clean, maintainable code structure

It does **not** include backend services, real payment processing, or persistent data storage.

---

*Document Version: 1.0*  
*Last Updated: May 7, 2026*
