import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth/auth.middleware";
import { unless } from "../../utils/unless.util";

import userRoutes from "./user";
import employeeRoutes from "./employee";
import countryRoutes from "./country";
import languageRoutes from "./language";
import bibliographyTypeRoutes from "./bibliography-type";
import publisherRoutes from "./publisher";
import authorRoutes from "./author";
import scienceRoutes from "./science";
import bookRoutes from "./book";
import requestRoutes from "./request";
import loanManagementsRoutes from "./loan-management";
import authRoutes from './auth'

const router = Router();

router.use("/auth", authRoutes);
router.use('/users', unless(
    [
        { path: '/', method: 'POST' }
    ], authMiddleware), userRoutes)
router.use("/employees", unless([{ path: '/', method: 'GET' }], authMiddleware), employeeRoutes);
router.use("/countries", unless([{ path: '/', method: 'GET' }], authMiddleware), countryRoutes);
//router.use("/languages", unless([{ path: '/', method: 'GET' }], authMiddleware), languageRoutes);
//router.use("/bibliography-types", unless([{ path: '/', method: 'GET' }], authMiddleware), bibliographyTypeRoutes);
//router.use("/sciences", unless([{ path: '/', method: 'GET' }], authMiddleware), scienceRoutes);
//router.use("/publishers", unless([{ path: '/', method: 'GET' }], authMiddleware), publisherRoutes);
//router.use("/authors", unless([{ path: '/', method: 'GET' }], authMiddleware), authorRoutes);

router.use("/books", bookRoutes);
router.use("/requests", requestRoutes);
router.use("/sciences", scienceRoutes);
router.use("/languages", languageRoutes);
router.use("/publishers", publisherRoutes);
router.use("/authors", authorRoutes);
router.use("/bibliography-types", bibliographyTypeRoutes);

//router.use("/books", unless([{ path: '/', method: 'GET' }], authMiddleware), bookRoutes);

//router.use("/requests", unless([{ path: '/', method: 'GET' }], authMiddleware), requestRoutes);
router.use("/loan-managements", authMiddleware, loanManagementsRoutes);

export default router