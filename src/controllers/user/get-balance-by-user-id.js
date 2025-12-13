import { UserNotFoundError } from "../errors/user.js";
import { InvalidIdResponse, notFound, serverError, success, checkIfIdIsValid } from "../helpers/index.js";

export class GetBalanceByUserIdController {
    constructor(getBalanceByUserIdUseCase) {
        this.execute = this.execute.bind(this);
        this.getBalanceByUserIdUseCase = getBalanceByUserIdUseCase;
    }

    async execute(request, response) {
        try {
            const userId = request.params.id;

            if (!userId) {
                return InvalidIdResponse(response);
            }

            if (checkIfIdIsValid(userId)) {
                return InvalidIdResponse(response);
            }

            const balance = await this.getBalanceByUserIdUseCase.execute(userId);

            if (!balance) {
                return notFound(response, { message: "Balance not found" });
            }

            return success(response, balance);
        } catch (error) {
            if(error instanceof UserNotFoundError) {
                return notFound(response, { message: "User not found" });
            }
            return serverError(response, { message: error.message });
        }
    }
}