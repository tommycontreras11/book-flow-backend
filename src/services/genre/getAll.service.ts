import { GenreEntity } from "./../../database/entities/entity/genre.entity";
import { FindManyOptions } from "typeorm";
import { statusCode } from "./../../utils/status.util";

export async function getAllGenreService(
  options?: FindManyOptions<GenreEntity>
) {
  const genres = await GenreEntity.find(options).catch((e) => {
    console.error("GenreEntity.find: ", e);
    return null;
  });

  if (!genres)
    return Promise.reject({
      message: "Genres not found",
      status: statusCode.NOT_FOUND,
    });

  return genres;
}
