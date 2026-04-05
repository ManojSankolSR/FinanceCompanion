# Finance Companion — Personal Finance Mobile App

A production-grade personal finance companion app built with React Native.

---

## Features

- **Home Dashboard** — Animated balance card, 7-day spending bar chart, goal progress, recent transactions
- **Transaction Tracking** — Full CRUD, swipe to delete/edit, search, filter by type & category, grouped by date
- **Goals** — Monthly savings goals with streak tracking, gamified badges, progress visualization
- **Insights** — Category donut chart, week-over-week bar comparison, 6-month line trend, top spending alert
- **Profile** — Editable name, currency selection (INR/USD/EUR/GBP/JPY), monthly budget, financial summary

---

## Tech Stack

| Library                      | Purpose                               |
| ---------------------------- | ------------------------------------- |
| React Native 0.84.1          | Framework                             |
| TypeScript                   | Type safety                           |
| Redux Toolkit                | State management                      |
| Realm + @realm/react         | Local database                        |
| React Navigation v7          | Navigation (Stack + Bottom Tabs)      |
| react-native-gifted-charts   | Charts (Bar, Line, Pie/Donut)         |
| react-native-linear-gradient | UI gradients                          |
| react-native-gesture-handler | Swipeable rows                        |
| react-native-vector-icons    | Icon library (MaterialCommunityIcons) |
| date-fns                     | Date utilities                        |

---

## Folder Structure

```
src/
├── app/           # Redux store and typed hooks
├── constants/     # Colors, typography, categories
├── db/            # Realm schemas and config
├── features/      # Redux slices & selectors
│   ├── transactions/
│   ├── goals/
│   └── ui/
├── navigation/    # Navigators and type definitions
├── screens/       # All 5 screens with sub-components
├── components/    # Shared UI components + AppInitializer
├── hooks/         # Realm↔Redux bridge hooks
└── utils/         # Currency, date, mock data helpers
```

---

## Setup & Run

### Prerequisites

- Node.js ≥ 22
- React Native development environment set up (Android Studio / Xcode)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. iOS only — install pods
cd ios && pod install && cd ..

# 3. For Android — Link fonts (already done)
npx react-native-asset

# 4. Run on Android
npm run android

# 5. Run on iOS
npm run ios
```

---

## Architecture Decisions

### Data Flow: Realm → Redux

- **Realm** is the single source of truth for persistence (local DB)
- **Redux** mirrors the data for reactive UI, filtering, and memoized selectors
- On app launch, `AppInitializer` reads Realm and populates Redux
- Writes: call Realm first (in hooks), then dispatch to Redux

### State Management

- `transactionsSlice` — items list + filter/search/sort state
- `goalsSlice` — goals list
- `uiSlice` — user preferences, modal state, snackbar

### Memoized Selectors

All derived values (total income, expense, balance, category breakdown, chart data) are computed via `createSelector` from Redux Toolkit — zero redundant recalculations.

---

## Creative Feature: Goal Streaks

The Goals feature includes a **month streak tracker**:

- Every month a goal's target is met → streak counter increments
- Best streak is persisted in Realm
- Visual status: `On Track` / `At Risk` / `Achieved!` with color coding
- Gamified badge display with 🔥 emoji and streak count

---

## Seed Data

On first launch, the app is pre-populated with:

- 3 months of salary income
- ~80 random expense transactions across 12 categories
- 4 freelance income entries
- 2 sample goals (Emergency Fund, Vacation Fund)

This ensures the app looks rich and functional out of the box.

---

## Design System

- **Background**: `#0A0E1A` — deep dark navy
- **Card surfaces**: `#111827` / `#1C2333`
- **Gradient**: Indigo `#6C63FF` → Violet `#A855F7`
- **Income**: `#10B981` (green) / **Expense**: `#F43F5E` (red)
- **Default currency**: INR (₹) — configurable in Profile
