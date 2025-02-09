import { LanguageEntity } from "../../entities/entity/language.entity";
import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { LanguageData } from "../data/language.data";

export class LanguageSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        try {
            const languageRepository = dataSource.getRepository(LanguageEntity);

            await Promise.all(LanguageData.map(async (language) => {
                const exists = await languageRepository.findOneBy({ name: language.name });

                if(exists) return;

                await languageRepository.save(language);
            }));
        } catch (error) {
            console.error('LanguageSeeder -> run: ', error)
        }
    }
}