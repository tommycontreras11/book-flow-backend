import { Router } from "express";
import { getAllAuthorController } from "../../../controllers/author/getAll.controller";
import { createAuthorController } from "../../../controllers/author/create.controller";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import { CreateAuthorDTO, UpdateAuthorDTO } from "../../../dto/author.dto";
import { getOneAuthorController } from "../../../controllers/author/getOne.controller";
import { updateAuthorController } from "../../../controllers/author/update.controller";
import { deleteAuthorController } from "../../../controllers/author/delete.controller";
import { UuidDTO } from "../../../dto/common.dto";

const router = Router()

router.get('/', getAllAuthorController)
router.get('/:uuid', validateDTO(UuidDTO, 'params'), getOneAuthorController)
router.post('/', validateDTO(CreateAuthorDTO), createAuthorController)
router.patch('/:uuid', validateDTO(UpdateAuthorDTO), updateAuthorController)
router.delete('/:uuid', validateDTO(UuidDTO, 'params'), deleteAuthorController)

export default router