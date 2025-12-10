import { EmailAlreadyInUseError } from "../errors/user.js";
import { checkIfPasswordIsValid, 
    checkIfEmailIsValid, 
    InvalidPasswordResponse, 
    InvalidEmailResponse, 
    InvalidIdResponse,
    success,
    serverError,
    badRequest,
    checkIfIdIsValid
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

            const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field)
            )

            const someFieldIsBlank = Object.values(updateUserParams).some((value) => {
                return (
                    value === undefined ||
                    value === null ||
                    (typeof value === 'string' && value.trim().length === 0)
                );
            });

            if(someFieldIsBlank) {
                return badRequest(response, { message: 'Some provided fields are blank' });
            }

            if(someFieldIsNotAllowed) {
                return badRequest(response, { message: 'Some provided fields are not allowed' });
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