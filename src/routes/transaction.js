import { Router } from "express";
import { 
    makeCreateTransactionController, 
    makeGetTransactionsByUserIdController, 
    makeDeleteTransactionController 
} from "../factories/controllers/transaction.js";

export class TransactionRoutes {
    constructor() {
        this.router = Router();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.post('/:userId/transaction', makeCreateTransactionController().execute);
        this.router.get('/:userId/transaction', makeGetTransactionsByUserIdController().execute);
        this.router.delete('/transaction/:id', makeDeleteTransactionController().execute);
    }

    getRouter() {
        return this.router;
    }
}