import { UserNotFoundError } from "../../controllers/errors/user.js";

export class CreateTransactionUseCase {
    constructor(createTransactionRepository, getUserByIdRepository) {
        this.createTransactionRepository = createTransactionRepository;
        this.getUserByIdRepository = getUserByIdRepository;
    }
    
    async execute(createTransactionParams) {

        const userId = createTransactionParams.userId;
        const userExists = await this.getUserByIdRepository.execute(userId);

        if(!userExists) {
            throw new UserNotFoundError(userId);
        }

        const transaction = await this.createTransactionRepository.execute(createTransactionParams);

        return transaction;
    }
}