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
import { updateUserSchema } from "../schemas/user.js";
import { ZodError } from "zod";

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

            await updateUserSchema.parseAsync(updateUserParams);

            const updatedUser = await this.useCase.execute(userId, updateUserParams);

            return success(response, updatedUser);
        } catch (error) {
            if(error instanceof EmailAlreadyInUseError) {
                return EmailIsAlreadyInUseResponse(response);
            }
            if(error instanceof ZodError) {
                return badRequest(response, { message: error.issues[0].message });
            }
            return serverError(response, { message: error.message });
        }
    }
}