const typography = {
  h1: { fontSize: 32, fontWeight: "bold" as const },
  h2: { fontSize: 24, fontWeight: "bold" as const },
  h3: { fontSize: 18, fontWeight: "600" as const },
  body: { fontSize: 16, fontWeight: "normal" as const },
  caption: { fontSize: 12, fontWeight: "normal" as const },
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  round: 9999,
};

export const lightTheme = {
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
    background: "#f8f9fa",
    surface: "#ffffff",
    text: "#212529",
    textMuted: "#6c757d",
    error: "#dc3545",
    success: "#28a745",
    border: "#dee2e6",
  },
  typography,
  spacing,
  borderRadius,
  isDark: false,
};

export const darkTheme = {
  colors: {
    primary: "#339af0",
    secondary: "#adb5bd",
    background: "#121212",
    surface: "#1e1e1e",
    text: "#f8f9fa",
    textMuted: "#adb5bd",
    error: "#ff6b6b",
    success: "#51cf66",
    border: "#343a40",
  },
  typography,
  spacing,
  borderRadius,
  isDark: true,
};

export type Theme = typeof lightTheme;
