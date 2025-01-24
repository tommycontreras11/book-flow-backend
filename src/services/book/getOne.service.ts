import { FindOneOptions } from "typeorm";
import { statusCode } from "../../utils/statusCode";
import { BookEntity } from "../../database/entities/entity/book.entity";

export async function getOneBookService(options: FindOneOptions<BookEntity>) {
  const book = await BookEntity.findOne(options).catch((e) => {
    console.error("BookEntity.findOne: ", e);
    return null;
  });

  if (!book)
    return Promise.reject({
      message: "Book not found",
      status: statusCode.NOT_FOUND,
    });

  return book;
}
