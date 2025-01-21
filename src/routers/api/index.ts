import { Router } from "express";
import userRouters from "./user";
import employeeRouters from "./employee";
import countryRouters from "./country";
import languageRouters from "./language";

const router = Router();

router.use("/users", userRouters);
router.use("/employees", employeeRouters);
router.use("/countries", countryRouters);
router.use("/languages", languageRouters);

export default router