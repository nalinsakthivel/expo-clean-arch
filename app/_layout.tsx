import "reflect-metadata";
import "@/core/di/container";
import {
  setAuthTokenProvider,
  setUnauthorizedHandler,
} from "@/core/network/apiClient";
import { LocalStore } from "@/data/storage/LocalStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, router } from "expo-router";
import { useEffect } from "react";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      networkMode: "online",
    },
    mutations: {
      retry: 1,
    },
  },
});

export default function RootLayout() {
  useEffect(() => {
    setAuthTokenProvider(async () => LocalStore.getToken());
    setUnauthorizedHandler(async () => {
      try {
        await LocalStore.clearAll();
      } catch {
        // Intentionally ignored to avoid blocking forced logout routing.
      }
      router.replace("/");
    });

    return () => {
      setAuthTokenProvider(() => "");
      setUnauthorizedHandler(undefined);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </QueryClientProvider>
  );
}
