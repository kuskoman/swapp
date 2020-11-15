import { User } from "./entities/user.entity";

export type UserID = number;

export interface Context {
  currentUser(): Promise<User>;
}
