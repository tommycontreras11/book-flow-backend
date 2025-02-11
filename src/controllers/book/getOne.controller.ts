import { Request, Response } from "express";
import { statusCode } from "../../utils/status.util";
import { getOneBookService } from "../../services/book/getOne.service";

export const getOneBookController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneBookService({
    where: { uuid },
    relations: {
      bibliographyType: true,
      publisher: true,
      language: true,
      science: true,
      authors: true,
    },
  })
    .then((data) => {
      const book = {
        uuid: data.uuid,
        name: data.name,
        topographicalSignature: data.topographical_signature,
        isbn: data.isbn,
        publicationYear: data.publication_year,
        bibliographyTypeUUID: data.bibliographyType.uuid,
        publisherUUID: data.publisher.uuid,
        languageUUID: data.language.uuid,
        scienceUUID: data.science.uuid,
        authorUUIDs: data.authors.map((author) => author.uuid),
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
