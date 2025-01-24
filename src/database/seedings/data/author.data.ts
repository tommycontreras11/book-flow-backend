import { StatusEnum } from "./../../../database/entities/base/base.entity";
import { AuthorEntity } from "./../../../database/entities/entity/author.entity";

const authors = [
    { name: "Gabriel García Márquez", birth_country_id: 1, native_language_id: 1, status: "ACTIVE" },
    { name: "Jane Austen", birth_country_id: 2, native_language_id: 2, status: "ACTIVE" },
    { name: "Mark Twain", birth_country_id: 3, native_language_id: 3, status: "ACTIVE" },
    { name: "Leo Tolstoy", birth_country_id: 4, native_language_id: 4, status: "ACTIVE" },
    { name: "Virginia Woolf", birth_country_id: 5, native_language_id: 5, status: "ACTIVE" },
    { name: "Franz Kafka", birth_country_id: 6, native_language_id: 6, status: "ACTIVE" },
    { name: "George Orwell", birth_country_id: 7, native_language_id: 7, status: "ACTIVE" },
    { name: "Fyodor Dostoevsky", birth_country_id: 8, native_language_id: 8, status: "ACTIVE" },
    { name: "Ernest Hemingway", birth_country_id: 9, native_language_id: 9, status: "ACTIVE" },
    { name: "Haruki Murakami", birth_country_id: 10, native_language_id: 10, status: "ACTIVE" }
];

export const AuthorData: Partial<AuthorEntity>[] = authors.map((author) => ({
    name: author.name,
    birth_country_id: author.birth_country_id,
    native_language_id: author.native_language_id,
    status: author.status as StatusEnum
}));
