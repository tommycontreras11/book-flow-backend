import { Router } from "express"
import apiRoutes from "./api"
import rootRoutes from "./root"

const router = Router()

router.use("/api", apiRoutes)
router.use("/", rootRoutes)

export default router