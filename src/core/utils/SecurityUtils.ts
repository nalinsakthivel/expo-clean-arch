import * as Keychain from "react-native-keychain";
import { MyConstants } from "../constants/MyConstants";

function generateEncryptionKey(): string {
  return crypto.randomUUID();
}

export async function getOrCreateEncryptionKey(): Promise<string> {
  const existingKey = await Keychain.getGenericPassword({
    service: MyConstants.ENCRYPTION_KEY_NAME,
  });

  if (existingKey && existingKey.password) {
    return existingKey.password;
  }

  const newKey = generateEncryptionKey();
  await Keychain.setGenericPassword("MMKV", newKey, {
    service: MyConstants.ENCRYPTION_KEY_NAME,
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
  });

  return newKey;
}
