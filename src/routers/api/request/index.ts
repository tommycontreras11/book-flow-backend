import { Router } from "express";
import { createRequestController } from "../../../controllers/request/create.controller";
import { updateRequestController } from "../../../controllers/request/update.controller";
import {
  CreateRequestDTO,
  UpdateRequestDTO,
  UpdateRequestEmployeeStatusDTO,
} from "../../../dto/request.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import {
  deleteRequestController,
  getAllRequestController,
  getOneRequestController,
  updateRequestEmployeeStatusController,
} from "./../../../controllers/request";
import { UuidDTO } from "./../../../dto/common.dto";

const router = Router();

router.get("/", getAllRequestController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneRequestController);
router.post("/", validateDTO(CreateRequestDTO), createRequestController);
router.patch(
  "/:requestUUID/employees/:employeeUUID/status",
  validateDTO(UpdateRequestEmployeeStatusDTO),
  updateRequestEmployeeStatusController
);
router.patch("/:uuid", validateDTO(UpdateRequestDTO), updateRequestController);
router.delete("/:uuid", validateDTO(UpdateRequestDTO), deleteRequestController);

export default router;
