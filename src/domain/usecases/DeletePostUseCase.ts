import { PostRepository } from "../repositories/PostRepository";

export class DeletePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new Error("Post id is required");
    }

    return this.postRepository.deletePost(id);
  }
}
