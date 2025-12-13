export class UpdateTransactionUseCase {
    constructor(updateTransactionRepository) {
        this.updateTransactionRepository = updateTransactionRepository;
    }
    
    async execute(transactionId, updatedTransactionParams) {

        const updatedTransaction = await this.updateTransactionRepository.execute(transactionId, updatedTransactionParams);
        
        return updatedTransaction;
    }
}