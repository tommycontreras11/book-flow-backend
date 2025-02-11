import { Router } from "express";
import { getAllCountryController } from "../../../controllers/country/getAll.controller";
import { getOneCountryController } from "../../../controllers/country/getOne.controller";
import { UuidDTO } from "../../../dto/common.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import {
    createCountryController,
    deleteCountryController,
    updateCountryController,
} from "./../../../controllers/country";
import { CreateCountryDTO, UpdateCountryDTO } from "./../../../dto/country.dto";

const router = Router();

router.get("/", getAllCountryController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneCountryController);
router.post("/", validateDTO(CreateCountryDTO), createCountryController);
router.patch("/:uuid", validateDTO(UpdateCountryDTO), updateCountryController);
router.delete(
  "/:uuid",
  validateDTO(UuidDTO, "params"),
  deleteCountryController
);

export default router;
