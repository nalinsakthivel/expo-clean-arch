# 📱 Expo React Native Clean Architecture Guide

## 🎯 Goal

Build a scalable, maintainable, and testable mobile application using **Clean Architecture** principles with Expo.

This architecture separates concerns into layers so the app remains flexible and easy to scale.

---

# 🏗️ Architecture Overview

```
Presentation Layer  → UI & user interaction
Domain Layer        → Business logic & rules
Data Layer          → API & storage implementation
Core Layer          → Shared utilities & configs
```

### Dependency Rule

➡️ Outer layers depend on inner layers
➡️ Domain layer NEVER depends on frameworks

---

# 📁 Folder Structure

```
src/
│
├── app/                     # Expo Router entry
│   ├── _layout.tsx
│   └── index.tsx
│
├── presentation/            # UI Layer
│   ├── screens/
│   ├── components/
│   ├── hooks/               # view logic (ViewModels)
│   └── navigation/
│
├── domain/                  # Business Logic
│   ├── entities/
│   ├── usecases/
│   └── repositories/        # interfaces only
│
├── data/                    # Data handling
│   ├── api/
│   ├── repositories/        # implementations
│   └── storage/
│
├── core/                    # Shared app utilities
│   ├── constants/
│   ├── theme/
│   ├── utils/
│   ├── types/
│   └── config/
│
└── assets/
```

---

# 🧠 Layer Responsibilities

## 🎨 Presentation Layer

Handles UI and user interaction.

**Includes**

* Screens
* Components
* Navigation
* Hooks (view logic)

**Example**

```
presentation/screens/LoginScreen.tsx
presentation/hooks/useLogin.ts
```

---

## 🧩 Domain Layer (App Brain)

Contains business rules and logic.

**Includes**

* Entities (User, Order)
* UseCases (LoginUser, FetchProfile)
* Repository interfaces

**Example**

```
domain/entities/User.ts
domain/usecases/LoginUser.ts
domain/repositories/AuthRepository.ts
```

---

## 🗄️ Data Layer

Implements repository interfaces and manages data sources.

**Includes**

* API calls
* Local storage
* Repository implementations

**Example**

```
data/api/authApi.ts
data/repositories/AuthRepositoryImpl.ts
data/storage/tokenStorage.ts
```

---

## ⚙️ Core Layer

Shared configurations and utilities.

**Includes**

* Theme
* Constants
* Helpers
* Types

---

# 🔄 Data Flow

```
UI (Screen)
   ↓
Hook (ViewModel)
   ↓
Use Case
   ↓
Repository Interface
   ↓
Repository Implementation
   ↓
API / Local Storage
```

---

# 🚀 Expo Entry Setup

## app/_layout.tsx

Responsible for navigation & providers.

**Responsibilities**

* Theme provider
* Query client provider
* Safe area setup

---

## app/index.tsx

Initial screen loader & app bootstrapping.

**Responsibilities**

* Auth check
* App initialization
* Splash handling

---

# 🧰 Recommended Tech Stack (2026)

### Core

✅ Expo SDK
✅ TypeScript

### State & Data

✅ Zustand (lightweight state)
✅ TanStack Query (server state)

### Storage

✅ react-native-mmkv

### Navigation

✅ Expo Router

### Forms & Validation

✅ react-hook-form
✅ zod

### Networking

✅ Axios

### Dependency Injection

✅ tsyringe

---

# 🧪 Testing Strategy

### Unit Tests

✔️ UseCases
✔️ Hooks

### Integration Tests

✔️ Repository implementations

### UI Tests

✔️ Screens & flows

---

# 🎨 Theme & Design Tips

✅ Support dark/light themes
✅ Use spacing scale (4,8,12,16…)
✅ Create reusable components
✅ Keep screens layout-focused

---

# 🧱 Example Use Case

## domain/usecases/LoginUser.ts

```
export const loginUser = async (repo, credentials) => {
  return await repo.login(credentials);
};
```

---

# 🔥 Best Practices

✔️ Keep business logic out of screens
✔️ Use hooks as ViewModels
✔️ Use repository pattern for flexibility
✔️ Avoid direct API calls in UI
✔️ Keep domain layer framework-independent

---

# 📈 When This Architecture Shines

✅ Scaling teams
✅ Complex business logic
✅ Offline-first apps
✅ Enterprise & fintech apps
✅ Long-term maintainability

---

# 🧭 Development Workflow

### Step 1

Create domain entities & use cases

### Step 2

Define repository interfaces

### Step 3

Implement data layer

### Step 4

Create hooks (view logic)

### Step 5

Build UI screens

---

# 🧩 Optional Enhancements

⭐ Feature-based modular split
⭐ Offline sync support
⭐ Analytics layer
⭐ Error boundary handling

---

# 🏁 Summary

Clean Architecture with Expo provides:

✔️ Clear separation of concerns
✔️ Easy scalability
✔️ Maintainable codebase
✔️ Testable business logic
✔️ Enterprise-ready structure

---

**Use this as your blueprint for building production-grade Expo apps.**
