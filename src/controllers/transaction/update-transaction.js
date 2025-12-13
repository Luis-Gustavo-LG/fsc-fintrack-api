import { 
    InvalidIdResponse, 
    checkIfIdIsValid, 
    validateAllowedFields, 
    validateFieldIsFilled, 
    serverError, 
    success, 
    badRequest,
    checkIfTypeIsValid,
    amountToCents
} from "../helpers/index.js";

export class UpdateTransactionController {
    constructor(useCase) {
        this.useCase = useCase;
    }
    
    async execute(request, response) {
        try {
            const upgradeTransactionParams = request.body;
            const transactionId = request.params.id;

            if (!transactionId) {
                return InvalidIdResponse(response);
            }

            if(checkIfIdIsValid(transactionId)) {
                return InvalidIdResponse(response);
            }

            const allowedFields = ['name', 'description', 'amount', 'type', 'date'];

            const validationAllowedFields = validateAllowedFields(upgradeTransactionParams, allowedFields);

            if(!validationAllowedFields.ok) {
                return badRequest(response, { message: `The field ${validationAllowedFields.invalidField} is not allowed` });
            }

            const fieldIsFilled = validateFieldIsFilled(upgradeTransactionParams);

            if(!fieldIsFilled.ok) {
                return badRequest(response, { message: `The field ${fieldIsFilled.blankField} is blank` });
            }

            if(upgradeTransactionParams.type){
                const type = upgradeTransactionParams.type
                ? upgradeTransactionParams.type.trim().toUpperCase()
                : undefined;

                const typeIsValid = checkIfTypeIsValid(type);

                if(!typeIsValid) {
                    return badRequest(response, { message: 'Invalid transaction type' });
                }
            }

            if(upgradeTransactionParams.amount){
                const amount = upgradeTransactionParams.amount;

                if(amount <= 0) {
                    return badRequest(response, { message: 'Amount must be greater than 0' });
                }

                const amountInCents = amountToCents(amount);

                const data = {
                    ...upgradeTransactionParams,
                    amount: amountInCents,
                }

                upgradeTransactionParams = data;
            }

            const updatedTransaction = await this.useCase.execute(transactionId, upgradeTransactionParams);

            return success(response, updatedTransaction);
        } catch (error) {
            return serverError(response, { message: error.message });
        }
    }
}