import { Request, Response } from "express";
import { getAllLanguageService } from "../../services/language/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllLanguageController = async (_req: Request, res: Response) => {
  getAllLanguageService({})
    .then((data) => {
      const users = data.map((language) => ({
        uuid: language.uuid,
        description: language.description
      }));

      return res.status(statusCode.OK).json({ data: users })
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
