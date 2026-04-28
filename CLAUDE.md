# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run start          # Expo dev server
bun run ios            # run on iOS simulator
bun run android        # run on Android emulator
bun run web            # run web target
bun run lint           # ESLint via expo lint
```

No test framework is configured.

## Architecture

Clean Architecture with four layers. Dependency direction: `presentation → domain → data → core`.

```
app/                   # expo-router entry, providers bootstrap
src/
  core/                # cross-cutting: config, DI, store, i18n, errors, utils
  domain/              # entities, repository interfaces, use-case hooks
  data/                # RTK Query API definitions, models, storage
  presentation/        # screens, components, navigation, theme
```

### State and networking

All server state is managed by **RTK Query** (`@reduxjs/toolkit`). The single API slice lives at `src/data/api/postsApi.ts` (`createApi`). The Redux store at `src/core/store/store.ts` mounts only that slice.

`src/core/network/baseQuery.ts` wraps RTK's `fetchBaseQuery` with:
- network connectivity check before every request
- bearer token injection from `LocalStore`
- cURL logging in dev mode
- auto-clear storage + redirect to `/` on 401/403

### Domain use cases as hooks

Domain use cases (`src/domain/usecases/`) are React hooks, not classes. They wrap RTK Query hooks exported from `postsApi` and expose a stable interface to the presentation layer:

- `useGetPosts` → wraps `useGetPostsQuery`
- `useMutatePost` → wraps `useCreatePostMutation`, `useUpdatePostMutation`, `useDeletePostMutation`

Screen-level logic (`usePostCrudScreen`) composes these domain hooks and owns local UI state (form fields, editing ID, etc.).

### DI

`tsyringe` + `reflect-metadata` are imported but the container has no active registrations (`src/core/di/container.ts` just re-exports the empty container). Decorators/metadata plugins are still required in `babel.config.js` for tsyringe compatibility.

### Storage

`LocalStore` (`src/data/storage/LocalStore.ts`) abstracts `expo-secure-store` on native and `localStorage` on web. Used for auth token only.

### Theme

`ThemeContext` (`src/presentation/theme/ThemeContext.tsx`) tracks dark/light/system preference. `useAppTheme()` hook exposes `{ theme, isDark, toggleTheme, setSystemTheme }`. `makeStyles` helper at `src/presentation/theme/makeStyles.ts` creates style factories that receive the theme.

### i18n

`i18next` initialized in `src/core/i18n/index.ts`. Locales: `en`, `ta`. Auto-detects device language via `expo-localization`. Imported once in `app/_layout.tsx`.

### Routing

expo-router file-based routing. Main routes:
- `app/(tabs)/index.tsx` → PostCrudScreen
- `app/(tabs)/settings.tsx` → SettingsScreen
- `app/post/[id].tsx` → PostDetailScreen

### Config

API base URL resolved in `src/core/config/env.ts`: `EXPO_PUBLIC_API_BASE_URL` env var → `app.config.ts` extra → fallback `https://jsonplaceholder.typicode.com`.

## Notes

- `CODEBASE_DOCUMENTATION.md` is stale — describes the old React Query + Axios + class-based use-case architecture that was replaced.
- `skills.md` is a developer reference guide, not runtime code.
- Package manager: **bun** (`bun.lock` present).
