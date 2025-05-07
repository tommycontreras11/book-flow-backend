import { Router } from "express";
import { createCommentController } from "../../../controllers/comment/create.controller";
import { deleteCommentController } from "../../../controllers/comment/delete.controller";
import { getAllCommentController } from "../../../controllers/comment/getAll.controller";
import { getOneCommentController } from "../../../controllers/comment/getOne.controller";
import { getOneCommentByBookController } from "./../../../controllers/comment/getOneByBook.controller";
import { updateCommentController } from "../../../controllers/comment/update.controller";
import { CreateCommentDTO, UpdateCommentDTO } from "../../../dto/comment.dto";
import { UuidDTO } from "../../../dto/common.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import { upload } from "./../../../utils/upload.util";

const router = Router();

router.get("/", getAllCommentController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneCommentController);
router.get(
  "/:uuid/book",
  validateDTO(UuidDTO, "params"),
  getOneCommentByBookController
);
router.post(
  "/",
  upload.single("file"),
  validateDTO(CreateCommentDTO),
  createCommentController
);
router.patch(
  "/:uuid",
  upload.single("file"),
  validateDTO(UpdateCommentDTO),
  updateCommentController
);
router.delete(
  "/:uuid",
  validateDTO(UuidDTO, "params"),
  deleteCommentController
);

export default router;
