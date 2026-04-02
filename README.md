# RetailPulse — Retail Intelligence System

A real-time retail analytics and cashier management system built with React, Vite, Supabase, and TypeScript.

## Features

- **Admin Dashboard**: KPI overview, sales analytics, inventory, employee management, and AI insights.
- **Cashier Portal**: Staff login, new sale entry, shift summary, and real-time sync.
- **Supabase Backend**: Real-time subscriptions, RLS, and PostgreSQL triggers for stock management.

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env.local` file with your Supabase credentials:

```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Database Setup

Run the SQL migrations in order via the Supabase SQL Editor:

1. `supabase/migrations/initialize_schema.sql` — creates tables, RLS, and stock triggers
2. `supabase/migrations/fix_rls_policies.sql` — simplified policies + auto-profile trigger

## Routes

| Route | Description |
|-------|-------------|
| `/` | Role selection landing page |
| `/admin` | Admin Dashboard |
| `/cashier` | Cashier Portal (Login / Register) |
| `/sales` | Sales Analytics |
| `/inventory` | Inventory Management |
| `/realtime` | Live Transaction Feed |
