import { GetUserByIdUseCase } from "../use-cases/index.js";
import { notFound, serverError, success, InvalidUserIdResponse, checkIfUserIdIsValid } from "./helpers/index.js";

export class GetUserByIdController {
    constructor() {
        this.execute = this.execute.bind(this);
        this.getUserByIdUseCase = new GetUserByIdUseCase();
    }
    
    async execute(request, response) {
        try {
            const userId = request.params.id;

            if (!userId) {
                return InvalidUserIdResponse(response);
            }

            if(checkIfUserIdIsValid(userId)) {
                return InvalidUserIdResponse(response);
            }

            const user = await this.getUserByIdUseCase.execute(userId);

            if(!user) {
                return notFound(response, { message: 'User not found' });
            }

            return success(response, user);
        } catch (error) {
            return serverError(response, { message: error.message });
        }
    }
}