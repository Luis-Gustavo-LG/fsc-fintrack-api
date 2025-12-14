import { ZodError } from "zod";
import { EmailAlreadyInUseError } from "../errors/user.js";
import { 
    EmailIsAlreadyInUseResponse, 
    badRequest,
    created,
    serverError
} from "../helpers/index.js";
import { createUserSchema } from "../schemas/index.js";

export class CreateUserController {
    constructor(useCase) {
        this.execute = this.execute.bind(this);
        this.useCase = useCase;
    }   
    
    async execute(request, response) {
        try {

            const createUserParams = request.body;

            await createUserSchema.parseAsync(createUserParams);

            const createdUser = await this.useCase.execute(createUserParams);

            return created(response, createdUser);

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