import { CreateUserUseCase } from "../use-cases/create-user.js";

export class CreateUserController {
    constructor() {
        this.execute = this.execute.bind(this);
    }   
    
    async execute(request, response) {
        try {
            const params = request.body;

            const requiredFields = ['firstName', 'lastName', 'email', 'password'];

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return response.status(400).json({ error: `Missing required field: ${field}` });
                }
            }

            const createUserUseCase = new CreateUserUseCase();

            const createdUser = await createUserUseCase.execute(params);

            return response.status(201).json(createdUser);

        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }
}