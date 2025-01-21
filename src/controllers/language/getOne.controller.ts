import { Request, Response } from "express";
import { getOneLanguageService } from "../../services/language/getOne.service";
import { statusCode } from "../../utils/statusCode";

export const getOneLanguageController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneLanguageService({ where: { uuid } })
    .then((data) => {
      const language = {
        description: data.description
      };

      return res.status(statusCode.OK).json({ data: language });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
