import { Router } from "express";
import userRouters from "./user";

const router = Router();

router.use("/user", userRouters);

export default router