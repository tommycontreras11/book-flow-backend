import { Router } from "express";
import { getAllLanguageController } from "../../../controllers/language/getAll.controller";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import { getOneLanguageController } from "../../../controllers/language/getOne.controller";
import { UuidDTO } from "../../../dto/common.dto";

const router = Router()

router.get('/', getAllLanguageController)
router.get('/:uuid', validateDTO(UuidDTO, 'params'), getOneLanguageController)

export default router