import { apiClient } from "@/core/network/apiClient";
import { injectable } from "tsyringe";
import {
  CreatePostRequestDTO,
  PostDTO,
  UpdatePostRequestDTO,
} from "../models/PostModel";

export interface PostApiService {
  getPosts(): Promise<PostDTO[]>;
  createPost(payload: CreatePostRequestDTO): Promise<PostDTO>;
  updatePost(id: string, payload: UpdatePostRequestDTO): Promise<PostDTO>;
  deletePost(id: string): Promise<void>;
}

@injectable()
export class PostApiServiceImpl implements PostApiService {
  async getPosts(): Promise<PostDTO[]> {
    const response = await apiClient.get<PostDTO[]>("/posts", {
      params: { _limit: 20 },
    });
    return response.data;
  }

  async createPost(payload: CreatePostRequestDTO): Promise<PostDTO> {
    const response = await apiClient.post<PostDTO>("/posts", payload);
    return response.data;
  }

  async updatePost(id: string, payload: UpdatePostRequestDTO): Promise<PostDTO> {
    const response = await apiClient.put<PostDTO>(`/posts/${id}`, payload);
    return response.data;
  }

  async deletePost(id: string): Promise<void> {
    await apiClient.delete(`/posts/${id}`);
  }
}
