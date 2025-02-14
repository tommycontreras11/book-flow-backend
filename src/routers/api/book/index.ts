import { Router } from "express";
import { getAllBookController } from "../../../controllers/book/getAll.controller";
import { createBookController } from "../../../controllers/book/create.controller";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import { CreateBookDTO, UpdateBookDTO } from "../../../dto/book.dto";
import { getOneBookController } from "../../../controllers/book/getOne.controller";
import { updateBookController } from "../../../controllers/book/update.controller";
import { deleteBookController } from "../../../controllers/book/delete.controller";
import { UuidDTO } from "../../../dto/common.dto";
import { userSchema } from "./../../../schemas/bookSchema";
import validateSchema from "./../../../middlewares/schema/validate-schema.middleware";

const router = Router()

router.get('/', getAllBookController)
router.get('/:uuid', validateDTO(UuidDTO, 'params'), getOneBookController)
router.post('/', validateSchema(userSchema), createBookController)
router.patch('/:uuid', validateDTO(UpdateBookDTO), updateBookController)
router.delete('/:uuid', validateDTO(UuidDTO, 'params'), deleteBookController)

export default router