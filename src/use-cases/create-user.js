import bcrypt from "bcrypt";
import { PostgresCreateUserRepository } from "../repositories/postgres/create-user";

export class CreateUserUseCase {
    async execute(createUserParams) {
        const passwordHash = await bcrypt.hash(createUserParams.password, 10);

        const user = {
            ...createUserParams,
            password: passwordHash
        }

        const postgresCreateUserRepository = new PostgresCreateUserRepository();

        const createdUser = await postgresCreateUserRepository.execute(user);

        return createdUser;
    }
}