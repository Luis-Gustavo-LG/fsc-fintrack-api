import {
  notFound,
  serverError,
  success,
  InvalidIdResponse,
  checkIfIdIsValid,
} from "../helpers/index.js";
export class GetUserByIdController {
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

      const user = await this.useCase.execute(userId);

      if (!user) {
        return notFound(response, { message: "User not found" });
      }

      return success(response, user);
    } catch (error) {
      return serverError(response, { message: error.message });
    }
  }
}
