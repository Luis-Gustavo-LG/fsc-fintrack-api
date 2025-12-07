import { Router } from "express";
import { CreateUserController } from "../controllers/create-user.js";
import { GetUserByIdController } from "../controllers/get-user-by-id.js";
import { UpdateUserController } from "../controllers/update-user.js";

const router = Router();

const createUserController = new CreateUserController();
const getUserByIdController = new GetUserByIdController();
const updateUserController = new UpdateUserController();

router.post('/', createUserController.execute);
router.get('/:id', getUserByIdController.execute);
router.patch('/:id', updateUserController.execute);

export default router;

