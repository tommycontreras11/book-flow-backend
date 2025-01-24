import { BookEntity } from "../../database/entities/entity/book.entity";
import { FindManyOptions } from "typeorm";
import { statusCode } from "../../utils/status.util";

export async function getAllBookService(options: FindManyOptions<BookEntity>) {
  const books = await BookEntity.find(options).catch((e) => {
    console.error("BookEntity.find: ", e);
    return null;
  });

  if (!books)
    return Promise.reject({
      message: "Books not found",
      status: statusCode.NOT_FOUND,
    });

  return books;
}
