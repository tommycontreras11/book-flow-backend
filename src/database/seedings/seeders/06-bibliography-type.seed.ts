import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { BibliographyTypeData } from "../data/bibliography-type.data";
import { BibliographyTypeEntity } from "./../../../database/entities/entity/bibliography-type.entity";

export class BibliographyTypeSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        try {
            const bibliographyTypeRepository = dataSource.getRepository(BibliographyTypeEntity);

            await Promise.all(BibliographyTypeData.map(async (bibliographyType) => {
                const exists = await bibliographyTypeRepository.findOneBy({ description: bibliographyType.description });

                if(exists) return;

                await bibliographyTypeRepository.save(bibliographyType);
            }));
        } catch (error) {
            console.error('BibliographyTypeSeeder -> run: ', error)
        }
    }
}