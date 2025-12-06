import { Router } from "express";
import { CreateUserController } from "../controllers/create-user.js";

const router = Router();

const createUserController = new CreateUserController();

router.post('/', createUserController.execute);

export default router;

