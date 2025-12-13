import { checkIfIdIsValid, InvalidIdResponse, serverError, success, notFound } from "../helpers/index.js";

export class DeleteTransactionController {
    constructor(useCase) {
        this.execute = this.execute.bind(this);
        this.useCase = useCase;
    }
    
    async execute(request, response) {
        try {
            const transactionId = request.params.id;

            if(checkIfIdIsValid(transactionId)) {
                return InvalidIdResponse(response, { message: 'Invalid transaction ID' });
            }

            const deletedTransaction = await this.useCase.execute(transactionId);

            return success(response, deletedTransaction);
        } catch (error) {
            if (error.code === "P2025") {
                return notFound(response, { message: "Transaction not found" });
            }
            return serverError(response, { message: error.message });
        }
    }
}