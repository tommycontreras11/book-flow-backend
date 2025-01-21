import { BookEntity } from "../../entities/entity/book.entity";
import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { BookData } from "../data/book.data";
import { AuthorEntity } from "../../entities/entity/author.entity";

export class BookSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        try {
            const bookRepository = dataSource.getRepository(BookEntity);
            const authorRepository = dataSource.getRepository(AuthorEntity);

            const authors = await authorRepository.find();

            for (let i = 0; i < BookData.length; i++) {
                const book = BookData[i];

                const exists = await bookRepository.findOneBy({ description: book.description });

                if (exists) continue;

                const bookCreated = await bookRepository.save(book);

                const author = authors[i % authors.length]; 
                await dataSource
                    .createQueryBuilder()
                    .relation(BookEntity, "authors") 
                    .of(bookCreated) 
                    .add(author);
            }
        } catch (error) {
            console.error('BookSeeder -> run: ', error)
        }
    }
}