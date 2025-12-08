import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
import { notFound, serverError, success, InvalidUserIdResponse } from "./helpers/index.js";

export class GetUserByIdController {
    constructor() {
        this.execute = this.execute.bind(this);
    }
    
    async execute(request, response) {
        try {
            const userId = request.params.id;

            if (!userId) {
                return InvalidUserIdResponse(response);
            }

            const getUserByIdUseCase = new GetUserByIdUseCase();

            const user = await getUserByIdUseCase.execute(userId);

            if(!user) {
                return notFound(response, { message: 'User not found' });
            }

            return success(response, user);
        } catch (error) {
            return serverError(response, { message: error.message });
        }
    }
}