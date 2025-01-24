import { Request, Response } from "express";
import { createBibliographyTypeService } from "../../services/bibliography-type/create.service";
import { statusCode } from "../../utils/status.util";

export const createBibliographyTypeController = async (req: Request, res: Response) => {
  createBibliographyTypeService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
