export const DI_TOKENS = {} as const;
export type DiToken = (typeof DI_TOKENS)[keyof typeof DI_TOKENS];
