import Constants from "expo-constants";

export const DeviceInfoUtils = {
  isDev: () => {
    return Constants.debugMode;
  },
};
