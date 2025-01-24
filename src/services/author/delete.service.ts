import { AuthorEntity } from "../../database/entities/entity/author.entity";
import { statusCode } from "../../utils/statusCode";

export async function deleteAuthorService(uuid: string) {
  const foundAuthor = await AuthorEntity.findOneBy({ uuid }).catch((e) => {
    console.error("AuthorEntity.findOneBy: ", e);
    return null;
  });

  if (!foundAuthor)
    return Promise.reject({
      message: "Author not found",
      status: statusCode.NOT_FOUND,
    });

  await foundAuthor.softRemove().catch((e) => {
    console.error("AuthorEntity.softRemove: ", e);
    return null;
  });

  return "Author deleted successfully";
}
