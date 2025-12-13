import {
  PostgresGetUserByIdRepository,
  PostgresCreateUserRepository,
  PostgresUpdateUserRepository,
  PostgresDeleteUserRepository,
  PostgresGetUserByEmailRepository,
  PostgresGetBalanceByUserIdRepository,
} from "../../repositories/postgres/user/index.js";
import {
  GetUserByIdUseCase,
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
  GetBalanceByUserIdUseCase,
} from "../../use-cases/user/index.js";
import {
  GetUserByIdController,
  CreateUserController,
  UpdateUserController,
  DeleteUserController,
  GetBalanceByUserIdController,
} from "../../controllers/user/index.js";

export const makeUserByIdController = () => {
  const getUserByIdRepository = new PostgresGetUserByIdRepository();
  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);
  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

  return getUserByIdController;
};

export const makeCreateUserController = () => {
  const createUserRepository = new PostgresCreateUserRepository();
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
  const createUserUseCase = new CreateUserUseCase(
    createUserRepository,
    getUserByEmailRepository
  );
  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
};

export const makeUpdateUserController = () => {
  const updateUserRepository = new PostgresUpdateUserRepository();
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
  const updateUserUseCase = new UpdateUserUseCase(
    updateUserRepository,
    getUserByEmailRepository
  );
  const updateUserController = new UpdateUserController(updateUserUseCase);

  return updateUserController;
};

export const makeDeleteUserController = () => {
  const deleteUserRepository = new PostgresDeleteUserRepository();
  const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository);
  const deleteUserController = new DeleteUserController(deleteUserUseCase);

  return deleteUserController;
};

export const makeGetBalanceByUserIdController = () => {
  const getBalanceByUserIdRepository = new PostgresGetBalanceByUserIdRepository();
  const getUserByIdRepository = new PostgresGetUserByIdRepository();
  const getBalanceByUserIdUseCase = new GetBalanceByUserIdUseCase(getBalanceByUserIdRepository, getUserByIdRepository);
  const getBalanceByUserIdController = new GetBalanceByUserIdController(getBalanceByUserIdUseCase);

  return getBalanceByUserIdController;
};
