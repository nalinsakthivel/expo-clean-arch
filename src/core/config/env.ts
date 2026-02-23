import Constants from "expo-constants";

const DEFAULT_API_BASE_URL = "https://jsonplaceholder.typicode.com";

type ExpoExtra = {
  apiBaseUrl?: string;
};

const isValidUrl = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const resolveApiBaseUrl = (): string => {
  const extra = (Constants.expoConfig?.extra ?? {}) as ExpoExtra;
  const rawValue =
    process.env.EXPO_PUBLIC_API_BASE_URL ??
    extra.apiBaseUrl ??
    DEFAULT_API_BASE_URL;
  const value = rawValue.trim();

  return isValidUrl(value) ? value : DEFAULT_API_BASE_URL;
};

export const env = Object.freeze({
  apiBaseUrl: resolveApiBaseUrl(),
});
