export const ROUTES = {
  HOME: "/",
  TABS: "/(tabs)",
  POSTS: "/(tabs)/",
  SETTINGS: "/(tabs)/settings",
  POST_DETAIL: (id: string) => `/post/${id}` as const,
} as const;
