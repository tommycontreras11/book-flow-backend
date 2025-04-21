import { Column, Entity, ManyToMany } from "typeorm";
import { BaseEntity, StatusEnum, StatusType } from "../base/base.entity";
import { BookEntity } from "./book.entity";

@Entity({ name: "genres" })
export class GenreEntity extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ type: "enum", enum: StatusEnum })
  status: StatusType;

  @ManyToMany(() => BookEntity, (book) => book.genres)
  books: BookEntity[];
}