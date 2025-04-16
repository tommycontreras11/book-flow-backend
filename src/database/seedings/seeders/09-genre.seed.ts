import { GenreEntity } from "./../../../database/entities/entity/genre.entity";
import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { genreData } from "./../data/genre.data";

export class GenreSeeder implements Seeder {
  async run(_factory: Factory, dataSource: DataSource): Promise<void> {
    try {
      const repository = dataSource.getRepository(GenreEntity);

      await Promise.all(
        genreData.map(async (genre) => {
          const exists = await GenreEntity.findOneBy({ name: genre.name });

          if (exists) return;

          await repository.save(genre);
        })
      );
    } catch (error) {
      console.error("GenreSeeder -> run: ", error);
    }
  }
}