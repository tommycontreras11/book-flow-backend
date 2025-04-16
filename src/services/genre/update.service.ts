import { GenreEntity } from "./../../database/entities/entity/genre.entity";
import { UpdateGenreDTO } from "./../../dto/genre.dto";
import { Not } from "typeorm";
import { statusCode } from "./../../utils/status.util";

export async function updateGenreService(
  uuid: string,
  { name, status }: UpdateGenreDTO
) {
  const foundGenre = await GenreEntity.findOne({
    where: { name, uuid: Not(uuid) },
  }).catch((e) => {
    console.error("GenreEntity.findOne: ", e);
    return null;
  });

  if (foundGenre)
    return Promise.reject({
      message: "Genre's name already exists",
      status: statusCode.BAD_REQUEST,
    });

  await GenreEntity.update(
    { uuid },
    { ...(name && { name }), ...(status && { status }) }
  ).catch((e) => {
    console.error("GenreEntity.update: ", e);
    return null;
  });

  return "Genre updated successfully";
}
