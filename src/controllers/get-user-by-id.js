import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
import { notFound, serverError, success } from "./helpers.js";

export class GetUserByIdController {
    constructor() {
        this.execute = this.execute.bind(this);
    }
    
    async execute(request, response) {
        try {
            const userId = request.params.id;

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