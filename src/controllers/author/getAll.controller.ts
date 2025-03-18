import { Request, Response } from "express";
import { getAllAuthorService } from "../../services/author/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllAuthorController = async (_req: Request, res: Response) => {
  getAllAuthorService({
    relations: { birthCountry: true, nativeLanguage: true },
  })
    .then((data) => {
      const authors = data.map((author) => ({
        uuid: author.uuid,
        name: author.name,
        birthCountry: {
          uuid: author.birthCountry.uuid,
          name: author.birthCountry.name,
        },
        nativeLanguage: {
          uuid: author.nativeLanguage.uuid,
          name: author.nativeLanguage.name,
        },
        status: author.status,
      }));

      return res.status(statusCode.OK).json({ data: authors });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
