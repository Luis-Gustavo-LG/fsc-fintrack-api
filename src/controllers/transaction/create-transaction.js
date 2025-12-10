import { 
    checkIfIdIsValid, 
    InvalidIdResponse, 
    badRequest, 
    created, 
    serverError,
    validateRequiredFields 
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

            if (!userId) {
                return InvalidIdResponse(response, { message: 'User ID is required' });
            }

            if(checkIfIdIsValid(userId)) {
                return InvalidIdResponse(response, { message: 'Invalid user ID' });
            }

            const requiredFields = ['name', 'description', 'amount', 'type', 'date'];

            const validation = validateRequiredFields(createTransactionParams, requiredFields);

            if(!validation.ok) {
                return badRequest(response, { message: `The field ${validation.missingField} is required` });
            }

            const type = createTransactionParams.type
                ? createTransactionParams.type.trim().toUpperCase()
                : undefined;

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