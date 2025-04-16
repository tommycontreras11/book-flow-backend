import { Column, Entity, ManyToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { BookEntity } from "./book.entity";

@Entity({ name: "genres" })
export class GenreEntity extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => BookEntity, (book) => book.genres)
  books: BookEntity[];
}