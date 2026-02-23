import "reflect-metadata";
import { DI_TOKENS } from "@/core/di/tokens";
import { toAppError } from "@/core/errors/AppError";
import { inject, injectable } from "tsyringe";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserRemoteDataSource } from "../datasources/UserRemoteDataSource";
import { UserModel } from "../models/UserModel";

@injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @inject(DI_TOKENS.UserRemoteDataSource)
    private readonly remoteDataSource: UserRemoteDataSource,
  ) {}

  async getUserById(id: string): Promise<User> {
    try {
      const userDTO = await this.remoteDataSource.fetchUser(id);
      return UserModel.fromJson(userDTO);
    } catch (error) {
      throw toAppError(error);
    }
  }
}
