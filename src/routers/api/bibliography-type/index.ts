import { Router } from "express";
import { getAllBibliographyTypeController } from "../../../controllers/bibliography-type/getAll.controller";
import { createBibliographyTypeController } from "../../../controllers/bibliography-type/create.controller";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import { CreateBibliographyTypeDTO, UpdateBibliographyTypeDTO } from "../../../dto/bibliography-type.dto";
import { getOneBibliographyTypeController } from "../../../controllers/bibliography-type/getOne.controller";
import { updateBibliographyTypeController } from "../../../controllers/bibliography-type/update.controller";
import { deleteBibliographyTypeController } from "../../../controllers/bibliography-type/delete.controller";
import { UuidDTO } from "../../../dto/common.dto";

const router = Router()

router.get('/', getAllBibliographyTypeController)
router.get('/:uuid', validateDTO(UuidDTO, 'params'), getOneBibliographyTypeController)
router.post('/', validateDTO(CreateBibliographyTypeDTO), createBibliographyTypeController)
router.patch('/:uuid', validateDTO(UpdateBibliographyTypeDTO), updateBibliographyTypeController)
router.delete('/:uuid', validateDTO(UuidDTO, 'params'), deleteBibliographyTypeController)

export default router