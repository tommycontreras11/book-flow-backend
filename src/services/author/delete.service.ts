import { AuthorEntity } from "../../database/entities/entity/author.entity";
import { statusCode } from "../../utils/statusCode";

export async function deleteAuthorService(uuid: string) {
  const foundAuthor = await AuthorEntity.findOneBy({ uuid }).catch((e) => {
    console.error("AuthorEntity.findOne: ", e);
    return null;
  });

  if (!foundAuthor)
    return Promise.reject({
      message: "Author already exists",
      status: statusCode.BAD_REQUEST,
    });

  await foundAuthor.softRemove().catch((e) => {
    console.error("AuthorEntity.softRemove: ", e);
    return null;
  });

  return "Author deleted successfully";
}
