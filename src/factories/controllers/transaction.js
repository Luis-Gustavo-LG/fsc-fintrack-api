import { 
    PostgresGetUserByIdRepository 
} from "../../repositories/postgres/user/index.js";
import { 
    PostgresCreateTransactionRepository,
} from "../../repositories/postgres/transaction/index.js";
import { 
    CreateTransactionUseCase 
} from "../../use-cases/transaction/create-user.js";

export const makeCreateTransactionController = () => {
    const createTransactionRepository = new PostgresCreateTransactionRepository();
    const getUserByIdRepository = new PostgresGetUserByIdRepository();
    const createTransactionUseCase = new CreateTransactionUseCase(createTransactionRepository, getUserByIdRepository);
    
}