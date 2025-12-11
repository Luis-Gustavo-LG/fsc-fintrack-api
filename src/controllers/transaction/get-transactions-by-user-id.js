import { InvalidIdResponse, notFound, serverError, checkIfIdIsValid, created } from "../helpers/index.js";
import { UserNotFoundError } from "../errors/user.js";

export class GetTransactionsByUserIdController {
    constructor(useCase) {
        this.execute = this.execute.bind(this);
        this.useCase = useCase;
    }
    
    async execute(request, response) {
        try {
            const userId = request.params.userId;

            if(!userId) {
                return InvalidIdResponse(response, { message: 'User ID is required' });
            }

            if(checkIfIdIsValid(userId)) {
                return InvalidIdResponse(response, { message: 'Invalid user ID' });
            }

            const transactions = await this.useCase.execute(userId);
            return created(response, transactions);
        } catch (error) {
            if(error instanceof UserNotFoundError) {
                return notFound(response, { message: error.message });
            }
            return serverError(response, { message: error.message });
        }
    }
}