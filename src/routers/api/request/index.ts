import { Router } from "express";
import { createRequestController } from "../../../controllers/request/create.controller";
import { updateRequestController } from "../../../controllers/request/update.controller";
import { CreateRequestDTO, UpdateRequestDTO, UpdateRequestEmployeeStatusDTO } from "../../../dto/request.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import { updateRequestEmployeeStatusController } from "./../../../controllers/request";

const router = Router()

router.post('/', validateDTO(CreateRequestDTO), createRequestController)
router.patch('/:requestUUID/employees/:employeeUUID/status', validateDTO(UpdateRequestEmployeeStatusDTO), updateRequestEmployeeStatusController)
router.patch('/:uuid', validateDTO(UpdateRequestDTO), updateRequestController)

export default router