import { BookEntity } from "database/entities/entity/book.entity";
import { UserEntity } from "database/entities/entity/user.entity";
import { RequestEntity } from "../../database/entities/entity/request.entity";
import { statusCode } from "../../utils/statusCode";
import { CreateRequestDTO } from "./../../dto/request.dto";

export async function createRequestService({
  userUUID,
  bookUUID,
  ...payload
}: CreateRequestDTO) {
  const foundUser = await UserEntity.findOneBy({ uuid: userUUID }).catch((e) => {
    console.error("UserEntity.findOneBy: ", e);
    return null;
  });

  if (!foundUser)
    return Promise.reject({
      message: "User not found",
      status: statusCode.BAD_REQUEST,
    });

  const foundBook = await BookEntity.findOneBy({ uuid: bookUUID }).catch((e) => {
    console.error("BookEntity.findOneBy: ", e);
    return null;
  });

  if (!foundBook)
    return Promise.reject({
      message: "Book not found",
      status: statusCode.NOT_FOUND,
    });

  await RequestEntity.create({
    user_id: foundUser.id,
    book_id: foundBook.id,
    status: "PENDING",
    ...payload,
  })
    .save()
    .catch((e) => {
      console.error("RequestEntity.create: ", e);
      return null;
    });

  return "Request created successfully";
}
