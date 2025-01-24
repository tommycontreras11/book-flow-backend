import { Router } from "express";
import { getAllLoanManagementController } from "../../../controllers/loan-management/getAll.controller";
import { createLoanManagementController } from "../../../controllers/loan-management/create.controller";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import { CreateLoanManagementDTO, UpdateLoanManagementDTO } from "../../../dto/loan-management.dto";
import { getOneLoanManagementController } from "../../../controllers/loan-management/getOne.controller";
import { updateLoanManagementController } from "../../../controllers/loan-management/update.controller";
import { deleteLoanManagementController } from "../../../controllers/loan-management/delete.controller";
import { UuidDTO } from "../../../dto/common.dto";

const router = Router()

router.get('/', getAllLoanManagementController)
router.get('/:uuid', validateDTO(UuidDTO, 'params'), getOneLoanManagementController)
router.post('/:requestUUID', validateDTO(CreateLoanManagementDTO), createLoanManagementController)
router.patch('/:uuid', validateDTO(UpdateLoanManagementDTO), updateLoanManagementController)
router.delete('/:uuid', validateDTO(UuidDTO, 'params'), deleteLoanManagementController)

export default router