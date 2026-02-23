import { DI_TOKENS } from "@/core/di/tokens";
import { inject, injectable } from "tsyringe";
import { PostApiService } from "../api/PostApiService";
import {
  CreatePostRequestDTO,
  PostDTO,
  UpdatePostRequestDTO,
} from "../models/PostModel";

export interface PostRemoteDataSource {
  fetchPosts(): Promise<PostDTO[]>;
  createPost(payload: CreatePostRequestDTO): Promise<PostDTO>;
  updatePost(id: string, payload: UpdatePostRequestDTO): Promise<PostDTO>;
  deletePost(id: string): Promise<void>;
}

@injectable()
export class PostRemoteDataSourceImpl implements PostRemoteDataSource {
  constructor(
    @inject(DI_TOKENS.PostApiService)
    private readonly postApiService: PostApiService,
  ) {}

  fetchPosts(): Promise<PostDTO[]> {
    return this.postApiService.getPosts();
  }

  createPost(payload: CreatePostRequestDTO): Promise<PostDTO> {
    return this.postApiService.createPost(payload);
  }

  updatePost(id: string, payload: UpdatePostRequestDTO): Promise<PostDTO> {
    return this.postApiService.updatePost(id, payload);
  }

  deletePost(id: string): Promise<void> {
    return this.postApiService.deletePost(id);
  }
}
