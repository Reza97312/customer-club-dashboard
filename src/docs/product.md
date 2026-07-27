# Product Overview & Feature Documentation

## Project Vision

The Customer Club Dashboard is designed to boost user retention and engagement through gamification, progression tracking, missions, and dynamic tier rewards.

## Key Features

### 1. User Tier Progression & Levels System

- Dynamic Gamification: Visualizes user progress across multiple reward tiers (e.g., Bronze, Silver, Gold, Diamond).
- Progress Calculation: Calculates user score progression dynamically relative to tier thresholds, offering fluid visual feedback via animated progress bars.
- Dynamic & Fallback Badge System: Badge graphics are dynamically resolved from backend media assets. If backend images are missing or null, predefined vector fallbacks are displayed.

### 2. Debounced Real-Time Search

- Provides real-time search capabilities across ads and missions.
- Incorporates a custom useDebounce hook (default: 500ms delay) to minimize redundant API calls and optimize server performance.

### 3. User Missions & Task Center

- Tracks progress towards the next rank unlock and displays remaining required scores.

### 4. Interactive & Animated UI/UX

- Smooth UI transitions powered by Framer Motion.
- Accessible and responsive layout adapted for both desktop and mobile views using Tailwind CSS.
