import { Router } from "express";
import { CreateUserController } from "../controllers/create-user.js";
import { GetUserByIdController } from "../controllers/get-user-by-id.js";

const router = Router();

const createUserController = new CreateUserController();
const getUserByIdController = new GetUserByIdController();

router.post('/', createUserController.execute);
router.get('/:id', getUserByIdController.execute);

export default router;

