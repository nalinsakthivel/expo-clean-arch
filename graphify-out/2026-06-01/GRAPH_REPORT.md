# Graph Report - .  (2026-06-01)

## Corpus Check
- Corpus is ~27,534 words - fits in a single context window. You may not need a graph.

## Summary
- 367 nodes · 473 edges · 37 communities (27 shown, 10 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.86)
- Token cost: 3,200 input · 2,800 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Clean Architecture Layers|Clean Architecture Layers]]
- [[_COMMUNITY_App Layout & Navigation|App Layout & Navigation]]
- [[_COMMUNITY_Package Dependencies|Package Dependencies]]
- [[_COMMUNITY_Tamil Translations|Tamil Translations]]
- [[_COMMUNITY_Posts API & Data Models|Posts API & Data Models]]
- [[_COMMUNITY_Config, Errors & Constants|Config, Errors & Constants]]
- [[_COMMUNITY_English Translations|English Translations]]
- [[_COMMUNITY_Build & Dev Tooling|Build & Dev Tooling]]
- [[_COMMUNITY_Screens & Components|Screens & Components]]
- [[_COMMUNITY_Post UI Strings|Post UI Strings]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_VS Code & i18n Settings|VS Code & i18n Settings]]
- [[_COMMUNITY_Splash Screen Assets|Splash Screen Assets]]
- [[_COMMUNITY_Android Icon Background|Android Icon Background]]
- [[_COMMUNITY_Android Icon Foreground|Android Icon Foreground]]
- [[_COMMUNITY_Favicon Asset|Favicon Asset]]
- [[_COMMUNITY_App Icon Design|App Icon Design]]
- [[_COMMUNITY_React Logo 2x|React Logo 2x]]
- [[_COMMUNITY_React Logo 3x|React Logo 3x]]
- [[_COMMUNITY_React Logo Brand|React Logo Brand]]
- [[_COMMUNITY_Custom Image Component|Custom Image Component]]
- [[_COMMUNITY_Android Monochrome Icon|Android Monochrome Icon]]
- [[_COMMUNITY_Partial React Logo|Partial React Logo]]
- [[_COMMUNITY_Metro Bundler Config|Metro Bundler Config]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Alert Utilities|Alert Utilities]]
- [[_COMMUNITY_Toast Utilities|Toast Utilities]]
- [[_COMMUNITY_Haptics Utilities|Haptics Utilities]]
- [[_COMMUNITY_Linking Utilities|Linking Utilities]]
- [[_COMMUNITY_VS Code Extensions|VS Code Extensions]]
- [[_COMMUNITY_Redux Selector Hook|Redux Selector Hook]]
- [[_COMMUNITY_RTK Query Hooks Export|RTK Query Hooks Export]]
- [[_COMMUNITY_Bun Package Manager|Bun Package Manager]]

## God Nodes (most connected - your core abstractions)
1. `post` - 13 edges
2. `post` - 13 edges
3. `Post` - 12 edges
4. `useAppTheme()` - 10 edges
5. `settings` - 9 edges
6. `settings` - 9 edges
7. `Clean Architecture (Four Layers)` - 9 edges
8. `Stale Architecture Documentation (React Query + Axios + class-based)` - 9 edges
9. `scripts` - 7 edges
10. `compilerOptions` - 7 edges

## Surprising Connections (you probably didn't know these)
- `React Query (TanStack, old state management)` --semantically_similar_to--> `RTK Query (Server State / API Slice)`  [INFERRED] [semantically similar]
  CODEBASE_DOCUMENTATION.md → CLAUDE.md
- `Axios HTTP Client (old networking)` --semantically_similar_to--> `baseQuery (fetchBaseQuery Wrapper)`  [INFERRED] [semantically similar]
  CODEBASE_DOCUMENTATION.md → CLAUDE.md
- `DI Registrations (old container registrations)` --semantically_similar_to--> `DI Container (tsyringe, empty)`  [INFERRED] [semantically similar]
  CODEBASE_DOCUMENTATION.md → CLAUDE.md
- `TabLayout()` --calls--> `useAppTheme()`  [EXTRACTED]
  app/(tabs)/_layout.tsx → src/presentation/theme/ThemeContext.tsx
- `RootContent()` --calls--> `useAppTheme()`  [EXTRACTED]
  app/_layout.tsx → src/presentation/theme/ThemeContext.tsx

## Import Cycles
- 1-file cycle: `metro.config.js -> metro.config.js`

## Hyperedges (group relationships)
- **Clean Architecture Four Layers (Presentation, Domain, Data, Core)** — claude_md_presentation_layer, claude_md_domain_layer, claude_md_data_layer, claude_md_core_layer [EXTRACTED 1.00]
- **RTK Query + baseQuery + postsApi form Server State / Networking pattern** — claude_md_rtk_query, claude_md_base_query, claude_md_posts_api, claude_md_redux_store [EXTRACTED 1.00]
- **Domain Use Case Hooks (useGetPosts + useMutatePost compose into usePostCrudScreen)** — claude_md_usegetposts, claude_md_usemutatepost, claude_md_usepostcrudscreen [EXTRACTED 1.00]

## Communities (37 total, 10 thin omitted)

### Community 0 - "Clean Architecture Layers"
Cohesion: 0.08
Nodes (42): baseQuery (fetchBaseQuery Wrapper), Clean Architecture (Four Layers), Core Layer, Data Layer, DI Container (tsyringe, empty), Domain Layer, env.ts (API Base URL Config), Expo Router (File-based Routing) (+34 more)

### Community 1 - "App Layout & Navigation"
Cohesion: 0.09
Nodes (22): RootContent(), resources, PostDetailParams, PostDetailProps, PostDetailScreen(), useStyles, SettingsScreen(), useStyles (+14 more)

### Community 2 - "Package Dependencies"
Cohesion: 0.06
Nodes (32): dependencies, expo, expo-constants, expo-haptics, expo-image, expo-linking, expo-localization, expo-network (+24 more)

### Community 3 - "Tamil Translations"
Cohesion: 0.07
Nodes (29): detail, loading, notFound, title, post, bodyPlaceholder, cancelEdit, createBtn (+21 more)

### Community 4 - "Posts API & Data Models"
Cohesion: 0.14
Nodes (13): postsApi, Post, CreatePostRequestDTO, PostDTO, PostModel, UpdatePostRequestDTO, CreatePostInput, PostRepository (+5 more)

### Community 5 - "Config, Errors & Constants"
Cohesion: 0.12
Nodes (17): env, ExpoExtra, isValidUrl(), resolveApiBaseUrl(), MyConstants, AppError, AppErrorCode, extractMessage() (+9 more)

### Community 6 - "English Translations"
Cohesion: 0.11
Nodes (17): CustomTypeOptions, detail, loading, notFound, title, settings, darkTheme, english (+9 more)

### Community 7 - "Build & Dev Tooling"
Cohesion: 0.11
Nodes (18): devDependencies, @babel/plugin-proposal-decorators, babel-plugin-transform-typescript-metadata, eslint, eslint-config-expo, @types/react, typescript, main (+10 more)

### Community 8 - "Screens & Components"
Cohesion: 0.16
Nodes (10): PostCard(), PostCardProps, useStyles, back(), navigateTo(), resetTo(), ROUTES, PostCrudScreen() (+2 more)

### Community 9 - "Post UI Strings"
Cohesion: 0.15
Nodes (13): post, bodyPlaceholder, cancelEdit, createBtn, delete, deleting, edit, header (+5 more)

### Community 10 - "TypeScript Config"
Cohesion: 0.17
Nodes (11): compilerOptions, baseUrl, emitDecoratorMetadata, experimentalDecorators, paths, skipLibCheck, strict, exclude (+3 more)

### Community 11 - "VS Code & i18n Settings"
Cohesion: 0.25
Nodes (7): editor.codeActionsOnSave, source.fixAll, source.organizeImports, source.sortMembers, i18n-ally.enabledFrameworks, i18n-ally.keystyle, i18n-ally.localesPaths

### Community 12 - "Splash Screen Assets"
Cohesion: 0.43
Nodes (7): App Branding / Loading Screen, White Background with Light Gray Elements, Concentric Circles Splash Icon Design, Splash Screen Icon (splash-icon.png), Background Grid Pattern, Concentric Circles Motif, Minimal Monochrome Grid Style

### Community 13 - "Android Icon Background"
Cohesion: 0.60
Nodes (5): Android Icon Background Asset, Light Blue Color Scheme, Android Icon Design Guidelines Template, Concentric Circles with Triangle Geometry, Center Alignment Grid Overlay

### Community 14 - "Android Icon Foreground"
Cohesion: 0.60
Nodes (5): Android Adaptive Icon Foreground Layer, Android Icon Foreground Image, Blue Gradient Color Scheme, App Brand Identity, Chevron / Caret Up Symbol

### Community 15 - "Favicon Asset"
Cohesion: 0.50
Nodes (5): App Icon Identity, Blue Arrow Logo Mark, Favicon PNG Asset, Light Blue Rounded Background, Favicon Visual Design

### Community 16 - "App Icon Design"
Cohesion: 0.50
Nodes (5): App Icon (expo-clean-arch), Brand Color - Sky Blue Gradient, Expo-Style Icon Format, Icon Grid Guidelines / Construction Lines, Icon Visual Design - Blue 3D Lambda/A Shape

### Community 17 - "React Logo 2x"
Cohesion: 0.50
Nodes (5): App Branding Asset, Atomic Symbol Design, React Logo 2x Retina Image, React Framework, 2x Retina Display Asset

### Community 18 - "React Logo 3x"
Cohesion: 0.50
Nodes (5): React Logo 3x Retina Asset, React Logo Visual Design - Cyan Atomic Orbits, Expo React Native Project, React Brand Logo, 3x Retina Display Variant

### Community 19 - "React Logo Brand"
Cohesion: 0.60
Nodes (5): Expo React Native App, React JavaScript Framework, React Logo Image Asset, React Brand Identity, React Logo Visual Design - Cyan Atom Symbol

### Community 21 - "Android Monochrome Icon"
Cohesion: 0.67
Nodes (4): Android Platform Target, Android Icon Monochrome PNG, App Brand Identity, Monochrome Chevron / Caret Up Logo Mark

### Community 22 - "Partial React Logo"
Cohesion: 0.67
Nodes (4): App Branding Asset, Partial React Logo Image, React Framework, React Logo Visual Design - Teal Atomic Orbits

### Community 23 - "Metro Bundler Config"
Cohesion: 0.67
Nodes (3): ALIASES, config, { getDefaultConfig }

## Knowledge Gaps
- **159 isolated node(s):** `recommendations`, `source.fixAll`, `source.organizeImports`, `source.sortMembers`, `i18n-ally.localesPaths` (+154 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `post` connect `Post UI Strings` to `English Translations`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **What connects `recommendations`, `source.fixAll`, `source.organizeImports` to the rest of the system?**
  _159 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Clean Architecture Layers` be split into smaller, more focused modules?**
  _Cohesion score 0.07549361207897794 - nodes in this community are weakly interconnected._
- **Should `App Layout & Navigation` be split into smaller, more focused modules?**
  _Cohesion score 0.08771929824561403 - nodes in this community are weakly interconnected._
- **Should `Package Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._
- **Should `Tamil Translations` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
- **Should `Posts API & Data Models` be split into smaller, more focused modules?**
  _Cohesion score 0.13756613756613756 - nodes in this community are weakly interconnected._