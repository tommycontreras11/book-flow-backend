import { Request, Response } from "express";
import { getOneBibliographyTypeService } from "../../services/bibliography-type/getOne.service";
import { statusCode } from "../../utils/statusCode";

export const getOneBibliographyTypeController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneBibliographyTypeService({ where: { uuid } })
    .then((data) => {
      const bibliographyType = {
        description: data.description
      };

      return res.status(statusCode.OK).json({ data: bibliographyType });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
