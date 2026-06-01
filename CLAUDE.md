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

### Path aliases

`@/*` resolves to `src/*` (configured in `tsconfig.json`). All cross-layer imports use this alias.

### State and networking

All server state managed by **RTK Query** (`@reduxjs/toolkit`). Single API slice at `src/data/api/postsApi.ts`. Redux store at `src/core/store/store.ts` mounts only that slice. Typed `useAppDispatch`/`useAppSelector` hooks at `src/core/store/hooks.ts`.

`src/core/network/baseQuery.ts` wraps RTK's `fetchBaseQuery` with:

- network connectivity check before every request
- bearer token injection from `LocalStore`
- cURL logging in dev mode
- auto-clear storage + `resetTo("/")` on 401/403

### Domain layer

`PostRepository` (`src/domain/repositories/PostRepository.ts`) is an interface only — no class implements it. RTK Query serves as the de-facto implementation; the interface exists for architectural reference.

Domain use cases (`src/domain/usecases/`) are React hooks wrapping RTK Query:
- `useGetPosts` → `useGetPostsQuery`
- `useMutatePost` → `useCreatePostMutation`, `useUpdatePostMutation`, `useDeletePostMutation`

### Data/model transformation

API DTOs use numeric `id`/`userId`; the domain `Post` entity uses `string`. `PostModel` (`src/data/models/PostModel.ts`) handles all DTO↔entity conversion. Always go through `PostModel` when bridging API responses to domain objects.

### Screen structure

Each screen lives at `src/presentation/screens/<name>/` with a colocated `use<Name>.ts` hook that owns all logic. Screens are thin — they only render. `usePostCrudScreen` composes `useGetPosts` + `useMutatePost` and owns local UI state (form fields, editing ID).

### DI

`tsyringe` + `reflect-metadata` imported but container has no active registrations (`src/core/di/container.ts` re-exports the empty container). Decorator/metadata babel plugins still required for tsyringe compatibility. `zustand` is also in dependencies but not yet used.

### Storage

`LocalStore` (`src/data/storage/LocalStore.ts`) abstracts `expo-secure-store` on native and `localStorage` on web. Used for auth token only. Keys in `src/data/storage/MyStorageConstants.ts`.

### Theme

`ThemeContext` (`src/presentation/theme/ThemeContext.tsx`) tracks dark/light/system preference. `useAppTheme()` exposes `{ theme, isDark, toggleTheme, setSystemTheme }`. `makeStyles` at `src/presentation/theme/makeStyles.ts` creates style factories receiving the theme. Tokens (colors, spacing, typography, borderRadius) defined in `src/presentation/theme/theme.ts`.

### i18n

`i18next` initialized in `src/core/i18n/index.ts`. Locales: `en`, `ta`. Auto-detects device language via `expo-localization`. Imported once in `app/_layout.tsx`. Translation keys typed via `src/core/i18n/i18next.d.ts`.

### Routing

expo-router file-based routing. `app/index.tsx` redirects to `/(tabs)`. Main routes:
- `app/(tabs)/index.tsx` → PostCrudScreen
- `app/(tabs)/settings.tsx` → SettingsScreen
- `app/post/[id].tsx` → PostDetailScreen

Typed route constants at `src/presentation/navigation/Routes.ts`. Imperative navigation (e.g. post-401 redirect) via `resetTo` in `src/presentation/navigation/RootNavigation.ts`.

### Config

API base URL resolved in `src/core/config/env.ts`: `EXPO_PUBLIC_API_BASE_URL` env var → `app.config.ts` extra → fallback `https://jsonplaceholder.typicode.com`.

## Notes

- `CODEBASE_DOCUMENTATION.md` is stale — describes old React Query + Axios + class-based architecture.
- `skills.md` is a developer reference guide, not runtime code.
- Package manager: **bun** (`bun.lock` present).
- Metro has a `tslib` alias fix and `unstable_enablePackageExports` enabled for web compatibility.
