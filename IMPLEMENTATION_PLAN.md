# BryteLinks — Complete Implementation Plan

> **Current State**: Backend is 100% complete. Frontend data layer (services, hooks, types, query keys) is 100% complete. **Frontend UI pages are all stubs** — this plan covers building every page into a fully functional interface.

---

## Phase 0: Foundation — Shared UI Components & Reusable Pieces ✅ COMPLETED

> Install shadcn/ui components and build reusable composite components used across multiple pages.

### 0.1 Install Core shadcn/ui Components ✅ COMPLETED

- [x] **0.1.1** Install base primitives: `button`, `input`, `label`, `textarea`, `select`, `checkbox`, `switch`, `separator`, `scroll-area`
- [x] **0.1.2** Install data display: `table`, `badge`, `avatar`, `card`, `skeleton`, `tooltip`
- [x] **0.1.3** Install overlays: `dialog`, `sheet`, `dropdown-menu`, `popover`, `alert-dialog`
- [x] **0.1.4** Install form ecosystem: `form` (react-hook-form + zod integration), `calendar`, `date-picker`
- [x] **0.1.5** Install feedback: `sonner` (toast notifications), `progress`, `alert`
- [x] **0.1.6** Install navigation: `tabs`, `breadcrumb`, `pagination`, `command` (for search)

### 0.2 Build Reusable Composite Components ✅ COMPLETED

- [x] **0.2.1** `StatCard` — Reusable stat display card (icon, label, value, optional trend/change)
- [x] **0.2.2** `DataTable` — Generic sortable/filterable data table wrapper (built on shadcn table + tanstack table or manual)
- [x] **0.2.3** `DataTablePagination` — Pagination controls (page, limit, total) tied to query params
- [x] **0.2.4** `StatusBadge` — Colored badge for entity statuses (order status, user status, wallet tx status, etc.)
- [x] **0.2.5** `ConfirmDialog` — Reusable "Are you sure?" alert dialog for destructive actions
- [x] **0.2.6** `EmptyState` — Reusable empty state with icon, title, description, optional CTA
- [x] **0.2.7** `PageHeader` — Page title + optional description + action buttons
- [x] **0.2.8** `FilterBar` — Reusable filter row (search input, status select, date range, provider filter)
- [x] **0.2.9** `LoadingSkeleton` — Skeleton loaders for tables, cards, forms
- [x] **0.2.10** `CurrencyDisplay` — Formatted GHS currency display component
- [x] **0.2.11** `TimeAgo` — Relative time display (e.g., "2 hours ago")
- [x] **0.2.12** `SearchInput` — Debounced search input with icon

---

## Phase 1: Admin Pages (Full CRUD & Management)

> Build all admin-facing pages. These are the highest priority because admin must configure the platform before agents can use it.

### 1.1 Admin Settings Page — `AdminSettingsPage.tsx` ✅ COMPLETED

> **Why first**: Platform settings (site status, signup approval, wallet config, commission rates, API keys) must be configurable before anything else works properly.

- [x] **1.1.1** Site Settings section: site name, site status toggle (open/maintenance), maintenance message
- [x] **1.1.2** Signup Settings section: require approval toggle, auto-approve storefronts toggle
- [x] **1.1.3** Wallet Settings section: minimum balance, minimum top-up, maximum top-up, auto-approve threshold
- [x] **1.1.4** Commission Settings section: commission rates per user type (agent, super_agent, dealer, super_dealer), commission enabled toggle, payout threshold
- [x] **1.1.5** API Settings section: API keys management for external integrations (provider API keys)
- [x] **1.1.6** Each section has its own save button with loading state and success toast
- [ ] **1.1.7** Tabbed or accordion layout to organize sections cleanly

### 1.2 Admin Providers Page — `AdminProvidersPage.tsx` ✅ COMPLETED

> **Why second**: Providers (MTN, Telecel, AT, AFA) are the foundation — packages and bundles depend on them.

- [x] **1.2.1** Provider list table: name, code, logo, status (active/inactive), sales count, actions
- [x] **1.2.2** Create Provider dialog/form: name, code, logo upload/URL, description
- [x] **1.2.3** Edit Provider dialog/form: pre-populated, inline edit or modal
- [x] **1.2.4** Toggle provider active/inactive status
- [x] **1.2.5** Delete provider (soft delete) with confirmation dialog
- [x] **1.2.6** Restore deleted provider action
- [x] **1.2.7** Provider analytics summary (top of page or per-provider detail view)

### 1.3 Admin Packages Page — `AdminPackagesPage.tsx`

> **Why third**: Packages categorize bundles (e.g., "MTN Daily", "Telecel Weekly"). Must exist before bundles.

- [ ] **1.3.1** Package list table: name, provider, category, bundle count, status, actions
- [ ] **1.3.2** Filter by provider and category (daily/weekly/monthly/mega/midnight/special)
- [ ] **1.3.3** Create Package dialog/form: name, provider (select), category (select), description
- [ ] **1.3.4** Edit Package dialog/form
- [ ] **1.3.5** Delete package with confirmation (check for dependent bundles)
- [ ] **1.3.6** Restore deleted package
- [ ] **1.3.7** View package stats (number of bundles, total sales through this package)

### 1.4 Admin Bundles Page — `AdminBundlesPage.tsx`

> **Why fourth**: Bundles are the actual products agents sell. Pricing tiers per user type make this the most complex CRUD.

- [ ] **1.4.1** Bundle list table: name, provider, package, data volume, validity, base price, status, actions
- [ ] **1.4.2** Advanced filters: by provider, by package, by price range, by status, search by name
- [ ] **1.4.3** Create Bundle form (likely full-page or large dialog):
  - Name, data volume + unit (MB/GB), validity + unit (hours/days/weeks/months)
  - Package (select, filtered by provider), provider (select)
  - Base price, features list
  - Pricing tiers per user type: agent price, super_agent price, dealer price, super_dealer price
- [ ] **1.4.4** Edit Bundle form (pre-populated, same fields)
- [ ] **1.4.5** View Bundle detail (pricing breakdown by user type, sales stats)
- [ ] **1.4.6** Delete bundle with confirmation
- [ ] **1.4.7** Bulk operations: bulk activate/deactivate, bulk price update
- [ ] **1.4.8** Bundle analytics: sales volume, revenue, popular bundles chart
- [ ] **1.4.9** Pricing tier management: update pricing for multiple bundles at once

### 1.5 Admin Users Page — `AdminUsersPage.tsx`

> **Why fifth**: With products set up, admin needs to manage the users who will sell them.

- [ ] **1.5.1** User list table: name, email, phone, role, status (active/suspended/pending), wallet balance, agent code, date joined, actions
- [ ] **1.5.2** Filters: by role (agent/super_agent/dealer/super_dealer), by status, search by name/email/phone
- [ ] **1.5.3** View User detail sheet/dialog: full profile, wallet balance, order count, commission stats
- [ ] **1.5.4** Approve pending user (for signup approval flow)
- [ ] **1.5.5** Suspend/Reactivate user with reason
- [ ] **1.5.6** Change user role (promote agent → super_agent, etc.)
- [ ] **1.5.7** Delete user with confirmation
- [ ] **1.5.8** Impersonate user action (view platform as that user)
- [ ] **1.5.9** User stats summary cards: total users, active, pending, suspended (by role)
- [ ] **1.5.10** User chart data: signups over time

### 1.6 Admin Wallet Page — `AdminWalletPage.tsx`

> **Why sixth**: Agents need funded wallets to place orders. Admin must be able to top up and manage wallet requests.

- [ ] **1.6.1** Pending top-up requests table: user, amount, date, reference, status, approve/reject actions
- [ ] **1.6.2** Approve top-up request with confirmation
- [ ] **1.6.3** Reject top-up request with reason
- [ ] **1.6.4** Manual credit/debit form: select user (search), amount, description, type (credit/debit)
- [ ] **1.6.5** All transactions table: user, type, amount, status, date, reference, description
- [ ] **1.6.6** Transaction filters: by user, by type (credit/debit/top-up/order/commission), by status, by date range
- [ ] **1.6.7** Wallet analytics cards: total wallet balance across platform, total credits today, total debits today, pending requests count
- [ ] **1.6.8** Wallet analytics chart: transaction volume over time

### 1.7 Admin Orders Page — `AdminOrdersPage.tsx`

> **Why seventh**: With users funded, orders will start flowing. Admin needs to view, process, and manage them.

- [ ] **1.7.1** Orders table: order number, user, type (single/bulk), items summary, total amount, status, payment status, date, actions
- [ ] **1.7.2** Filters: by status (pending/processing/completed/failed/cancelled), by payment status, by user, by provider, by date range, search by order number
- [ ] **1.7.3** View Order detail sheet/page: full order info, item breakdown (phone, bundle, amount, status each), customer info, timeline/audit
- [ ] **1.7.4** Process order action (mark as processing → completed/failed per item)
- [ ] **1.7.5** Cancel order with reason
- [ ] **1.7.6** Handle reported orders: view reported orders tab, resolve or re-process
- [ ] **1.7.7** Order stat cards: total orders, completed today, failed today, pending, total revenue today
- [ ] **1.7.8** Bulk order processing (select multiple → process)
- [ ] **1.7.9** Order analytics: volume over time chart, by provider pie chart, by status breakdown

### 1.8 Admin Commissions Page — `AdminCommissionsPage.tsx`

> **Why eighth**: After orders are processed, commissions are generated. Admin manages payouts.

- [ ] **1.8.1** Commission settings summary at top (rates per role, payout threshold, enabled status)
- [ ] **1.8.2** All commissions table: user, amount, status (pending/approved/paid/rejected), period, order reference, date
- [ ] **1.8.3** Filters: by user, by status, by period (month/year), by date range
- [ ] **1.8.4** Pay commission action (individual) with confirmation
- [ ] **1.8.5** Reject commission with reason
- [ ] **1.8.6** Batch pay: select multiple → pay all
- [ ] **1.8.7** Generate commissions manually (trigger commission generation for a period)
- [ ] **1.8.8** Monthly summaries view: month, total earned, total paid, total pending, total rejected
- [ ] **1.8.9** Commission stat cards: total pending, total paid this month, total rejected, current period stats
- [ ] **1.8.10** Commission statistics chart: monthly commission trends

### 1.9 Admin Announcements Page — `AdminAnnouncementsPage.tsx`

> **Why ninth**: Admin communicates with users through announcements.

- [ ] **1.9.1** Announcements table: title, type (info/warning/promotion/update), priority, target audience, status (active/expired/draft), created date, read/view stats, actions
- [ ] **1.9.2** Create Announcement form: title, content (rich text or textarea), type, priority (low/medium/high/critical), target audience (all/admin/agent/specific roles), expiry date, action link
- [ ] **1.9.3** Use announcement templates (load from API) as starting points
- [ ] **1.9.4** Edit announcement
- [ ] **1.9.5** Delete announcement with confirmation
- [ ] **1.9.6** Broadcast announcement action (push to all targeted users)
- [ ] **1.9.7** View announcement stats: total reads, total views, engagement rate
- [ ] **1.9.8** Filter by type, status, priority, target audience

### 1.10 Admin Storefronts Page — `AdminStorefrontsPage.tsx`

> **Why tenth**: Admin manages agent storefronts.

- [ ] **1.10.1** Storefronts table: agent name, business name, display name, status (pending/approved/suspended), created date, order count, actions
- [ ] **1.10.2** Filters: by status, search by name
- [ ] **1.10.3** Approve storefront with confirmation
- [ ] **1.10.4** Suspend storefront with reason
- [ ] **1.10.5** Delete storefront with confirmation
- [ ] **1.10.6** View storefront detail: agent info, configuration, enabled bundles, orders, analytics
- [ ] **1.10.7** Storefront stat cards: total, approved, pending approval, suspended

### 1.11 Admin Analytics Page — `AdminAnalyticsPage.tsx`

> **Why eleventh**: Visual overview of platform performance.

- [ ] **1.11.1** Timeframe selector (already exists) — wire to actual data fetching
- [ ] **1.11.2** Summary stat cards: total revenue, total orders, active users, new signups (for selected timeframe)
- [ ] **1.11.3** Revenue chart (line/area chart over time using Recharts)
- [ ] **1.11.4** Orders chart (bar chart: completed vs failed vs cancelled)
- [ ] **1.11.5** Orders by provider chart (pie/donut chart)
- [ ] **1.11.6** Top agents table (by order volume or revenue)
- [ ] **1.11.7** User growth chart (new signups over time)
- [ ] **1.11.8** Revenue by provider breakdown
- [ ] **1.11.9** Real-time stats section (active users, orders in progress) using polling or WebSocket

### 1.12 Admin Dashboard Page — `AdminDashboardPage.tsx`

> **Why last in admin**: The dashboard is a summary of everything else. Build it after all detail pages exist so you know what to surface.

- [ ] **1.12.1** Key stat cards: total revenue (today/this month), total orders (today/this month), active users, pending approvals (users + wallet + storefronts)
- [ ] **1.12.2** Quick actions: links to pending wallet requests, pending user approvals, pending storefronts
- [ ] **1.12.3** Recent orders table (last 5-10 orders with status)
- [ ] **1.12.4** Revenue trend mini-chart (last 7 days, small line chart)
- [ ] **1.12.5** Orders by status breakdown (today)
- [ ] **1.12.6** System health indicators: site status, pending background jobs, recent errors
- [ ] **1.12.7** Announcement banner: latest active announcement, if any

---

## Phase 2: Agent / Business User Pages

> Build all agent-facing pages. These are what the actual platform users interact with daily.

### 2.1 Agent Bundles Page — `BundlesPage.tsx`

> **Why first for agents**: Agents need to browse available bundles before they can place orders.

- [ ] **2.1.1** Bundle browsing grid/list: provider tabs or filter, package categories
- [ ] **2.1.2** Bundle card: provider logo, name, data volume, validity, price (user-type-specific), add-to-cart or quick-buy button
- [ ] **2.1.3** Filter by provider (MTN/Telecel/AT/AFA), by category, by price range, search by name
- [ ] **2.1.4** Bundle detail view/modal: full info, pricing for the user's role, features
- [ ] **2.1.5** "Buy Now" action → navigates to order creation with bundle pre-selected

### 2.2 Agent Orders Page — `OrdersPage.tsx`

> **Why second**: The core action — placing and tracking orders.

- [ ] **2.2.1** Create Order form (single):
  - Select provider → select package → select bundle (cascading dropdowns)
  - Enter phone number, optional customer name
  - Show price, confirm, deduct from wallet
- [ ] **2.2.2** Create Bulk Order form:
  - Same bundle selection, but enter multiple phone numbers (textarea, one per line or CSV upload)
  - Preview list with per-item amount and total
  - Confirm and submit all
- [ ] **2.2.3** Orders list table: order number, type, bundle summary, recipient phone, amount, status, date, actions
- [ ] **2.2.4** Filters: by status, by provider, by date range, search by order number or phone
- [ ] **2.2.5** View Order detail: full breakdown, item statuses, timeline
- [ ] **2.2.6** Cancel pending order action
- [ ] **2.2.7** Report failed order action (for orders that were charged but didn't deliver)
- [ ] **2.2.8** Order stat cards: total orders, completed, pending, failed (for the agent)
- [ ] **2.2.9** Re-order action (create new order from a previous order's details)

### 2.3 Agent Wallet Page — `WalletPage.tsx`

> **Why third**: Agents need wallet balance to place orders.

- [ ] **2.3.1** Wallet balance card (prominent display of current balance)
- [ ] **2.3.2** Request Top-Up form: amount, payment reference/proof, payment method
- [ ] **2.3.3** Pending top-up requests section (show status of submitted requests)
- [ ] **2.3.4** Transaction history table: type (credit/debit/order/top-up/commission), amount, balance after, description, date, status
- [ ] **2.3.5** Filters: by type, by date range, search by reference
- [ ] **2.3.6** Wallet stat cards: current balance, total credited (this month), total spent (this month), pending top-ups

### 2.4 Agent Commissions Page — `CommissionsPage.tsx`

> **Why fourth**: Agents track their earned commissions.

- [ ] **2.4.1** Commission stat cards: total earned (this month), total paid, total pending, commission rate (for user's role)
- [ ] **2.4.2** Current month commission list: order reference, amount, status, date
- [ ] **2.4.3** Monthly summaries table: month, total earned, total paid, total pending
- [ ] **2.4.4** Filter by status, by month

### 2.5 Agent Storefront Page — `StorefrontPage.tsx`

> **Why fifth**: Agents set up their personal reseller storefronts.

- [ ] **2.5.1** Storefront setup form (if no storefront exists): business name (slug), display name, contact info, payment methods, description
- [ ] **2.5.2** Storefront status display: approved/pending/suspended with relevant messaging
- [ ] **2.5.3** Storefront settings: edit display name, contact info, payment methods, toggle active/inactive
- [ ] **2.5.4** Bundle management: enable/disable bundles for storefront, set custom pricing per bundle
- [ ] **2.5.5** Storefront orders table: orders placed through the storefront by customers
- [ ] **2.5.6** Storefront analytics: total orders, revenue, popular bundles
- [ ] **2.5.7** Share storefront link (public URL for customers)
- [ ] **2.5.8** Storefront preview: see what customers will see

### 2.6 Agent Analytics Page — `AnalyticsPage.tsx`

> **Why sixth**: Agents review their business performance.

- [ ] **2.6.1** Timeframe selector (wire existing to real data)
- [ ] **2.6.2** Summary stat cards: total orders, total spent, total commissions earned, success rate (for timeframe)
- [ ] **2.6.3** Orders over time chart (line/bar)
- [ ] **2.6.4** Orders by provider chart (pie/donut)
- [ ] **2.6.5** Revenue/spending breakdown chart
- [ ] **2.6.6** Top-selling bundles list
- [ ] **2.6.7** Storefront performance summary (if storefront exists)

### 2.7 Agent Dashboard Page — `DashboardPage.tsx`

> **Why last for agents**: Same reasoning as admin — build after all detail pages exist.

- [ ] **2.7.1** Key stat cards: wallet balance, total orders (today/this week), total spent (today/this week), pending commissions
- [ ] **2.7.2** Quick actions: "Place Order" button, "Top Up Wallet" button, "View Storefront" button
- [ ] **2.7.3** Recent orders table (last 5 with status badges)
- [ ] **2.7.4** Recent transactions list (last 5)
- [ ] **2.7.5** Active announcements banner/card
- [ ] **2.7.6** Commission summary for current month
- [ ] **2.7.7** Quick-buy section: popular/recent bundles with one-click reorder

---

## Phase 3: Unrouted Agent Pages & Missing Routes

> Pages that exist on disk but need routes added in App.tsx + nav links in layouts.

### 3.1 Agent Announcements Page — `AnnouncementsPage.tsx`

- [ ] **3.1.1** Add route in `App.tsx` under agent layout
- [ ] **3.1.2** Add nav link in `DashboardLayout.tsx`
- [ ] **3.1.3** Active announcements list: title, type badge, priority indicator, date, read/unread status
- [ ] **3.1.4** View announcement detail (expand or modal)
- [ ] **3.1.5** Mark as read/acknowledged

### 3.2 Agent Providers Page — `ProvidersPage.tsx` (optional, read-only)

- [ ] **3.2.1** Add route in `App.tsx` under agent layout (if desired)
- [ ] **3.2.2** Read-only provider list: logo, name, code, status, available packages
- [ ] **3.2.3** Provider detail: click to see packages/bundles for that provider

### 3.3 Agent Packages Page — `PackagesPage.tsx` (optional, read-only)

- [ ] **3.3.1** Add route in `App.tsx` under agent layout (if desired)
- [ ] **3.3.2** Read-only package browsing: filter by provider, category
- [ ] **3.3.3** Package detail: see bundles within the package, pricing

### 3.4 Agent Settings Page — `SettingsPage.tsx` (optional, agent preferences)

- [ ] **3.4.1** Add route in `App.tsx` under agent layout
- [ ] **3.4.2** Add nav link in `DashboardLayout.tsx`
- [ ] **3.4.3** Notification preferences (push notification toggle, email notification toggle)
- [ ] **3.4.4** Display preferences (theme toggle if applicable)

---

## Phase 4: Public / Guest Pages

> Pages accessible without authentication.

### 4.1 Public Storefront Page

- [ ] **4.1.1** Create `PublicStorefrontPage.tsx` for `/store/:businessName`
- [ ] **4.1.2** Add route in `App.tsx` (public, no guard)
- [ ] **4.1.3** Display storefront info: business name, display name, contact, payment methods
- [ ] **4.1.4** Browse enabled bundles: provider tabs, bundle cards with custom pricing
- [ ] **4.1.5** Place order as guest: select bundle, enter phone number, see price, submit order
- [ ] **4.1.6** Order confirmation page/dialog

### 4.2 Agent Registration Page

- [ ] **4.2.1** Create `RegisterPage.tsx` for `/register`
- [ ] **4.2.2** Add route in `App.tsx` under GuestGuard
- [ ] **4.2.3** Registration form: full name, email, phone, password, business name (optional), referral code (optional)
- [ ] **4.2.4** Email verification flow: show "check your email" message after registration
- [ ] **4.2.5** Link from login page

### 4.3 Email Verification Page

- [ ] **4.3.1** Create `VerifyEmailPage.tsx` for `/verify-email/:token`
- [ ] **4.3.2** Add route in `App.tsx`
- [ ] **4.3.3** Auto-verify on mount, show success/error state
- [ ] **4.3.4** Resend verification email action

---

## Phase 5: Cross-Cutting Enhancements

> Features that span across multiple pages.

### 5.1 Real-Time Updates (WebSocket Integration)

- [ ] **5.1.1** Create WebSocket context/hook for frontend (connect on auth, disconnect on logout)
- [ ] **5.1.2** Real-time order status updates (auto-update order tables when status changes)
- [ ] **5.1.3** Real-time notification count updates (badge in header)
- [ ] **5.1.4** Real-time wallet balance updates
- [ ] **5.1.5** Real-time admin dashboard counters

### 5.2 Push Notifications

- [ ] **5.2.1** Service worker registration for push notifications
- [ ] **5.2.2** Push subscription flow: request permission, send subscription to backend
- [ ] **5.2.3** Handle incoming push notifications (click to navigate to relevant page)

### 5.3 Theme / Dark Mode

- [ ] **5.3.1** Dark mode toggle in header (CSS variables already in `index.css`)
- [ ] **5.3.2** Persist theme preference in localStorage
- [ ] **5.3.3** Respect system preference on first visit

### 5.4 Error Handling & Toasts

- [ ] **5.4.1** Global error boundary component (catch React errors gracefully)
- [ ] **5.4.2** API error toast handler (show toast on mutation errors using sonner)
- [ ] **5.4.3** Network offline detection and banner
- [ ] **5.4.4** Session expiry handling (redirect to login with message)

### 5.5 Responsive Design

- [ ] **5.5.1** Mobile-responsive sidebar (collapsible hamburger menu, already partially in layouts)
- [ ] **5.5.2** Mobile-responsive tables (horizontal scroll or card-view on small screens)
- [ ] **5.5.3** Mobile-optimized order creation form
- [ ] **5.5.4** Mobile-optimized storefront browsing

---

## Implementation Order Summary

| # | Task | Depends On | Estimated Complexity |
|---|------|-----------|---------------------|
| **0** | **Foundation (shadcn + reusable components)** | Nothing | Medium |
| **1.1** | Admin Settings | Phase 0 | Medium |
| **1.2** | Admin Providers | Phase 0 | Medium |
| **1.3** | Admin Packages | 1.2 (provider select) | Medium |
| **1.4** | Admin Bundles | 1.2, 1.3 (cascading selects) | High |
| **1.5** | Admin Users | Phase 0 | High |
| **1.6** | Admin Wallet | Phase 0 | High |
| **1.7** | Admin Orders | Phase 0 | High |
| **1.8** | Admin Commissions | Phase 0 | Medium-High |
| **1.9** | Admin Announcements | Phase 0 | Medium |
| **1.10** | Admin Storefronts | Phase 0 | Medium |
| **1.11** | Admin Analytics | Phase 0, Recharts | Medium-High |
| **1.12** | Admin Dashboard | 1.1–1.11 (summary of all) | Medium |
| **2.1** | Agent Bundles | Phase 0 | Medium |
| **2.2** | Agent Orders | 2.1 (bundle select) | High |
| **2.3** | Agent Wallet | Phase 0 | Medium |
| **2.4** | Agent Commissions | Phase 0 | Low-Medium |
| **2.5** | Agent Storefront | Phase 0 | High |
| **2.6** | Agent Analytics | Phase 0, Recharts | Medium |
| **2.7** | Agent Dashboard | 2.1–2.6 (summary of all) | Medium |
| **3.x** | Unrouted pages + routes | Phase 0 | Low-Medium |
| **4.1** | Public Storefront | Phase 0 | Medium-High |
| **4.2** | Registration | Phase 0 | Medium |
| **4.3** | Email Verification | Phase 0 | Low |
| **5.x** | Cross-cutting enhancements | Phases 1-4 | Medium-High |

---

## Notes

- **Every page already has**: working backend endpoints, frontend services, TanStack Query hooks, TypeScript types, and query keys. The work is **purely UI implementation**.
- **shadcn/ui components** should be installed on-demand as each page is built. The list in Phase 0 is the comprehensive set; install in batches as needed.
- **No backend changes needed** unless a bug is discovered during frontend integration testing.
- **Testing checkpoints**: After each phase, run `npx tsc --noEmit` and `npx vite build` to catch type errors.
