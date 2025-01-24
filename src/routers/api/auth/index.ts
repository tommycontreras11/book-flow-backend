import { signInController, signOutController } from "./../../../controllers/auth";
import { Router } from "express";
import { SignInDTO } from "../../../dto/auth.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router()

router.post('/signIn', validateDTO(SignInDTO), signInController)
router.post('/signOut', signOutController)

export default router