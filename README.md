# ProStore

A modern, full-stack e-commerce store built with the Next.js App Router. ProStore covers the complete shopping experience — browsing and search, cart and checkout, multiple payment methods, order tracking, transactional emails — alongside a full admin dashboard for managing products, orders, and users.

**Live demo:** https://prostore-one-sigma.vercel.app

## Features

- **Storefront** — product catalog, featured-product carousel, category and price search/filter, product detail pages with image galleries.
- **Cart & checkout** — persistent cart, multi-step checkout (shipping address → payment method → review & place order).
- **Payments** — PayPal, Stripe, and Cash on Delivery. When live PayPal/Stripe keys are configured the real integrations are used; otherwise a clearly labelled **demo checkout** completes the full order flow so the experience can be evaluated without keys.
- **Authentication** — email/password (NextAuth credentials) plus optional Google OAuth, with role-based access (user / admin).
- **Accounts** — user profile management and order history.
- **Reviews & ratings** — authenticated customers can rate and review products.
- **Order receipts** — branded confirmation emails via Resend (React Email templates).
- **Admin dashboard** — sales overview with charts, plus full CRUD for products, orders, and users.
- **Polish** — responsive design, light/dark theme, toast notifications, and server-side data fetching with Server Actions.

## Tech Stack

- **Framework:** Next.js 15 (App Router, Server Actions), React 19, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui (Radix UI), Lucide icons
- **Database & ORM:** PostgreSQL (Neon), Prisma
- **Auth:** NextAuth (Auth.js v5)
- **Validation & forms:** Zod, React Hook Form
- **Payments:** PayPal, Stripe
- **Email:** Resend + React Email
- **Uploads:** UploadThing
- **Charts:** Recharts
- **Testing:** Jest + ts-jest

## Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (e.g. [Neon](https://neon.tech))

### Installation

```bash
git clone https://github.com/ZiadTarek3000/Prostore.git
cd Prostore
npm install
```

### Environment variables

Copy the example file and fill in your values:

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NEXTAUTH_SECRET` / `AUTH_SECRET` | Yes | Secret used to sign auth tokens |
| `ENCRYPTION_KEY` | Yes | Key used to HMAC-hash user passwords |
| `NEXT_PUBLIC_SERVER_URL` | Yes | Base URL of the app |
| `PAYMENT_METHODS` / `DEFAULT_PAYMENT_METHOD` | Yes | Available payment options |
| `PAYPAL_CLIENT_ID` / `PAYPAL_APP_SECRET` | Optional | Enables live PayPal checkout |
| `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` / `STRIPE_WEBHOOK_SECRET` | Optional | Enables live Stripe checkout |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Optional | Enables Google sign-in |
| `RESEND_API_KEY` / `SENDER_EMAIL` | Optional | Enables order-confirmation emails |
| `UPLOADTHING_TOKEN` | Optional | Enables product image uploads |
| `ADMIN_NAME` / `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Optional | Seeds the initial admin account |

> Payment, Google, email, and upload keys are all optional — the app runs and the full checkout flow works without them (payments fall back to demo checkout).

### Database & seed

```bash
npx prisma generate
npx prisma db push
npx tsx ./db/seed
```

### Run

```bash
npm run dev      # development
npm run build    # production build
npm start        # serve the production build
npm test         # run the test suite
```

The app runs at http://localhost:3000.

## Project Structure

```
app/            Routes (App Router): storefront, checkout, account, admin, API routes
components/     UI and shared components (shadcn/ui based)
lib/            Server actions, validators, utilities, payment helpers
db/             Prisma client and seed script
email/          React Email templates
prisma/         Database schema
types/          Shared TypeScript types
tests/          Jest tests
```

## Deployment

ProStore is deployed on [Vercel](https://vercel.com). Set the environment variables above in the Vercel project settings, then deploy. The default payment method works out of the box; add PayPal/Stripe/Google/Resend keys to enable those integrations in production.

