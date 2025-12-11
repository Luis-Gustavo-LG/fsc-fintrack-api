import { 
    PostgresGetUserByIdRepository 
} from "../../repositories/postgres/user/index.js";
import { 
    PostgresCreateTransactionRepository,
    PostgresGetTransactionsByUserIdRepository
} from "../../repositories/postgres/transaction/index.js";
import { 
    CreateTransactionUseCase,
    GetTransactionsByUserIdUseCase 
} from "../../use-cases/transaction/index.js";
import { 
    CreateTransactionController,
    GetTransactionsByUserIdController 
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