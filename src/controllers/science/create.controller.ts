import { Request, Response } from "express";
import { createScienceService } from "../../services/science/create.service";
import { statusCode } from "../../utils/status.util";

export const createScienceController = async (req: Request, res: Response) => {
  createScienceService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
