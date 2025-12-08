import bcrypt from "bcrypt";
import { PostgresCreateUserRepository,
    PostgresGetUserByEmailRepository 
} from "../repositories/postgres/index.js";
import { EmailAlreadyInUseError } from "../controllers/errors/user.js";

export class CreateUserUseCase {
    constructor() {
        this.PostgresCreateUserRepository = new PostgresCreateUserRepository();
        this.PostgresGetUserByEmailRepository = new PostgresGetUserByEmailRepository();
    }   
    
    async execute(createUserParams) {

        const userExists = await this.PostgresGetUserByEmailRepository.execute(createUserParams.email);

        if(userExists) {
            throw new EmailAlreadyInUseError(createUserParams.email);
        }

        const passwordHash = await bcrypt.hash(createUserParams.password, 10);

        const user = {
            ...createUserParams,
            password: passwordHash
        }

        const createdUser = await this.PostgresCreateUserRepository.execute(user);

        return createdUser;
    }
}