export const theme = {
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
    background: "#f8f9fa",
    surface: "#ffffff",
    text: "#212529",
    textMuted: "#6c757d",
    error: "#dc3545",
    success: "#28a745",
  },
  typography: {
    h1: { fontSize: 32, fontWeight: "bold" as const },
    h2: { fontSize: 24, fontWeight: "bold" as const },
    h3: { fontSize: 18, fontWeight: "600" as const },
    body: { fontSize: 16, fontWeight: "normal" as const },
    caption: { fontSize: 12, fontWeight: "normal" as const },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    round: 9999,
  },
};

export type Theme = typeof theme;
