import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
    getUsers(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
}
