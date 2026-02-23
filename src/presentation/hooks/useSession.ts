import { create } from "zustand";

interface SessionState {
  isSessionExpired: boolean;
  isSessionAlertShown: boolean;
  setSessionExpired: (expired: boolean) => void;
  setSessionAlertShown: (shown: boolean) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  isSessionExpired: false,
  isSessionAlertShown: false,
  setSessionExpired: (expired) => set({ isSessionExpired: expired }),
  setSessionAlertShown: (shown) => set({ isSessionAlertShown: shown }),
}));
