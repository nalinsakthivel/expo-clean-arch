import { getOrCreateEncryptionKey } from "@/core/utils/SecurityUtils";
import { createMMKV, MMKV } from "react-native-mmkv";
import { MyStorageConstants } from "./MyStorageConstants";

let secureStorage: MMKV | null = null;

export async function getSecureStorage() {
  if (!secureStorage) {
    const key = await getOrCreateEncryptionKey();

    secureStorage = createMMKV({
      id: "secure",
      encryptionKey: key,
    });
  }

  return secureStorage;
}

export const LocalStore = {
  async getToken() {
    const storage = await getSecureStorage();
    return storage.getString(MyStorageConstants.AUTH_TOKEN) || "";
  },

  async setToken(token: string) {
    const storage = await getSecureStorage();
    storage.set(MyStorageConstants.AUTH_TOKEN, token);
  },

  async clearAll() {
    const storage = await getSecureStorage();
    storage.clearAll();
  },
};
