import { Request, Response } from "express";
import { getAllBookService } from "../../services/book/getAll.service";
import { statusCode } from "../../utils/status.util";
import { ObjectStorage } from "./../../libs/object-storage";

export const getAllBookController = async (req: Request, res: Response) => {
  const { science } = req.query as { science?: string };

  const filters = {
    ...(science && { where: { science: { name: science } } }),
  };

  getAllBookService({
    ...filters,
    relations: {
      bibliographyType: true,
      publisher: true,
      language: true,
      science: true,
    },
  })
    .then(async (data) => {
      const storage = ObjectStorage.instance;
      const books = await Promise.all(
        data.map(async (book) => {
          const url = await storage.getUrl(book.file_name);

          return {
            uuid: book.uuid,
            name: book.name,
            topographicalSignature: book.topographical_signature,
            isbn: book.isbn,
            publicationYear: book.publication_year,
            bibliographyTypeName: book.bibliographyType.name,
            publisherName: book.publisher.name,
            languageName: book.language.name,
            scienceDescription: book.science.name,
            status: book.status,
            url,
          };
        })
      );

      return res.status(statusCode.OK).json({ data: books });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
