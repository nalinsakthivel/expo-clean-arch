import { Post } from "../entities/Post";

export interface CreatePostInput {
  title: string;
  body: string;
  userId: string;
}

export interface UpdatePostInput {
  id: string;
  title: string;
  body: string;
}

export interface PostRepository {
  getPosts(): Promise<Post[]>;
  createPost(post: CreatePostInput): Promise<Post>;
  updatePost(post: UpdatePostInput): Promise<Post>;
  deletePost(id: string): Promise<void>;
}
