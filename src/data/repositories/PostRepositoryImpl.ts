import { DI_TOKENS } from "@/core/di/tokens";
import { toAppError } from "@/core/errors/AppError";
import { Post } from "@/domain/entities/Post";
import {
  CreatePostInput,
  PostRepository,
  UpdatePostInput,
} from "@/domain/repositories/PostRepository";
import { inject, injectable } from "tsyringe";
import { PostRemoteDataSource } from "../datasources/PostRemoteDataSource";
import { PostModel } from "../models/PostModel";

@injectable()
export class PostRepositoryImpl implements PostRepository {
  constructor(
    @inject(DI_TOKENS.PostRemoteDataSource)
    private readonly remoteDataSource: PostRemoteDataSource,
  ) {}

  async getPosts(): Promise<Post[]> {
    try {
      const posts = await this.remoteDataSource.fetchPosts();
      return PostModel.fromJsonList(posts);
    } catch (error) {
      throw toAppError(error);
    }
  }

  async createPost(input: CreatePostInput): Promise<Post> {
    try {
      const dto = PostModel.toCreateDto(input);
      const created = await this.remoteDataSource.createPost(dto);
      return PostModel.fromJson(created);
    } catch (error) {
      throw toAppError(error);
    }
  }

  async updatePost(input: UpdatePostInput): Promise<Post> {
    try {
      const dto = PostModel.toUpdateDto(input);
      const updated = await this.remoteDataSource.updatePost(input.id, dto);
      return PostModel.fromJson(updated);
    } catch (error) {
      throw toAppError(error);
    }
  }

  async deletePost(id: string): Promise<void> {
    try {
      await this.remoteDataSource.deletePost(id);
    } catch (error) {
      throw toAppError(error);
    }
  }
}
