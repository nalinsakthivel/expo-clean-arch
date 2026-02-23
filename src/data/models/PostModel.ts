import { Post } from "@/domain/entities/Post";
import {
  CreatePostInput,
  UpdatePostInput,
} from "@/domain/repositories/PostRepository";

export interface PostDTO {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface CreatePostRequestDTO {
  userId: number;
  title: string;
  body: string;
}

export interface UpdatePostRequestDTO {
  title: string;
  body: string;
}

export class PostModel {
  static fromJson(json: PostDTO): Post {
    return new Post(
      String(json.id),
      String(json.userId),
      json.title,
      json.body,
    );
  }

  static fromJsonList(items: PostDTO[]): Post[] {
    return items.map((item) => PostModel.fromJson(item));
  }

  static toCreateDto(input: CreatePostInput): CreatePostRequestDTO {
    return {
      userId: Number.parseInt(input.userId, 10) || 1,
      title: input.title,
      body: input.body,
    };
  }

  static toUpdateDto(input: UpdatePostInput): UpdatePostRequestDTO {
    return {
      title: input.title,
      body: input.body,
    };
  }
}
