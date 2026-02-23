import { Post } from "../entities/Post";
import { CreatePostInput, PostRepository } from "../repositories/PostRepository";

export class CreatePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(input: CreatePostInput): Promise<Post> {
    if (!input.title.trim()) {
      throw new Error("Title is required");
    }
    if (!input.body.trim()) {
      throw new Error("Body is required");
    }

    return this.postRepository.createPost(input);
  }
}
