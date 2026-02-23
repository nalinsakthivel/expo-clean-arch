import { User } from "../../domain/entities/User";

// A DTO (Data Transfer Object) that maps to what the API/DB returns
export interface UserDTO {
  id: string;
  first_name: string;
  last_name: string;
  email_address: string;
  created_at: string;
}

// Model handles mapping from API/DB raw data to Domain Entities
export class UserModel {
  static fromJson(json: UserDTO): User {
    const parsedDate = new Date(json.created_at);
    const createdAt = Number.isNaN(parsedDate.getTime()) ? new Date(0) : parsedDate;

    return new User(
      json.id,
      `${json.first_name} ${json.last_name}`,
      json.email_address,
      createdAt,
    );
  }

  static toJson(user: User): UserDTO {
    const [firstName, ...lastNames] = user.name.split(" ");
    return {
      id: user.id,
      first_name: firstName,
      last_name: lastNames.join(" "),
      email_address: user.email,
      created_at: user.createdAt.toISOString(),
    };
  }
}
