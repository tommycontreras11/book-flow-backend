import { AuthorEntity } from "../../database/entities/entity/author.entity";
import { FindManyOptions } from "typeorm";
import { statusCode } from "../../utils/status.util";

export async function getAllAuthorService(options: FindManyOptions<AuthorEntity>) {
  const authors = await AuthorEntity.find(options).catch((e) => {
    console.error("AuthorEntity.find: ", e);
    return null;
  });

  if (!authors)
    return Promise.reject({
      message: "Authors not found",
      status: statusCode.NOT_FOUND,
    });

  return authors;
}
