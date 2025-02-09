import { Request, Response } from "express";
import { getOnePublisherService } from "../../services/publisher/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOnePublisherController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOnePublisherService({ where: { uuid } })
    .then((data) => {
      const publisher = {
        name: data.name
      };

      return res.status(statusCode.OK).json({ data: publisher });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
