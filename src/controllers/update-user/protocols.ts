import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IUpdateUserController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<User>>
}

export interface IUpdateUserParams {
  firstName: string;
  lastName: string;
  password: string;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: IUpdateUserParams): Promise<User>
}