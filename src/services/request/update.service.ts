import { RequestEntity } from "../../database/entities/entity/request.entity";
import { statusCode } from "../../utils/status.util";
import { BookEntity } from "./../../database/entities/entity/book.entity";
import { UpdateRequestDTO } from "./../../dto/request.dto";

export async function updateRequestService(uuid: string, {
  bookUUID,
  status
}: UpdateRequestDTO) {
  const foundRequest = await RequestEntity.findOneBy({ uuid }).catch((e) => {
    console.error("RequestEntity.findOneBy: ", e);
    return null;
  });

  if (!foundRequest)
    return Promise.reject({
      message: "Request not found",
      status: statusCode.BAD_REQUEST,
    });

  let foundBook: BookEntity | null = null;

  if(bookUUID) {
    foundBook = await BookEntity.findOneBy({ uuid: bookUUID }).catch((e) => {
      console.error("BookEntity.findOneBy: ", e);
      return null;
    });
  
    if (!foundBook)
      return Promise.reject({
        message: "Book not found",
        status: statusCode.NOT_FOUND,
      });
  }

  await RequestEntity.update({ id: foundRequest.id }, {
    ...(foundBook && { book_id: foundBook.id }),
    ...(status && { status }),
  })
    .catch((e) => {
      console.error("RequestEntity.update: ", e);
      return null;
    });

  return "Request updated successfully";
}
