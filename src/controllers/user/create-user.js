import { EmailAlreadyInUseError } from "../errors/user.js";
import { 
    InvalidEmailResponse, 
    EmailIsAlreadyInUseResponse, 
    InvalidIdResponse, 
    InvalidPasswordResponse,
    checkIfPasswordIsValid,
    checkIfEmailIsValid,
    badRequest,
    created,
    serverError,
    validateRequiredFields,
    validateAllowedFields
} from "../helpers/index.js";

export class CreateUserController {
    constructor(useCase) {
        this.execute = this.execute.bind(this);
        this.useCase = useCase;
    }   
    
    async execute(request, response) {
        try {
            const createUserParams = request.body;

            const requiredFields = ['firstName', 'lastName', 'email', 'password'];

            const validation = validateRequiredFields(createUserParams, requiredFields);

            if(!validation.ok) {
                return badRequest(response, { message: `The field ${validation.missingField} is required` });
            }

            const allowedFields = validateAllowedFields(createUserParams, requiredFields)

            if(!allowedFields.ok) {
                return badRequest(response, { message: `The field ${allowedFields.invalidField} is not allowed` });
            }

            if(checkIfPasswordIsValid(createUserParams.password)) {
                return InvalidPasswordResponse(response);
            }

            if(checkIfEmailIsValid(createUserParams.email)) {
                return InvalidEmailResponse(response);
            }

            const createdUser = await this.useCase.execute(createUserParams);

            return created(response, createdUser);

        } catch (error) {
            if(error instanceof EmailAlreadyInUseError) {
                return EmailIsAlreadyInUseResponse(response);
            }
            return serverError(response, { message: error.message });
        }
    }
}