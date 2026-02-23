import { Href, router } from "expo-router";

export const resetTo = (routeName: Href) => {
  router.replace(routeName);
};
