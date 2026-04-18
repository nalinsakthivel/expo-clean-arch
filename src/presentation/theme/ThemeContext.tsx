import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme, Theme } from "./theme";

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setSystemTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === "dark");
  const [useSystem, setUseSystem] = useState(true);

  useEffect(() => {
    if (useSystem) {
      setIsDark(systemColorScheme === "dark");
    }
  }, [systemColorScheme, useSystem]);

  const toggleTheme = () => {
    setUseSystem(false);
    setIsDark((prev) => !prev);
  };

  const setSystemTheme = () => {
    setUseSystem(true);
    setIsDark(systemColorScheme === "dark");
  };

  const currentTheme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, isDark, toggleTheme, setSystemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used within a ThemeProvider");
  }
  return context;
};
