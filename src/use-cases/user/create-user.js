import bcrypt from "bcrypt";
import { EmailAlreadyInUseError } from "../controllers/errors/user.js";
export class CreateUserUseCase {
    constructor(createUserRepository, getUserByEmailRepository) {
        this.createUserRepository = createUserRepository;
        this.getUserByEmailRepository = getUserByEmailRepository;
    }   
    
    async execute(createUserParams) {

        const userExists = await this.getUserByEmailRepository.execute(createUserParams.email);

        if(userExists) {
            throw new EmailAlreadyInUseError(createUserParams.email);
        }

        const passwordHash = await bcrypt.hash(createUserParams.password, 10);

        const user = {
            ...createUserParams,
            password: passwordHash
        }

        const createdUser = await this.createUserRepository.execute(user);

        return createdUser;
    }
}