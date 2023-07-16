import { User } from "../../models/user";
import { goodRequest, serverError } from "../helpers";
import { HttpResponse, IController } from "../protocols";
import { IGetUsersRepository } from "../../repositories/get-users/protocols";

export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle(): Promise<HttpResponse<User[] | string>> {
    try {
      const users = await this.getUsersRepository.getUsers();

      return goodRequest<User[]>(users);
    } catch (error) {
      return serverError();
    }
  }
}
