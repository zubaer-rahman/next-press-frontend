# NextPress Frontend

Multi-role news and content publishing platform built with Next.js 16 App Router, shadcn/ui components, and Tailwind CSS 4.

## Stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Styling:** Tailwind CSS 4 + shadcn/ui (16 components)
- **Auth:** JWT (httpOnly cookies with automatic token refresh)
- **State:** Server components + Server Actions (`"use server"`)
- **Package manager:** pnpm

## Getting started

```bash
pnpm install
pnpm dev                  # http://localhost:3000
```

Configure `BACKEND_API_URL` in `.env.local` (default: `http://localhost:5000`).

## Architecture

```
app/
  (auth)/                 # Login, register (guest-only routes)
  (dashboard)/            # USER/AUTHOR/ADMIN dashboards
  (public)/               # Home, news, premium, authors, about
  layout.tsx              # Root layout with Navbar + Toaster
  proxy.ts                # Auth middleware (role guard, token refresh)
  loading.tsx             # Full-page loading skeleton
components/
  shared/                 # Navbar, SafeImage
  ui/                     # shadcn/ui primitives (button, card, dialog, etc.)
lib/
  types.ts                # Shared interfaces (IPost, IComment, IUser)
  utils.ts                # cn() helper
```

## Routes

| Path | Access | Description |
|---|---|---|
| `/` | Public | Home with hero section and latest news |
| `/news` | Public | Browse all non-premium posts with search |
| `/news/[id]` | Public | Post detail with comments |
| `/premium` | Subscriber | Premium-only content |
| `/payment` | Authenticated | Subscription checkout (Stripe) |
| `/authors` | Public | Author listing |
| `/about` | Public | About page |
| `/login` | Guest | Sign in |
| `/register` | Guest | Create account |
| `/dashboard` | USER | User dashboard |
| `/dashboard/my-posts` | USER | Manage own posts |
| `/dashboard/my-profile` | USER | Edit profile |
| `/author-dashboard` | AUTHOR | Author dashboard |
| `/author-dashboard/my-posts` | AUTHOR | Manage authored posts |
| `/admin-dashboard` | ADMIN | Admin dashboard |
| `/admin-dashboard/my-posts` | ADMIN | Manage any post |
| `/admin-dashboard/stats` | ADMIN | Site-wide statistics |

## Auth flow

- Login stores `accessToken` and `refreshToken` in httpOnly cookies.
- The `proxy.ts` middleware checks auth on every request, refreshes tokens if needed, and enforces role-based access.
- All server actions access the backend via `Cookie: accessToken=<token>` or `Authorization: Bearer <token>`.
- Three roles: `USER`, `AUTHOR`, `ADMIN` — each with tailored dashboard views and sidebar navigation.

## Data fetching pattern

Page-level data is fetched in server components using server actions. Client interactions (create, edit, delete, comments) use `useActionState` with revalidation tags (`my-posts`, `public-posts`, `premium-posts`, `my-profile`, `post-stats`).

No manual API calls in client components — all backend communication flows through server actions.
