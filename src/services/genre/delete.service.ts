import { GenreEntity } from "./../../database/entities/entity/genre.entity";
import { statusCode } from "./../../utils/status.util";

export async function deleteGenreService(uuid: string) {
  const foundGenre = await GenreEntity.findOneBy({ uuid }).catch((e) => {
    console.error("GenreEntity.findOneBy: ", e);
    return null;
  });

  if (!foundGenre)
    return Promise.reject({
      message: "Genre not found",
      status: statusCode.NOT_FOUND,
    });

  await foundGenre.softRemove().catch((e) => {
    console.error("GenreEntity.softRemove: ", e);
    return null;
  });

  return "Genre deleted successfully";
}
