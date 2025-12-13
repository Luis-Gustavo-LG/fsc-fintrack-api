import { UserNotFoundError } from "../errors/user.js";
import { InvalidIdResponse, notFound, serverError, success, checkIfIdIsValid } from "../helpers/index.js";

export class GetBalanceByUserIdController {
    constructor(useCase) {
        this.execute = this.execute.bind(this);
        this.useCase = useCase;
    }

    async execute(request, response) {
        try {
            const userId = request.params.userId;

            if (!userId) {
                return InvalidIdResponse(response);
            }

            if (checkIfIdIsValid(userId)) {
                return InvalidIdResponse(response);
            }

            const balance = await this.useCase.execute(userId);

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