import { Request, Response } from "express";
import { getAllBookService } from "../../services/book/getAll.service";
import { statusCode } from "../../utils/status.util";
import { ObjectStorage } from "./../../libs/object-storage";

export const getAllBookController = async (req: Request, res: Response) => {
  const { science } = req.query as { science?: string };

  const filters = {
    ...(science && { where: { science: { name: science } } })
  };

  getAllBookService({
    ...filters,
    relations: {
      requests: { user: true, book: true },
      bibliographyType: true,
      publisher: true,
      language: true,
      science: true,
      authors: true
    },
  })
    .then(async (data) => {
      const storage = ObjectStorage.instance;
      const books = await Promise.all(
        data.map(async (book) => {

          return {
            uuid: book.uuid,
            name: book.name,
            topographicalSignature: book.topographical_signature,
            isbn: book.isbn,
            publicationYear: book.publication_year,
            bibliographyType: {
              uuid: book.bibliographyType.uuid,
              name: book.bibliographyType.name,
            },
            publisher: {
              uuid: book.publisher.uuid,
              name: book.publisher.name,
            },
            language: {
              uuid: book.language.uuid,
              name: book.language.name,
            },
            science: {
              uuid: book.science.uuid,
              name: book.science.name,
            },
            authors: book.authors.map((author) => {
              return {
                uuid: author.uuid,
                name: author.name
              }
            }),
            requests: book?.requests.map((request) => ({
              uuid: request.uuid,
              user: {
                uuid: request.user.uuid,
                name: request.user.name,
              },
              status: request.status,
              book: {
                uuid: request.book.uuid,
              }
            })),
            status: book.status,
            url: await storage.getUrl(book.file_name)
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
