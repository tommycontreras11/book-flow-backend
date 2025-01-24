import { StatusEnum } from "./../../../database/entities/base/base.entity";
import { BookEntity } from "./../../../database/entities/entity/book.entity";

const books = [
    {
        description: "Advanced Mathematics",
        topographical_signature: "QA76.73.J38",
        isbn: "9781234567890",
        bibliography_type_id: 1,
        publisher_id: 2,
        publication_year: 2020,
        science_id: 1,
        language_id: 1,
        status: StatusEnum.ACTIVE
    },
    {
        description: "Introduction to Physics",
        topographical_signature: "QC23.2",
        isbn: "9789876543210",
        bibliography_type_id: 3,
        publisher_id: 5,
        publication_year: 2018,
        science_id: 2,
        language_id: 2,
        status: StatusEnum.ACTIVE
    },
    {
        description: "Modern Chemistry",
        topographical_signature: "QD31.2",
        isbn: "9785678901234",
        bibliography_type_id: 4,
        publisher_id: 1,
        publication_year: 2019,
        science_id: 3,
        language_id: 3,
        status: StatusEnum.ACTIVE
    },
    {
        description: "World History Overview",
        topographical_signature: "D20.5",
        isbn: "9783456789012",
        bibliography_type_id: 2,
        publisher_id: 6,
        publication_year: 2021,
        science_id: 4,
        language_id: 4,
        status: StatusEnum.ACTIVE
    },
    {
        description: "Theoretical Computer Science",
        topographical_signature: "QA76.9.A25",
        isbn: "9788901234567",
        bibliography_type_id: 7,
        publisher_id: 7,
        publication_year: 2017,
        science_id: 5,
        language_id: 5,
        status: StatusEnum.ACTIVE
    },
    {
        description: "Basic Economics",
        topographical_signature: "HB171.5",
        isbn: "9789012345678",
        bibliography_type_id: 8,
        publisher_id: 8,
        publication_year: 2022,
        science_id: 6,
        language_id: 6,
        status: StatusEnum.ACTIVE
    },
    {
        description: "Human Anatomy",
        topographical_signature: "QM25",
        isbn: "9786789012345",
        bibliography_type_id: 9,
        publisher_id: 3,
        publication_year: 2016,
        science_id: 7,
        language_id: 7,
        status: StatusEnum.ACTIVE
    },
    {
        description: "Astronomy Fundamentals",
        topographical_signature: "QB43.3",
        isbn: "9782345678901",
        bibliography_type_id: 6,
        publisher_id: 4,
        publication_year: 2015,
        science_id: 8,
        language_id: 8,
        status: StatusEnum.ACTIVE
    },
    {
        description: "Introduction to Psychology",
        topographical_signature: "BF121",
        isbn: "9784567890123",
        bibliography_type_id: 10,
        publisher_id: 9,
        publication_year: 2023,
        science_id: 9,
        language_id: 9,
        status: StatusEnum.ACTIVE
    },
    {
        description: "Environmental Science Basics",
        topographical_signature: "GE105",
        isbn: "9780123456789",
        bibliography_type_id: 5,
        publisher_id: 10,
        publication_year: 2021,
        science_id: 10,
        language_id: 10,
        status: StatusEnum.ACTIVE
    }
];

export const BookData: Partial<BookEntity>[] = books.map((book) => ({
    description: book.description,
    topographical_signature: book.topographical_signature,
    isbn: book.isbn,
    bibliography_type_id: book.bibliography_type_id,
    publisher_id: book.publisher_id,
    publication_year: book.publication_year,
    science_id: book.science_id,
    language_id: book.language_id,
    status: book.status
}));
