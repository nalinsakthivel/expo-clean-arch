import { Post } from "../entities/Post";
import { PostRepository } from "../repositories/PostRepository";

export class GetPostsUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  execute(): Promise<Post[]> {
    return this.postRepository.getPosts();
  }
}
