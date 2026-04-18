import { Href, router } from "expo-router";

export const resetTo = (routeName: Href) => {
  router.replace(routeName);
};

export const navigateTo = (routeName: Href) => {
  router.push(routeName);
};

export const back = () => {
  router.back();
};
