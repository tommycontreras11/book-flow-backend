import { Router } from "express";
import { createBookController } from "../../../controllers/book/create.controller";
import { deleteBookController } from "../../../controllers/book/delete.controller";
import { getAllBookController } from "../../../controllers/book/getAll.controller";
import { getOneBookController } from "../../../controllers/book/getOne.controller";
import { updateBookController } from "../../../controllers/book/update.controller";
import { CreateBookDTO, UpdateBookDTO } from "../../../dto/book.dto";
import { UuidDTO } from "../../../dto/common.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import { upload } from "./../../../utils/upload.util";

const router = Router()

router.get('/', getAllBookController)
router.get('/:uuid', validateDTO(UuidDTO, 'params'), getOneBookController)
router.post('/', upload.single('file'), validateDTO(CreateBookDTO), createBookController)
router.patch('/:uuid', validateDTO(UpdateBookDTO), updateBookController)
router.delete('/:uuid', validateDTO(UuidDTO, 'params'), deleteBookController)

export default router