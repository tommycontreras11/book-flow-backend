import { Request, Response } from "express";
import { updateBibliographyTypeService } from "../../services/bibliography-type/update.service";
import { statusCode } from "../../utils/statusCode";

export const updateBibliographyTypeController = async (req: Request, res: Response) => {
  const { uuid } =  req.params;

  updateBibliographyTypeService(uuid, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
