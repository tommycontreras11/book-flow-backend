import { CreateUserDTO } from "./../../../dto/user.dto";
import { Router } from "express";
import { validateDTO } from "./../../../middlewares/dto/validate-dto.middleware";
import { getAllUserController, createUserController } from "controllers/user";

const router = Router();

router.get('/', getAllUserController);
router.post('/', validateDTO(CreateUserDTO), createUserController);

export default router;