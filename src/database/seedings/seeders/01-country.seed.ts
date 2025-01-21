import { CountryEntity } from "../../entities/entity/country.entity";
import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { CountryData } from "../data/country.data";

export class CountrySeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        try {
            const countryRepository = dataSource.getRepository(CountryEntity);

            await Promise.all(CountryData.map(async (country) => {
                const exists = await countryRepository.findOneBy({ name: country.name });

                if(exists) return;

                await countryRepository.save(country);
            }));
        } catch (error) {
            console.error('CountrySeeder -> run: ', error)
        }
    }
}