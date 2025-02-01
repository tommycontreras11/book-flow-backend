import { Router } from "express";
import { SignInDTO } from "../../../dto/auth.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import {
  meController,
  signInController,
  signOutController,
} from "./../../../controllers/auth";

const router = Router();

router.get("/me", meController);
router.post("/signIn", validateDTO(SignInDTO), signInController);
router.post("/signOut", signOutController);

export default router;
