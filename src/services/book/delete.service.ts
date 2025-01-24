import { BookEntity } from "../../database/entities/entity/book.entity";
import { statusCode } from "../../utils/statusCode";

export async function deleteBookService(uuid: string) {
  const foundBook = await BookEntity.findOneBy({ uuid }).catch((e) => {
    console.error("BookEntity.findOne: ", e);
    return null;
  });

  if (!foundBook)
    return Promise.reject({
      message: "Book not found",
      status: statusCode.NOT_FOUND,
    });

  await foundBook.softRemove().catch((e) => {
    console.error("BookEntity.softRemove: ", e);
    return null;
  });

  return "Book deleted successfully";
}
