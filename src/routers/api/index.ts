import { Router } from "express";

import userRouters from "./user";
import employeeRouters from "./employee";
import countryRouters from "./country";
import languageRouters from "./language";
import bibliographyTypeRouters from "./bibliography-type";
import publisherRouters from "./publisher";
import authorRouters from "./author";
import scienceRouters from "./science";
import bookRouters from "./book";
import requestRouters from "./request";
import loanManagementsRouters from "./loan-management";
import authRoutes from './auth'

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRouters);
router.use("/employees", employeeRouters);
router.use("/countries", countryRouters);
router.use("/languages", languageRouters);
router.use("/bibliography-types", bibliographyTypeRouters);
router.use("/publishers", publisherRouters);
router.use("/authors", authorRouters);
router.use("/sciences", scienceRouters);
router.use("/books", bookRouters);
router.use("/requests", requestRouters);
router.use("/loan-managements", loanManagementsRouters);

export default router