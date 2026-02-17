# MUZLATGICH BOSHQARUV

Production-ready cold-warehouse web app (Uzbek + Russian) on Next.js 14 App Router.

## Stack
- Next.js 14 + TypeScript
- TailwindCSS + reusable UI components
- MongoDB + Mongoose
- Firebase Auth (Email/Password complete, Phone OTP feature-flagged)
- Axios with token interceptor
- Zod + React Hook Form
- ExcelJS export

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env:
   ```bash
   cp .env.example .env.local
   ```
3. Fill `NEXT_PUBLIC_FIREBASE_*`, `FIREBASE_ADMIN_*`, and MongoDB values in `.env.local`.
4. Run seed data:
   ```bash
   npm run seed
   ```
5. Restart dev server after env updates:
   ```bash
   npm run dev
   ```

## Firebase instructions
- Enable Email/Password provider in Firebase Authentication.
- Add your web app config to `NEXT_PUBLIC_FIREBASE_*` values.
- Create service account and put values in `FIREBASE_ADMIN_*` (`FIREBASE_ADMIN_PRIVATE_KEY` should keep escaped `\n`; server fixes newlines).

## Auth + session cookie flow
- Client Firebase auth is used for UI state and obtaining ID token.
- After login/register, app calls `POST /api/session` to create secure HTTP-only `session` cookie via Firebase Admin session cookies.
- Middleware checks cookie presence for route protection and redirects reliably without login bounce.
- Server/API routes verify `session` cookie with Firebase Admin (`verifySessionCookie`) before protected operations.

## First admin bootstrap
- First synced user is assigned `role: "admin"` in MongoDB `users` collection.
- After that, `/admin` is available only for admin-role users.

## Security
- Protected API routes verify server session cookie using Firebase Admin.
- Admin routes additionally verify MongoDB role.
- Critical finalize operation uses MongoDB transaction and prevents double-finalize.

## Feature flags
- `settings.phoneOtpEnabled` is present, with TODO hooks for Firebase Phone OTP flow.

## Notes
- Login/register flow now sets the server session cookie automatically, then redirects to `/`.
- Never commit `.env.local`.
