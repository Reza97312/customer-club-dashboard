# System Architecture & Technical Design

## Overview

The Customer Club Dashboard is built as a high-performance, responsive Single Page Application (SPA) leveraging Next.js 16 (App Router) and React 19. It follows a feature-first component-driven architecture designed for scalability, maintainability, and optimal user experience.

## Tech Stack

- Framework: Next.js 16.1.1 (App Router) & React 19.2.3
- Language: TypeScript 5
- Styling & UI: Tailwind CSS v4, Shadcn UI, Radix UI Primitives, Lucide Icons, Framer Motion
- State Management: Zustand 5 (Global client state & Auth session)
- Server State & Data Fetching: TanStack React Query v5 & Axios
- Form Management & Validation: React Hook Form & Zod
- Data Visualization & Toasts: Recharts & Sonner

## Project Architecture & Directory Structure

src/
├── app/
│ ├── (auth)/
│ ├── (main)/
│ ├── favicon.ico
│ ├── globals.css
│ └── layout.tsx
├── assets/
├── docs/
├── features/
│ ├── auth/
│ ├── banner/
│ ├── customer-club/
│ ├── levels/
│ ├── recent-activities/
│ ├── specialty/
│ ├── user/
│ └── welcome/
├── shared/
│ ├── components/
│ │ ├── layout/
│ │ ├── providers/
│ │ └── ui/
│ ├── hooks/
│ ├── types/
│ └── utils/
└── tests/
├── mocks/
└── setup.ts

## Architectural Patterns

### 1. Feature-First Organization

Code is encapsulated by domain features (`auth`, banner, customer-club, levels, recent-activities, specialty, user, `welcome`). Each feature directory isolates its own hooks, services, UI components, and TypeScript definitions. This prevents deep dependency chains and makes scaling seamless.

### 2. State Segregation

- Global Auth State: Managed with Zustand (`useAuthStore`) for instant access to tokens and user session state across components without re-render cascades.
- Server State Caching: Managed by TanStack Query (React Query) for automatic background fetching, cache invalidation, and race-condition handling.
- Local Component State: Handled via native React hooks (`useState`, `useMemo`).

### 3. Image Optimization & Fallback Strategy

Dynamic images fetched from remote API URLs (such as user tier badges) fall back gracefully to local static assets (`src/assets`) whenever remote assets or API links are unavailable or null.
