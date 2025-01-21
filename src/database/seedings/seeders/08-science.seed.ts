import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { ScienceEntity } from "../../entities/entity/science.entity";
import { ScienceData } from "../data/science.data";

export class ScienceSeeder implements Seeder {
  async run(_factory: Factory, dataSource: DataSource): Promise<void> {
    try {
      const scienceRepository = dataSource.getRepository(ScienceEntity);

      await Promise.all(
        ScienceData.map(async (science) => {
          const exists = await scienceRepository.findOneBy({
            description: science.description,
          });

          if (exists) return;

          await scienceRepository.save(science);
        })
      );
    } catch (error) {
      console.error("ScienceSeeder -> run: ", error);
    }
  }
}
