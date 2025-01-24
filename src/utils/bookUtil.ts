import { AuthorEntity } from "./../database/entities/entity/author.entity";
import { BookEntity } from "./../database/entities/entity/book.entity";

export const recursiveCreateBookAuthor = async (
    book: BookEntity,
    authors: AuthorEntity[]
  ): Promise<unknown> => {
    const payload = authors.pop();
  
    if (!payload) return;
  
    book.authors = [...(book.authors || []), payload];
  
    await book.save();
  
    return recursiveCreateBookAuthor(book, authors);
  };
  