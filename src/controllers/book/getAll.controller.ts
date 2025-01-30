import { Request, Response } from "express";
import { getAllBookService } from "../../services/book/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllBookController = async (req: Request, res: Response) => {
  const { science } = req.query as { science?: string };
  
  const filters = {
    ...(science && { where: { science: { description: science } } }),
  };
  
  getAllBookService({
    ...filters,
    relations: { bibliographyType: true, publisher: true, language: true, science: true },
  })
    .then((data) => {
      const books = data.map((book) => ({
        uuid: book.uuid,
        description: book.description,
        topographical_signature: book.topographical_signature,
        isbn: book.isbn,
        publication_year: book.publication_year,        
        bibliographyTypeName: book.bibliographyType.description,
        publisherName: book.publisher.description,
        languageName: book.language.description,
        scienceDescription: book.science.description,
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
