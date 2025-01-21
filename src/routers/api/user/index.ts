import { Router } from "express";
import { getAllUserController } from "../../../controllers/user/getAll.controller";
import { createUserController } from "../../../controllers/user/create.controller";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import { CreateUserDTO, UpdateUserDTO } from "../../../dto/user.dto";
import { getOneUserController } from "../../../controllers/user/getOne.controller";
import { updateUserController } from "../../../controllers/user/update.controller";
import { deleteUserController } from "../../../controllers/user/delete.controller";
import { UuidDTO } from "./../../../dto/common.dto";

const router = Router()

router.get('/', getAllUserController)
router.get('/:uuid', validateDTO(UuidDTO, 'params'), getOneUserController)
router.post('/', validateDTO(CreateUserDTO), createUserController)
router.patch('/:uuid', validateDTO(UpdateUserDTO), updateUserController)
router.delete('/:uuid', validateDTO(UuidDTO, 'params'), deleteUserController)

export default router