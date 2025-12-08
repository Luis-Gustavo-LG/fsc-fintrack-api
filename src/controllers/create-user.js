import { CreateUserUseCase } from "../use-cases/index.js";
import { EmailAlreadyInUseError } from "./errors/user.js";
import { 
    InvalidEmailResponse, 
    EmailIsAlreadyInUseResponse, 
    InvalidUserIdResponse, 
    InvalidPasswordResponse,
    checkIfPasswordIsValid,
    checkIfEmailIsValid,
    created,
    serverError
} from "./helpers/index.js";

export class CreateUserController {
    constructor() {
        this.execute = this.execute.bind(this);
        this.createUserUseCase = new CreateUserUseCase();
    }   
    
    async execute(request, response) {
        try {
            const createUserParams = request.body;

            const requiredFields = ['firstName', 'lastName', 'email', 'password'];

            for (const field of requiredFields) {
                if (!createUserParams[field] || createUserParams[field].trim().length === 0) {
                    return InvalidUserIdResponse(response);
                }
            }

            if(checkIfPasswordIsValid(createUserParams.password)) {
                return InvalidPasswordResponse(response);
            }

            if(checkIfEmailIsValid(createUserParams.email)) {
                return InvalidEmailResponse(response);
            }

            const createdUser = await this.createUserUseCase.execute(createUserParams);

            return created(response, createdUser);

        } catch (error) {
            if(error instanceof EmailAlreadyInUseError) {
                return EmailIsAlreadyInUseResponse(response);
            }
            return serverError(response, { message: error.message });
        }
    }
}