import "reflect-metadata";
import { DI_TOKENS } from "@/core/di/tokens";
import { inject, injectable } from "tsyringe";
import { UserApiService } from "../api/UserApiService";
import { UserDTO } from "../models/UserModel";

export interface UserRemoteDataSource {
  fetchUser(id: string): Promise<UserDTO>;
}

@injectable()
export class UserRemoteDataSourceImpl implements UserRemoteDataSource {
  constructor(
    @inject(DI_TOKENS.UserApiService)
    private readonly userApiService: UserApiService,
  ) {}

  async fetchUser(id: string): Promise<UserDTO> {
    return this.userApiService.getUserById(id);
  }
}
