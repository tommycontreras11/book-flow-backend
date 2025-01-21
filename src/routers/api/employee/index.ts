import { Router } from "express";
import { getAllEmployeeController } from "../../../controllers/employee/getAll.controller";
import { createEmployeeController } from "../../../controllers/employee/create.controller";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import { CreateEmployeeDTO, UpdateEmployeeDTO } from "../../../dto/employee.dto";
import { getOneEmployeeController } from "../../../controllers/employee/getOne.controller";
import { updateEmployeeController } from "../../../controllers/employee/update.controller";
import { deleteEmployeeController } from "../../../controllers/employee/delete.controller";
import { UuidDTO } from "../../../dto/common.dto";

const router = Router()

router.get('/', getAllEmployeeController)
router.get('/:uuid', validateDTO(UuidDTO, 'params'), getOneEmployeeController)
router.post('/', validateDTO(CreateEmployeeDTO), createEmployeeController)
router.patch('/:uuid', validateDTO(UpdateEmployeeDTO), updateEmployeeController)
router.delete('/:uuid', validateDTO(UuidDTO, 'params'), deleteEmployeeController)

export default router