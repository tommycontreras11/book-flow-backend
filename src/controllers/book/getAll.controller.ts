import { Request, Response } from "express";
import { getAllBookService } from "../../services/book/getAll.service";
import { statusCode } from "../../utils/status.util";
import { ObjectStorage } from "./../../libs/object-storage";

export const getAllBookController = async (req: Request, res: Response) => {
  const { search } = req.query as { search?: string };

  const filters = search ? 
  [
    {
      name: search
    },
    {
      science: { name: search }
    },
    {
      language: { name: search }
    }
  ] : [];

  getAllBookService({
    ...(filters.length > 0 && { where: filters }),
    relations: {
      requests: { user: true, book: true },
      bibliographyType: true,
      publisher: true,
      language: true,
      science: true,
      genres: true,
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
            description: book.description,
            topographicalSignature: book.topographical_signature,
            isbn: book.isbn,
            publishedDate: book.published_date,
            pages: book.pages,
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
            genres: book.genres.map((genre) => {
              return {
                uuid: genre.uuid,
                name: genre.name
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
            url: await storage.getUrl(book.file_name),
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
