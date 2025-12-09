import {
  InvalidUserIdResponse,
  serverError,
  success,
  checkIfUserIdIsValid,
  notFound,
} from "../helpers/index.js";

export class DeleteUserController {
  constructor(useCase) {
    this.execute = this.execute.bind(this);
    this.useCase = useCase;
  }

  async execute(request, response) {
    try {
      const userId = request.params.id;

      if (!userId) {
        return InvalidUserIdResponse(response);
      }

      if (checkIfUserIdIsValid(userId)) {
        return InvalidUserIdResponse(response);
      }

      const deletedUser = await this.useCase.execute(userId);

      return success(response, deletedUser);
    } catch (error) {
      if (error.code === "P2025") {
        return notFound(response, { message: "User not found" });
      }
      return serverError(response, { message: error.message });
    }
  }
}
