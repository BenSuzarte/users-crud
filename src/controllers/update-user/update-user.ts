import { User } from "../../models/user";
import { MongoUpdateUserRepository } from "../../repositories/update-user/mongo-update-user";
import { badRequest, goodRequest, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateUserParams } from "../../repositories/update-user/protocols";

export class UpdateUserController implements IController {
  constructor(
    private readonly updateUserRepository: MongoUpdateUserRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<IUpdateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest.body;

      if (!id) {
        return badRequest("Missing user id");
      }

      if (!body) {
        return badRequest("Missing fields");
      }

      const allowedFieldsToUpdate: (keyof IUpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];

      const someFieldIsNotAllowedUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof IUpdateUserParams)
      );

      if (someFieldIsNotAllowedUpdate) {
        return badRequest("Some recived field is not allowed");
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return goodRequest<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
