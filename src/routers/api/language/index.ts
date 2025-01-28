import { Router } from "express";
import { getAllLanguageController } from "../../../controllers/language/getAll.controller";
import { createLanguageController } from "../../../controllers/language/create.controller";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import { CreateLanguageDTO, UpdateLanguageDTO } from "../../../dto/language.dto";
import { getOneLanguageController } from "../../../controllers/language/getOne.controller";
import { updateLanguageController } from "../../../controllers/language/update.controller";
import { deleteLanguageController } from "../../../controllers/language/delete.controller";
import { UuidDTO } from "../../../dto/common.dto";

const router = Router()

router.get('/', getAllLanguageController)
router.get('/:uuid', validateDTO(UuidDTO, 'params'), getOneLanguageController)
router.post('/', validateDTO(CreateLanguageDTO), createLanguageController)
router.patch('/:uuid', validateDTO(UpdateLanguageDTO), updateLanguageController)
router.delete('/:uuid', validateDTO(UuidDTO, 'params'), deleteLanguageController)

export default router