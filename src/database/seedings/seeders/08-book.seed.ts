import { BookEntity } from "../../entities/entity/book.entity";
import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { BookData } from "../data/book.data";

export class BookSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        try {
            const bookRepository = dataSource.getRepository(BookEntity);

            await Promise.all(BookData.map(async (book) => {
                const exists = await bookRepository.findOneBy({ description: book.description });

                if(exists) return;

                await bookRepository.save(book);
            }));
        } catch (error) {
            console.error('BookSeeder -> run: ', error)
        }
    }
}