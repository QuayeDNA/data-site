# GitHub Copilot Instructions

This workspace follows strict conventions documented in `.instructions.md` at the project root.
Read that file FIRST before generating any code.

## Quick Reference

- **Frontend**: React 19 + Vite 6 + TypeScript 5.9 + Tailwind CSS v4 + shadcn/ui (new-york)
- **Backend**: Node.js + Express 5 + MongoDB/Mongoose 8 (ES Modules, .js extensions required)
- **Monorepo**: npm workspaces (frontend/, backend/)

## Do NOT Recreate These — They Already Exist

- `@/lib/api.ts` → Axios instance with auth interceptors + typed helpers (apiGet, apiPost, etc.)
- `@/lib/query-keys.ts` → Centralised TanStack Query key factory
- `@/lib/utils.ts` → cn() class merge utility
- `@/contexts/AuthContext.tsx` → Auth state (useAuth hook)
- `@/types/index.ts` → ALL shared TypeScript types
- `@/services/*.service.ts` → 14 API service modules (orders, wallet, auth, etc.)
- `@/hooks/use-*.ts` → 12 TanStack Query hook modules
- `backend/src/utils/userTypeHelpers.js` → Role checking helpers
- `backend/src/utils/logger.js` → Winston logger (never use console.log)
- `backend/src/middlewares/auth.js` → authenticate, authorize, authorizeBusinessUser

## When Adding New Features

1. Types in `types/index.ts` (never inline)
2. Service in `services/xxx.service.ts` using existing api helpers
3. Query keys in `lib/query-keys.ts`
4. Hooks in `hooks/use-xxx.ts`
5. Barrel exports in `services/index.ts` and `hooks/index.ts`
6. Page in `pages/` with lazy import in `App.tsx`
7. Nav link in the appropriate layout
