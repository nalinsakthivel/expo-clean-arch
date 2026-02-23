import { apiClient } from "@/core/network/apiClient";
import { injectable } from "tsyringe";
import { UserDTO } from "../models/UserModel";

interface UserApiResponse {
  id: number;
  name: string;
  email: string;
}

export interface UserApiService {
  getUserById(id: string): Promise<UserDTO>;
}

@injectable()
export class UserApiServiceImpl implements UserApiService {
  async getUserById(id: string): Promise<UserDTO> {
    const userId = Number.parseInt(id, 10);
    const normalizedUserId = Number.isNaN(userId) ? 1 : userId;

    const response = await apiClient.get<UserApiResponse>(
      `/users/${normalizedUserId}`,
    );

    const [firstName, ...lastNames] = response.data.name.split(" ");

    return {
      id: String(response.data.id),
      first_name: firstName ?? "Unknown",
      last_name: lastNames.join(" "),
      email_address: response.data.email,
      created_at: new Date().toISOString(),
    };
  }
}
