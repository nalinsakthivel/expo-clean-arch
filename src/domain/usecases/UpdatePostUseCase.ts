import { Post } from "../entities/Post";
import { PostRepository, UpdatePostInput } from "../repositories/PostRepository";

export class UpdatePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(input: UpdatePostInput): Promise<Post> {
    if (!input.id) {
      throw new Error("Post id is required");
    }
    if (!input.title.trim()) {
      throw new Error("Title is required");
    }
    if (!input.body.trim()) {
      throw new Error("Body is required");
    }

    return this.postRepository.updatePost(input);
  }
}
