import { 
    checkIfUserIdIsValid, 
    InvalidIdResponse, 
    badRequest, 
    created, 
    serverError 
} from "../helpers/index.js";
import { UserNotFoundError } from "../errors/user.js";

export class CreateTransactionController {
    constructor(useCase) {
        this.execute = this.execute.bind(this);
        this.useCase = useCase;
    }
    
    async execute(request, response) {
        try {
            const createTransactionParams = request.body;
            const userId = request.params.userId;
            const amount = createTransactionParams.amount;
            const type = createTransactionParams.type.trim().toUpperCase();

            if (!userId) {
                return InvalidIdResponse(response, { message: 'User ID is required' });
            }

            if(checkIfUserIdIsValid(userId)) {
                return InvalidIdResponse(response, { message: 'Invalid user ID' });
            }

            const requiredFields = ['description', 'amount', 'type', 'date'];

            for (const field of requiredFields) {
                if (!createTransactionParams[field] || createTransactionParams[field].trim().length === 0) {
                    return badRequest(response, { message: `The field ${field} is required` });
                }
            }

            if(amount <= 0) {
                return badRequest(response, { message: 'Amount must be greater than 0' });
            }

            const normalized = String(amount).replace(",", ".");

            const amountInCents = Math.round(Number(normalized) * 100);
            const data = {
                ...createTransactionParams,
                amount: amountInCents,
                userId: userId
            };

            const typeIsValid = ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(type);

            if(!typeIsValid) {
                return badRequest(response, { message: 'Invalid transaction type' });
            }

            const createdTransaction = await this.useCase.execute(data);

            return created(response, createdTransaction);

        } catch (error) {
            if(error instanceof UserNotFoundError) {
                return notFound(response, { message: error.message });
            }
            return serverError(response, { message: error.message });
        }
    }
}