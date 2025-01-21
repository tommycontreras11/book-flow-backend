import { Router } from "express";
import { getAllPublisherController } from "../../../controllers/publisher/getAll.controller";
import { createPublisherController } from "../../../controllers/publisher/create.controller";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import { CreatePublisherDTO, UpdatePublisherDTO } from "../../../dto/publisher.dto";
import { getOnePublisherController } from "../../../controllers/publisher/getOne.controller";
import { updatePublisherController } from "../../../controllers/publisher/update.controller";
import { deletePublisherController } from "../../../controllers/publisher/delete.controller";
import { UuidDTO } from "../../../dto/common.dto";

const router = Router()

router.get('/', getAllPublisherController)
router.get('/:uuid', validateDTO(UuidDTO, 'params'), getOnePublisherController)
router.post('/', validateDTO(CreatePublisherDTO), createPublisherController)
router.patch('/:uuid', validateDTO(UpdatePublisherDTO), updatePublisherController)
router.delete('/:uuid', validateDTO(UuidDTO, 'params'), deletePublisherController)

export default router