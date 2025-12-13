import { EmailAlreadyInUseError } from "../errors/user.js";
import { checkIfPasswordIsValid, 
    checkIfEmailIsValid, 
    InvalidPasswordResponse, 
    InvalidEmailResponse, 
    InvalidIdResponse,
    success,
    serverError,
    badRequest,
    checkIfIdIsValid,
    validateAllowedFields,
    validateFieldIsFilled
} from "../helpers/index.js";

export class UpdateUserController {
    constructor(useCase) {
        this.execute = this.execute.bind(this);
        this.useCase = useCase;
    }
    
    async execute(request, response) {
        try {
            const updateUserParams = request.body
            const userId = request.params.id;

            if (!userId) {
                return InvalidIdResponse(response);
            }

            if(checkIfIdIsValid(userId)) {
                return InvalidIdResponse(response);
            }

            const allowedFields = ['firstName', 'lastName', 'email', 'password'];

            const validationAllowedFields = validateAllowedFields(updateUserParams, allowedFields);

            if(!validationAllowedFields.ok) {
                return badRequest(response, { message: `The field ${validationAllowedFields.invalidField} is not allowed` });
            }

            const fieldIsFilled = validateFieldIsFilled(updateUserParams);

            if(!fieldIsFilled.ok) {
                return badRequest(response, { message: `The field ${fieldIsFilled.blankField} is blank` });
            }

            if(updateUserParams.password) {
                if(checkIfPasswordIsValid(updateUserParams.password)) {
                    return InvalidPasswordResponse(response);
                }
            }

            if(updateUserParams.email) {
                if(checkIfEmailIsValid(updateUserParams.email)) {
                    return InvalidEmailResponse(response);
                }
            }

            const updatedUser = await this.useCase.execute(userId, updateUserParams);

            return success(response, updatedUser);
        } catch (error) {
            if(error instanceof EmailAlreadyInUseError) {
                return EmailIsAlreadyInUseResponse(response);
            }
            return serverError(response, { message: error.message });
        }
    }
}