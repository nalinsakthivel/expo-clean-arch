import Constants from "expo-constants";

export const DeviceInfoUtils = {
  isDevMode: () => {
    return Constants.debugMode;
  },
};
