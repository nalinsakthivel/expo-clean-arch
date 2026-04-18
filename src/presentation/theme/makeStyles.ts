import { StyleSheet } from "react-native";
import { Theme } from "./theme";
import { useAppTheme } from "./ThemeContext";
import { useMemo } from "react";

export const makeStyles = <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  styles: (theme: Theme) => T
) => {
  return () => {
    const { theme } = useAppTheme();
    return useMemo(() => StyleSheet.create(styles(theme)), [theme]);
  };
};
