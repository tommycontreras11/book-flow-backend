import { Request, Response } from "express";
import { getOneGenreService } from "./../../services/genre/getOne.service";
import { statusCode } from "./../../utils/status.util";

export const getOneGenreController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneGenreService({ where: { uuid } })
    .then((data) => {
      const genre = {
        uuid: data.uuid,
        name: data.name,
        status: data.status,
      };

      return res.status(statusCode.OK).json({ data: genre });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
