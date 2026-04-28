import * as SecureStore from "expo-secure-store";
import { MyStorageConstants } from "./MyStorageConstants";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

export const LocalStore = {
  async getToken(): Promise<string> {
    const value = isWeb
      ? localStorage.getItem(MyStorageConstants.AUTH_TOKEN)
      : await SecureStore.getItemAsync(MyStorageConstants.AUTH_TOKEN);
    return value ?? "";
  },

  async setToken(token: string): Promise<void> {
    isWeb
      ? localStorage.setItem(MyStorageConstants.AUTH_TOKEN, token)
      : await SecureStore.setItemAsync(MyStorageConstants.AUTH_TOKEN, token, {
          keychainAccessible: SecureStore.WHEN_UNLOCKED,
        });
  },

  async clearAll(): Promise<void> {
    isWeb
      ? localStorage.removeItem(MyStorageConstants.AUTH_TOKEN)
      : await SecureStore.deleteItemAsync(MyStorageConstants.AUTH_TOKEN);
  },
};
