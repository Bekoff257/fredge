# Fredge (Next.js 14)

## Setup
1. Copy `.env.example` to `.env.local` and fill MongoDB + Firebase keys.
2. In Firebase console, enable **Email/Password** auth.
3. Create Firebase service account and place values in `FIREBASE_ADMIN_*`.
4. Install deps: `npm install`.
5. Seed defaults: `npm run seed`.
6. Run app: `npm run dev`.

## Auth flow
- Login/Register in Firebase client.
- Frontend sends ID token to `POST /api/session`.
- Server creates `session` httpOnly cookie.
- Middleware protects app/admin routes by cookie presence.
- APIs verify cookie with Firebase Admin and block disabled users.

## Admin
- Hidden route: `/admin`.
- First registered user becomes `admin`.
- Manage users, rooms, product types, and default daily rate.

## TODO
- Phone OTP auth (optional extension).
