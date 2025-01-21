import { Request, Response } from "express";
import { statusCode } from "../../utils/statusCode";
import { getOneScienceService } from "../../services/science/getOne.service";

export const getOneScienceController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneScienceService({ where: { uuid } })
    .then((data) => {
      const science = {
        uuid: data.uuid,
        description: data.description
      };

      return res.status(statusCode.OK).json({ data: science });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
