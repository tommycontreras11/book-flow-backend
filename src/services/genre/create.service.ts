import { GenreEntity } from "./../../database/entities/entity/genre.entity";
import { CreateGenreDTO } from "./../../dto/genre.dto";
import { statusCode } from "./../../utils/status.util";

export async function createGenreService({ name }: CreateGenreDTO) {
  const foundGenre = await GenreEntity.findOneBy({ name }).catch((e) => {
    console.error("GenreEntity.findOneBy: ", e);
    return null;
  });

  if (foundGenre)
    return Promise.reject({
      message: "Genre's name already exists",
      status: statusCode.BAD_REQUEST,
    });

  await GenreEntity.create({
    name,
  })
    .save()
    .catch((e) => {
      console.error("GenreEntity.create: ", e);
      return null;
    });

  return "Genre created successfully";
}
