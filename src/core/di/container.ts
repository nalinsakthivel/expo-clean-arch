import { DI_TOKENS } from "@/core/di/tokens";
import { PostApiService, PostApiServiceImpl } from "@/data/api/PostApiService";
import {
  UserApiService,
  UserApiServiceImpl,
} from "@/data/api/UserApiService";
import { PostRemoteDataSourceImpl } from "@/data/datasources/PostRemoteDataSource";
import { UserRemoteDataSourceImpl } from "@/data/datasources/UserRemoteDataSource";
import { PostRepositoryImpl } from "@/data/repositories/PostRepositoryImpl";
import { UserRepositoryImpl } from "@/data/repositories/UserRepositoryImpl";
import { CreatePostUseCase } from "@/domain/usecases/CreatePostUseCase";
import { DeletePostUseCase } from "@/domain/usecases/DeletePostUseCase";
import { GetUserUseCase } from "@/domain/usecases/GetUserUseCase";
import { GetPostsUseCase } from "@/domain/usecases/GetPostsUseCase";
import { UpdatePostUseCase } from "@/domain/usecases/UpdatePostUseCase";
import { container } from "tsyringe";

container.register<UserApiService>(DI_TOKENS.UserApiService, {
  useClass: UserApiServiceImpl,
});
container.register<PostApiService>(DI_TOKENS.PostApiService, {
  useClass: PostApiServiceImpl,
});

container.register(DI_TOKENS.UserRemoteDataSource, {
  useClass: UserRemoteDataSourceImpl,
});
container.register(DI_TOKENS.PostRemoteDataSource, {
  useClass: PostRemoteDataSourceImpl,
});

container.register(DI_TOKENS.UserRepository, {
  useClass: UserRepositoryImpl,
});
container.register(DI_TOKENS.PostRepository, {
  useClass: PostRepositoryImpl,
});

container.register(GetUserUseCase, {
  useFactory: (dependencyContainer) =>
    new GetUserUseCase(dependencyContainer.resolve(DI_TOKENS.UserRepository)),
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
