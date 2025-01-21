import { Router } from "express";
import { getAllScienceController } from "../../../controllers/science/getAll.controller";
import { createScienceController } from "../../../controllers/science/create.controller";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import { CreateScienceDTO, UpdateScienceDTO } from "../../../dto/science.dto";
import { getOneScienceController } from "../../../controllers/science/getOne.controller";
import { updateScienceController } from "../../../controllers/science/update.controller";
import { deleteScienceController } from "../../../controllers/science/delete.controller";
import { UuidDTO } from "../../../dto/common.dto";

const router = Router()

router.get('/', getAllScienceController)
router.get('/:uuid', validateDTO(UuidDTO, 'params'), getOneScienceController)
router.post('/', validateDTO(CreateScienceDTO), createScienceController)
router.patch('/:uuid', validateDTO(UpdateScienceDTO), updateScienceController)
router.delete('/:uuid', validateDTO(UuidDTO, 'params'), deleteScienceController)

export default router