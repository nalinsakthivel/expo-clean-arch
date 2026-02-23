import { Post } from "../entities/Post";

export interface CreatePostInput {
  userId: string;
  title: string;
  body: string;
}

export interface UpdatePostInput {
  id: string;
  title: string;
  body: string;
}

export interface PostRepository {
  getPosts(): Promise<Post[]>;
  createPost(input: CreatePostInput): Promise<Post>;
  updatePost(input: UpdatePostInput): Promise<Post>;
  deletePost(id: string): Promise<void>;
}
