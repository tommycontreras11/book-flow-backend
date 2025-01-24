import { Request, Response } from "express";
import { getAllBibliographyTypeService } from "../../services/bibliography-type/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllBibliographyTypeController = async (_req: Request, res: Response) => {
  getAllBibliographyTypeService({})
    .then((data) => {
      const bibliographyTypes = data.map((bibliographyType) => ({
        uuid: bibliographyType.uuid,
        description: bibliographyType.description
      }));

      return res.status(statusCode.OK).json({ data: bibliographyTypes })
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
