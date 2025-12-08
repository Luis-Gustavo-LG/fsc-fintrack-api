import bcrypt from "bcrypt";
import { EmailAlreadyInUseError } from "../controllers/errors/user.js";
export class CreateUserUseCase {
    constructor(postgresCreateUserRepository, postgresGetUserByEmailRepository) {
        this.postgresCreateUserRepository = postgresCreateUserRepository;
        this.postgresGetUserByEmailRepository = postgresGetUserByEmailRepository;
    }   
    
    async execute(createUserParams) {

        const userExists = await this.postgresGetUserByEmailRepository.execute(createUserParams.email);

        if(userExists) {
            throw new EmailAlreadyInUseError(createUserParams.email);
        }

        const passwordHash = await bcrypt.hash(createUserParams.password, 10);

        const user = {
            ...createUserParams,
            password: passwordHash
        }

        const createdUser = await this.postgresCreateUserRepository.execute(user);

        return createdUser;
    }
}