import { BibliographyTypeEntity } from "./../../../database/entities/entity/bibliography-type.entity";
import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { PublisherData } from "../data/publisher.data";

export class BibliographyTypeSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        try {
            const bibliographyTypeRepository = dataSource.getRepository(BibliographyTypeEntity);

            await Promise.all(PublisherData.map(async (bibliographyType) => {
                const exists = await bibliographyTypeRepository.findOneBy({ description: bibliographyType.description });

                if(exists) return;

                await bibliographyTypeRepository.save(bibliographyType);
            }));
        } catch (error) {
            console.error('BibliographyTypeSeeder -> run: ', error)
        }
    }
}