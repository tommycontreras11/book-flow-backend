import { Router } from "express";
import { getAllCountryController } from "../../../controllers/country/getAll.controller";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import { getOneCountryController } from "../../../controllers/country/getOne.controller";
import { UuidDTO } from "../../../dto/common.dto";

const router = Router()

router.get('/', getAllCountryController)
router.get('/:uuid', validateDTO(UuidDTO, 'params'), getOneCountryController)

export default router