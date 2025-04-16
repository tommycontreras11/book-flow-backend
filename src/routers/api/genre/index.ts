import { Router } from "express";
import { getAllGenreController } from "../../../controllers/genre/getAll.controller";
import { createGenreController } from "../../../controllers/genre/create.controller";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import { CreateGenreDTO, UpdateGenreDTO } from "../../../dto/genre.dto";
import { getOneGenreController } from "../../../controllers/genre/getOne.controller";
import { updateGenreController } from "../../../controllers/genre/update.controller";
import { deleteGenreController } from "../../../controllers/genre/delete.controller";
import { UuidDTO } from "../../../dto/common.dto";

const router = Router();

router.get("/", getAllGenreController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneGenreController);
router.post("/", validateDTO(CreateGenreDTO), createGenreController);
router.patch("/:uuid", validateDTO(UpdateGenreDTO), updateGenreController);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteGenreController);

export default router;