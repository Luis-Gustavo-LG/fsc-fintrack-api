import { Router } from "express";
import { CreateUserController,
    GetUserByIdController,
    UpdateUserController,
    DeleteUserController 
} from "../controllers/index.js";

export class UserRoutes {
    constructor() {
        this.router = Router();

        this.createUserController = new CreateUserController();
        this.getUserByIdController = new GetUserByIdController();
        this.updateUserController = new UpdateUserController();
        this.deleteUserController = new DeleteUserController();

        this.setupRoutes();
    }

    setupRoutes() {
        this.router.post('/', this.createUserController.execute);
        this.router.get('/:id', this.getUserByIdController.execute);
        this.router.patch('/:id', this.updateUserController.execute);
        this.router.delete('/:id', this.deleteUserController.execute);
    }

    getRouter() {
        return this.router;
    }
}

