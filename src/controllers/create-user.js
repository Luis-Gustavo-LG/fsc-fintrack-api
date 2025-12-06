import { CreateUserUseCase } from "../use-cases/create-user.js";
import validator from "validator";
import { badRequest, serverError, created } from "./helpers.js";
import { EmailAlreadyInUseError } from "./errors/user.js";

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
                    return badRequest(response, { message: `Missing required field: ${field}` });
                }
            }

            if(params.password.length < 6) {
                return badRequest(response, { message: 'Password must be at least 6 characters long' });
            }

            if(!validator.isEmail(params.email)) {
                return badRequest(response, { message: 'Invalid email format' });
            }

            const createUserUseCase = new CreateUserUseCase();

            const createdUser = await createUserUseCase.execute(params);

            return created(response, createdUser);

        } catch (error) {
            if(error instanceof EmailAlreadyInUseError) {
                return badRequest(response, { message: error.message });
            }
            return serverError(response, { message: error.message });
        }
    }
}