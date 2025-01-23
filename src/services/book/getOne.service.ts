import { FindOneOptions } from "typeorm";
import { statusCode } from "../../utils/statusCode";
import { AuthorEntity } from "../../database/entities/entity/author.entity";

export async function getOneAuthorService(options: FindOneOptions<AuthorEntity>) {
  const author = await AuthorEntity.findOne(options).catch((e) => {
    console.error("AuthorEntity.findOne: ", e);
    return null;
  });

  if (!author)
    return Promise.reject({
      message: "Author not found",
      status: statusCode.NOT_FOUND,
    });

  return author;
}
