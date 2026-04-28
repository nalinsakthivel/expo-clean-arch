import "reflect-metadata";
import "@/core/di/container";
import "@/core/i18n";
import { store } from "@/core/store/store";
import { ThemeProvider, useAppTheme } from "@/presentation/theme/ThemeContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";

function RootContent() {
  const { isDark } = useAppTheme();
  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "transparent",
          },
          statusBarStyle: isDark ? "light" : "dark",
          statusBarTranslucent: true,
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RootContent />
      </ThemeProvider>
    </Provider>
  );
}
