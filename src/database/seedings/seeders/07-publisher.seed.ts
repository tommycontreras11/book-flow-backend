import { PublisherEntity } from "../../entities/entity/publisher.entity";
import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { PublisherData } from "../data/publisher.data";

export class PublisherSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        try {
            const publisherRepository = dataSource.getRepository(PublisherEntity);

            await Promise.all(PublisherData.map(async (publisher) => {
                const exists = await publisherRepository.findOneBy({ name: publisher.name });

                if(exists) return;

                await publisherRepository.save(publisher);
            }));
        } catch (error) {
            console.error('PublisherSeeder -> run: ', error)
        }
    }
}