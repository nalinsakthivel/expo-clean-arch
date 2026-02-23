import * as Linking from "expo-linking";

export const LinkingUtils = {
  openURL: async (url: string) => {
    const canOpenURL = await LinkingUtils.canOpenURL(url);
    if (canOpenURL) {
      await Linking.openURL(url);
    }
  },
  canOpenURL: async (url: string) => {
    return await Linking.canOpenURL(url);
  },
  getInitialURL: async () => {
    return await Linking.getInitialURL();
  },
  makeUrl: (path: string) => {
    return Linking.createURL(path);
  },
};
