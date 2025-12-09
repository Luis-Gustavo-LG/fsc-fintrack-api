import { Router } from "express";
import { 
    makeUserByIdController,
    makeCreateUserController,
    makeUpdateUserController,
    makeDeleteUserController
 } from "../factories/controllers/user.js";
export class UserRoutes {
    constructor() {
        this.router = Router();

        this.setupRoutes();
    }

    setupRoutes() {
        this.router.post('/', makeCreateUserController().execute);
        this.router.get('/:id', makeUserByIdController().execute);
        this.router.patch('/:id', makeUpdateUserController().execute);
        this.router.delete('/:id', makeDeleteUserController().execute);
    }

    getRouter() {
        return this.router;
    }
}
