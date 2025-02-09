import { Request, Response } from "express";
import { statusCode } from "../../utils/status.util";
import { getOneBookService } from "../../services/book/getOne.service";

export const getOneBookController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneBookService({
    where: { uuid },
    relations: { bibliographyType: true, publisher: true, language: true, science: true },
  })
    .then((data) => {
      const book = {
        uuid: data.uuid,
        name: data.name,
        topographical_signature: data.topographical_signature,
        isbn: data.isbn,
        publication_year: data.publication_year,
        bibliography_type: {
          uuid: data.bibliographyType.uuid,
          name: data.bibliographyType.name,
        },
        publisher: {
          uuid: data.publisher.uuid,
          name: data.publisher.name,
        },
        language: {
          uuid: data.language.uuid,
          name: data.language.name,
        },
        science: {
          uuid: data.science.uuid,
          name: data.science.name,
        },
        status: data.status,
      };

      return res.status(statusCode.OK).json({ data: book });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
