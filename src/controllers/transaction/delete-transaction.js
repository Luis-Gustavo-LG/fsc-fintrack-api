import { checkIfIdIsValid, InvalidIdResponse, serverError, success } from "../helpers/index.js";

export class DeleteTransactionController {
    constructor(deleteTransactionUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase;
    }
    
    async execute(request, response) {
        try {
            const transactionId = request.params.id;

            if(checkIfIdIsValid(transactionId)) {
                return InvalidIdResponse(response, { message: 'Invalid transaction ID' });
            }

            const deletedTransaction = await this.deleteTransactionUseCase.execute(transactionId);

            return success(response, deletedTransaction);
        } catch (error) {
            return serverError(response, { message: error.message });
        }
    }
}