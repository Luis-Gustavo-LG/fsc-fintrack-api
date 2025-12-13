import { 
    PostgresGetUserByIdRepository 
} from "../../repositories/postgres/user/index.js";
import { 
    PostgresCreateTransactionRepository,
    PostgresGetTransactionsByUserIdRepository,
    PostgresDeleteTransactionRepository,
    PostgresUpdateTransactionRepository
} from "../../repositories/postgres/transaction/index.js";
import { 
    CreateTransactionUseCase,
    GetTransactionsByUserIdUseCase,
    DeleteTransactionUseCase,
    UpdateTransactionUseCase
} from "../../use-cases/transaction/index.js";
import { 
    CreateTransactionController,
    GetTransactionsByUserIdController,
    DeleteTransactionController,
    UpdateTransactionController    
} from "../../controllers/transaction/index.js";

export const makeCreateTransactionController = () => {
    const createTransactionRepository = new PostgresCreateTransactionRepository();
    const getUserByIdRepository = new PostgresGetUserByIdRepository();
    const createTransactionUseCase = new CreateTransactionUseCase(createTransactionRepository, getUserByIdRepository);
    const createTransactionController = new CreateTransactionController(createTransactionUseCase);
    
    return createTransactionController;
}

export const makeGetTransactionsByUserIdController = () => {
    const getTransactionsByUserIdRepository = new PostgresGetTransactionsByUserIdRepository();
    const getUserByIdRepository = new PostgresGetUserByIdRepository();
    const getTransactionsByUserIdUseCase = new GetTransactionsByUserIdUseCase(getTransactionsByUserIdRepository, getUserByIdRepository);
    const getTransactionsByUserIdController = new GetTransactionsByUserIdController(getTransactionsByUserIdUseCase);
    
    return getTransactionsByUserIdController;
}

export const makeDeleteTransactionController = () => {
    const deleteTransactionRepository = new PostgresDeleteTransactionRepository();
    const deleteTransactionUseCase = new DeleteTransactionUseCase(deleteTransactionRepository);
    const deleteTransactionController = new DeleteTransactionController(deleteTransactionUseCase);
    
    return deleteTransactionController;
}

export const makeUpdateTransactionController = () => {
    const updateTransactionRepository = new PostgresUpdateTransactionRepository();
    const updateTransactionUseCase = new UpdateTransactionUseCase(updateTransactionRepository);
    const updateTransactionController = new UpdateTransactionController(updateTransactionUseCase);
    
    return updateTransactionController;
}