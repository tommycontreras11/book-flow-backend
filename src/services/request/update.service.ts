import { BookEntity } from "database/entities/entity/book.entity";
import { UserEntity } from "database/entities/entity/user.entity";
import { RequestEntity } from "../../database/entities/entity/request.entity";
import { statusCode } from "../../utils/statusCode";
import { UpdateRequestDTO } from "./../../dto/request.dto";

export async function updateRequestService(uuid: string, {
  userUUID,
  bookUUID,
  status,
  ...payload
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
  
  let foundUser: UserEntity | null = null;
  
  if(userUUID) {
    foundUser = await UserEntity.findOneBy({ uuid: userUUID }).catch((e) => {
      console.error("UserEntity.findOneBy: ", e);
      return null;
    });
  
    if (!foundUser)
      return Promise.reject({
        message: "User not found",
        status: statusCode.BAD_REQUEST,
      });
  }

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
    ...(foundUser && { user_id: foundUser.id }),
    ...(foundBook && { book_id: foundBook.id }),
    ...(status && { status }),
    ...payload,
  })
    .catch((e) => {
      console.error("RequestEntity.update: ", e);
      return null;
    });

  return "Request updated successfully";
}
