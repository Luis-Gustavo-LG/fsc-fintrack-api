import { PostgresDeleteUserRepository } from "../repositories/postgres/index.js";

export class DeleteUserUseCase {
    constructor() {
        this.deleteUserUseCase = new PostgresDeleteUserRepository();
    }   
    
    async execute(userId) {
        const deletedUser = await this.deleteUserUseCase.execute(userId);

        return deletedUser;
    }
}