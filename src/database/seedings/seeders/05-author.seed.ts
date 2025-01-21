import { AuthorEntity } from "../../entities/entity/author.entity";
import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { AuthorData } from "../data/author.data";

export class AuthorSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        try {
            const authorRepository = dataSource.getRepository(AuthorEntity);

            await Promise.all(AuthorData.map(async (author) => {
                const exists = await authorRepository.findOneBy({ name: author.name });

                if(exists) return;

                await authorRepository.save(author);
            }));
        } catch (error) {
            console.error('AuthorSeeder -> run: ', error)
        }
    }
}