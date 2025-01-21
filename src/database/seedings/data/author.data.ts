import { StatusEnum } from "./../../../database/entities/base/base.entity";
import { AuthorEntity } from "./../../../database/entities/entity/author.entity";

const authors = [
    { name: "Gabriel García Márquez", birth_country_id: 1, native_language_id: 1, state: "ACTIVE" },
    { name: "Jane Austen", birth_country_id: 2, native_language_id: 2, state: "ACTIVE" },
    { name: "Mark Twain", birth_country_id: 3, native_language_id: 3, state: "ACTIVE" },
    { name: "Leo Tolstoy", birth_country_id: 4, native_language_id: 4, state: "ACTIVE" },
    { name: "Virginia Woolf", birth_country_id: 5, native_language_id: 5, state: "ACTIVE" },
    { name: "Franz Kafka", birth_country_id: 6, native_language_id: 6, state: "ACTIVE" },
    { name: "George Orwell", birth_country_id: 7, native_language_id: 7, state: "ACTIVE" },
    { name: "Fyodor Dostoevsky", birth_country_id: 8, native_language_id: 8, state: "ACTIVE" },
    { name: "Ernest Hemingway", birth_country_id: 9, native_language_id: 9, state: "ACTIVE" },
    { name: "Haruki Murakami", birth_country_id: 10, native_language_id: 10, state: "ACTIVE" }
];

export const AuthorData: Partial<AuthorEntity>[] = authors.map((author) => ({
    name: author.name,
    birth_country_id: author.birth_country_id,
    native_language_id: author.native_language_id,
    state: author.state as StatusEnum
}));
