import { Router } from "express";
import userRouters from "./user";

const router = Router();

router.use("/users", userRouters);

export default router