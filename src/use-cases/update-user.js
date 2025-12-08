import bcrypt from "bcrypt";
import { EmailAlreadyInUseError } from "../controllers/errors/user.js";
export class UpdateUserUseCase {
    constructor(postgresUpdateUserRepository, postgresGetUserByEmailRepository) {
        this.postgresUpdateUserRepository = postgresUpdateUserRepository;
        this.postgresGetUserByEmailRepository = postgresGetUserByEmailRepository;
    }
    
    async execute(userId, updateUserParams) {

        if(updateUserParams.email) {
            const user = await this.postgresGetUserByEmailRepository.execute(updateUserParams.email);

            if(user && user.id !== userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email);
            }
        }

        const user = {
            ...updateUserParams
        }

        if(updateUserParams.password) {
            const passwordHash = await bcrypt.hash(updateUserParams.password, 10);
            user.password = passwordHash;
        }

        const updatedUser = await this.postgresUpdateUserRepository.execute(userId, user);

        return updatedUser;
    }
}