import bcrypt from "bcrypt";
import { EmailAlreadyInUseError } from "../../controllers/errors/user.js";
export class UpdateUserUseCase {
    constructor(updateUserRepository, getUserByEmailRepository) {
        this.updateUserRepository = updateUserRepository;
        this.getUserByEmailRepository = getUserByEmailRepository;
    }
    
    async execute(userId, updateUserParams) {

        if(updateUserParams.email) {
            const user = await this.getUserByEmailRepository.execute(updateUserParams.email);

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

        const updatedUser = await this.updateUserRepository.execute(userId, user);

        return updatedUser;
    }
}