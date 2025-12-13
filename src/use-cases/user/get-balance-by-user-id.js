import { UserNotFoundError } from "../../controllers/errors/user.js";

export class GetBalanceByUserIdUseCase {
    constructor(getBalanceByUserIdRepository, getUserByIdRepository) {
        this.getBalanceByUserIdRepository = getBalanceByUserIdRepository;
        this.getUserByIdRepository = getUserByIdRepository;
    }

    async execute(userId) {
        const userExists = await this.getUserByIdRepository.execute(userId);

        if (!userExists) {
            throw new UserNotFoundError(userId);
        }

        const balance = await this.getBalanceByUserIdRepository.execute(userId);

        return balance;
    }
}
    