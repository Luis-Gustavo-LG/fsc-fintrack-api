import { Router } from "express";
import { makeCreateTransactionController } from "../factories/controllers/transaction.js";

export class TransactionRoutes {
    constructor() {
        this.router = Router();

        this.setupRoutes();
    }

    setupRoutes() {
        this.router.post('/:userId/transaction', makeCreateTransactionController().execute);
    }

    getRouter() {
        return this.router;
    }
}