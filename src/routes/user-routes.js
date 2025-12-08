import { Router } from "express";
import { CreateUserController,
    GetUserByIdController,
    UpdateUserController,
    DeleteUserController 
} from "../controllers/index.js";

const router = Router();

const createUserController = new CreateUserController();
const getUserByIdController = new GetUserByIdController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

router.post('/', createUserController.execute);
router.get('/:id', getUserByIdController.execute);
router.patch('/:id', updateUserController.execute);
router.delete('/:id', deleteUserController.execute);

export default router;

