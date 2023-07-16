import { User } from "../../models/user";
import { badRequest, goodRequest, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteUserRepository } from "./protocols";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest.params?.id

      if (!id) {
        return badRequest('Missing user id');
      }

      const user = await this.deleteUserRepository.deleteUser(id);

      return goodRequest<User>(user);

    } catch (error) {
      return serverError();
    }
  }
}