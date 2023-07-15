import { User } from "../../models/user";
import { MongoUpdateUserRepository } from "../../repositories/update-user/mongo-update-user";
import { HttpRequest, HttpResponse } from "../protocols";
import { IUpdateUserController, IUpdateUserParams } from "./protocols";

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: MongoUpdateUserRepository) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest.body;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id" 
        };
      }

      const allowedFieldsToUpdate: (keyof IUpdateUserParams)[] = ["firstName", "lastName", "password"];

      const someFieldIsNotAllowedUpdate = Object.keys(body).some((key) => !allowedFieldsToUpdate.includes(key as keyof IUpdateUserParams));

      if (someFieldIsNotAllowedUpdate) {
        return {
          statusCode: 400,
          body: "Some recived field is not allowed"
        };
      }

      const user = await this.updateUserRepository.updateUser(id, body);
      
      return {
        statusCode: 200,
        body: user
      };

    } catch (error) {
      return {
        statusCode: 500,
        body: 'Something went wrong'
      };
    }
  }
}