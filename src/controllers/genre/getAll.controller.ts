import { Request, Response } from "express";
import { getAllGenreService } from "./../../services/genre/getAll.service";
import { statusCode } from "./../../utils/status.util";

export const getAllGenreController = async (_req: Request, res: Response) => {
  getAllGenreService({})
    .then((data) => {
      const genres = data.map((genre) => ({
        uuid: genre.uuid,
        name: genre.name,
        status: genre.status,
      }));

      return res.status(statusCode.OK).json({ data: genres });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
