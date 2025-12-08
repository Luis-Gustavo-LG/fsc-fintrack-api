import { CreateUserUseCase } from "../use-cases/create-user.js";
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
    }   
    
    async execute(request, response) {
        try {
            const params = request.body;

            const requiredFields = ['firstName', 'lastName', 'email', 'password'];

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return InvalidUserIdResponse(response);
                }
            }

            if(checkIfPasswordIsValid(params.password)) {
                return InvalidPasswordResponse(response);
            }

            if(checkIfEmailIsValid(params.email)) {
                return InvalidEmailResponse(response);
            }

            const createUserUseCase = new CreateUserUseCase();

            const createdUser = await createUserUseCase.execute(params);

            return created(response, createdUser);

        } catch (error) {
            if(error instanceof EmailAlreadyInUseError) {
                return EmailIsAlreadyInUseResponse(response);
            }
            return serverError(response, { message: error.message });
        }
    }
}