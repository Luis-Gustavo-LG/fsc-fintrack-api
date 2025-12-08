import bcrypt from "bcrypt";
import { PostgresCreateUserRepository,
    PostgresGetUserByEmailRepository 
} from "../repositories/postgres/index.js";
import { EmailAlreadyInUseError } from "../controllers/errors/user.js";

export class CreateUserUseCase {
    async execute(createUserParams) {

        const postgresGetUserByEmailRepository = new PostgresGetUserByEmailRepository();
        const postgresCreateUserRepository = new PostgresCreateUserRepository();

        const userExists = await postgresGetUserByEmailRepository.execute(createUserParams.email);

        if(userExists) {
            throw new EmailAlreadyInUseError(createUserParams.email);
        }

        const passwordHash = await bcrypt.hash(createUserParams.password, 10);

        const user = {
            ...createUserParams,
            password: passwordHash
        }

        const createdUser = await postgresCreateUserRepository.execute(user);

        return createdUser;
    }
}