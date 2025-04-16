import { Request, Response } from "express";
import { deleteGenreService } from "./../../services/genre/delete.service";
import { statusCode } from "./../../utils/status.util";

export const deleteGenreController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  deleteGenreService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
