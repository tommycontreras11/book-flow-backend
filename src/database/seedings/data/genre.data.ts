import { GenreEntity } from "./../../../database/entities/entity/genre.entity";

const genres = [
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Romance",
  "Thriller",
  "Horror",
  "Historical Fiction",
  "Non-Fiction",
  "Biography",
  "Young Adult",
];

export const genreData: Partial<GenreEntity>[] = genres.map((genre) => ({
  name: genre,
}));
