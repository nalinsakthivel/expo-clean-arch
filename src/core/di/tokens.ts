export const DI_TOKENS = {
  PostApiService: "PostApiService",
  PostRemoteDataSource: "PostRemoteDataSource",
  PostRepository: "PostRepository",
} as const;

export type DiToken = (typeof DI_TOKENS)[keyof typeof DI_TOKENS];
