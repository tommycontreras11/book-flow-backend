import { Request, Response } from "express";
import { getAllBookService } from "../../services/book/getAll.service";
import { statusCode } from "../../utils/statusCode";

export const getAllBookController = async (_req: Request, res: Response) => {
  getAllBookService({
    relations: { bibliographyType: true, publisher: true, language: true, science: true },
  })
    .then((data) => {
      const books = data.map((book) => ({
        uuid: book.uuid,
        description: book.description,
        topographical_signature: book.topographical_signature,
        isbn: book.isbn,
        bibliography_type: book.bibliographyType.description,
        publisher: book.publisher.description,
        publication_year: book.publication_year,
        language: book.language.description,
        science: book.science.description,
        status: book.status,
      }));

      return res.status(statusCode.OK).json({ data: books });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
