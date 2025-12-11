import { UserNotFoundError } from "../../controllers/errors/user.js";

export class GetTransactionsByUserIdUseCase {
    constructor(getTransactionsByUserIdRepository, getUserByIdRepository) {
        this.getTransactionsByUserIdRepository = getTransactionsByUserIdRepository;
        this.getUserByIdRepository = getUserByIdRepository;
    }

    async execute(userId) {

        const userExists = await this.getUserByIdRepository.execute(userId);

        if(!userExists) {
            throw new UserNotFoundError(userId);
        }

        const transactions = await this.getTransactionsByUserIdRepository.execute(userId);
        return transactions;
    }
}