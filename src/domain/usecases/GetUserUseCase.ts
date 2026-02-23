import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<User> {
    if (!userId) {
      throw new Error("User ID is required");
    }

    return this.userRepository.getUserById(userId);
  }
}
