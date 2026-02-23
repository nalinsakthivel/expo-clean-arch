import * as SecureStore from "expo-secure-store";
import { MyStorageConstants } from "./MyStorageConstants";

export const getSecureStorage = async () => {
  return SecureStore;
};

export const LocalStore = {
  async getToken(): Promise<string> {
    const value = await SecureStore.getItemAsync(MyStorageConstants.AUTH_TOKEN);
    return value ?? "";
  },

  async setToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(MyStorageConstants.AUTH_TOKEN, token, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED,
    });
  },

  async clearAll(): Promise<void> {
    await SecureStore.deleteItemAsync(MyStorageConstants.AUTH_TOKEN);
  },
};
