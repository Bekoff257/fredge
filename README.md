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
3. Fill Firebase and MongoDB values.
4. Run seed data:
   ```bash
   npm run seed
   ```
5. Start dev:
   ```bash
   npm run dev
   ```

## Firebase instructions
- Enable Email/Password provider in Firebase Authentication.
- Add your web app config to `NEXT_PUBLIC_FIREBASE_*` values.
- Create service account and put values in `FIREBASE_ADMIN_*`.

## First admin bootstrap
- First registered user should be promoted to admin by setting `role: "admin"` in MongoDB `users` collection.
- After that, `/admin` is available only for admin-role users.

## Security
- API validates Firebase bearer token.
- Admin routes additionally verify MongoDB role.
- Critical finalize operation uses MongoDB transaction and prevents double-finalize.

## Feature flags
- `settings.phoneOtpEnabled` is present, with TODO hooks for Firebase Phone OTP flow.

