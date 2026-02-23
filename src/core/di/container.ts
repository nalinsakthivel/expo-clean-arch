import { DI_TOKENS } from "@/core/di/tokens";
import { PostApiService, PostApiServiceImpl } from "@/data/api/PostApiService";
import { PostRemoteDataSourceImpl } from "@/data/datasources/PostRemoteDataSource";
import { PostRepositoryImpl } from "@/data/repositories/PostRepositoryImpl";
import { CreatePostUseCase } from "@/domain/usecases/CreatePostUseCase";
import { DeletePostUseCase } from "@/domain/usecases/DeletePostUseCase";
import { GetPostsUseCase } from "@/domain/usecases/GetPostsUseCase";
import { UpdatePostUseCase } from "@/domain/usecases/UpdatePostUseCase";
import { container } from "tsyringe";

container.register<PostApiService>(DI_TOKENS.PostApiService, {
  useClass: PostApiServiceImpl,
});

container.register(DI_TOKENS.PostRemoteDataSource, {
  useClass: PostRemoteDataSourceImpl,
});

container.register(DI_TOKENS.PostRepository, {
  useClass: PostRepositoryImpl,
});

container.register(GetPostsUseCase, {
  useFactory: (dependencyContainer) =>
    new GetPostsUseCase(dependencyContainer.resolve(DI_TOKENS.PostRepository)),
});
container.register(CreatePostUseCase, {
  useFactory: (dependencyContainer) =>
    new CreatePostUseCase(
      dependencyContainer.resolve(DI_TOKENS.PostRepository),
    ),
});
container.register(UpdatePostUseCase, {
  useFactory: (dependencyContainer) =>
    new UpdatePostUseCase(
      dependencyContainer.resolve(DI_TOKENS.PostRepository),
    ),
});
container.register(DeletePostUseCase, {
  useFactory: (dependencyContainer) =>
    new DeletePostUseCase(
      dependencyContainer.resolve(DI_TOKENS.PostRepository),
    ),
});

export { container };
