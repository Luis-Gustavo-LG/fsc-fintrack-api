import {
  InvalidIdResponse,
  serverError,
  success,
  checkIfIdIsValid,
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
        return InvalidIdResponse(response);
      }

      if (checkIfIdIsValid(userId)) {
        return InvalidIdResponse(response);
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
