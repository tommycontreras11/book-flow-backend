import { GenreEntity } from "./../../database/entities/entity/genre.entity";
import { FindOneOptions } from "typeorm";
import { statusCode } from "./../../utils/status.util";

export async function getOneGenreService(option: FindOneOptions<GenreEntity>) {
  const genre = await GenreEntity.findOne(option).catch((e) => {
    console.error("GenreEntity.findOne: ", e);
    return null;
  });

  if (!genre)
    return Promise.reject({
      message: "Genre not found",
      status: statusCode.NOT_FOUND,
    });

  return genre;
}
