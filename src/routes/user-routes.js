import { Router } from "express";

import { 
    CreateUserController,
    GetUserByIdController,
    UpdateUserController,
    DeleteUserController 
} from "../controllers/index.js";

import { 
    GetUserByIdUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase 
} from "../use-cases/index.js";

import { 
    PostgresGetUserByIdRepository,
    PostgresCreateUserRepository,
    PostgresUpdateUserRepository,
    PostgresDeleteUserRepository,
    PostgresGetUserByEmailRepository
} from "../repositories/postgres/index.js";

export class UserRoutes {
    constructor() {
        this.router = Router();

        // --- REPOSITORIES ---
        const getUserByIdRepository = new PostgresGetUserByIdRepository();
        const createUserRepository = new PostgresCreateUserRepository();
        const updateUserRepository = new PostgresUpdateUserRepository();
        const deleteUserRepository = new PostgresDeleteUserRepository();
        const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

        // --- USE CASES ---
        const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);
        const createUserUseCase = new CreateUserUseCase(createUserRepository, getUserByEmailRepository);
        const updateUserUseCase = new UpdateUserUseCase(updateUserRepository, getUserByEmailRepository);
        const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository);

        // --- CONTROLLERS ---
        this.getUserByIdController = new GetUserByIdController(getUserByIdUseCase);
        this.createUserController = new CreateUserController(createUserUseCase);
        this.updateUserController = new UpdateUserController(updateUserUseCase);
        this.deleteUserController = new DeleteUserController(deleteUserUseCase);

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
