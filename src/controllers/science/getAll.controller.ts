import { Request, Response } from "express";
import { getAllScienceService } from "../../services/science/getAll.service";
import { statusCode } from "../../utils/statusCode";

export const getAllScienceController = async (_req: Request, res: Response) => {
  getAllScienceService({})
    .then((data) => {
      const sciences = data.map((science) => ({
        uuid: science.uuid,
        description: science.description
      }));

      return res.status(statusCode.OK).json({ data: sciences })
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
