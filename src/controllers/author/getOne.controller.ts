import { Request, Response } from "express";
import { statusCode } from "../../utils/status.util";
import { getOneAuthorService } from "../../services/author/getOne.service";

export const getOneAuthorController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneAuthorService({
    where: { uuid },
    relations: { birthCountry: true, nativeLanguage: true },
  })
    .then((data) => {
      const author = {
        uuid: data.uuid,
        name: data.name,
        birthCountry: {
          uuid: data.birthCountry.uuid,
          name: data.birthCountry.name,
        },
        nativeLanguage: {
          uuid: data.nativeLanguage.uuid,
          name: data.nativeLanguage.name,
        },
        status: data.status,
      };

      return res.status(statusCode.OK).json({ data: author });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
