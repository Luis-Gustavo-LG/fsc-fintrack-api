import { 
    checkIfIdIsValid, 
    InvalidIdResponse, 
    badRequest, 
    created, 
    serverError,
    validateRequiredFields,
    checkIfTypeIsValid,
    amountToCents,
    validateAllowedFields
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

            const validationRequiredFields = validateRequiredFields(createTransactionParams, requiredFields);

            if(!validationRequiredFields.ok) {
                return badRequest(response, { message: `The field ${validationRequiredFields.missingField} is required` });
            }

            const allowedFields = validateAllowedFields(createTransactionParams, requiredFields)

            if(!allowedFields.ok) {
                return badRequest(response, { message: `The field ${allowedFields.invalidField} is not allowed` });
            }

            const type = createTransactionParams.type
                ? createTransactionParams.type.trim().toUpperCase()
                : undefined;

            if(amount <= 0) {
                return badRequest(response, { message: 'Amount must be greater than 0' });
            }

            const amountInCents = amountToCents(amount);
            
            const data = {
                ...createTransactionParams,
                amount: amountInCents,
                userId: userId
            };

            const typeIsValid = checkIfTypeIsValid(type);

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