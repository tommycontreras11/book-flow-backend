import { Column, Entity, OneToMany } from "typeorm"
import { BaseEntity, StatusEnum, StatusType } from "../base/base.entity"
import { AuthorEntity } from "./author.entity"
import { BookEntity } from "./book.entity"

@Entity({ name: 'languages' })
export class LanguageEntity extends BaseEntity {
    @Column({ length: 100 })
    description: string

    @Column({ type: 'enum', enum: StatusEnum })
    state: StatusType

    @OneToMany(() => AuthorEntity, (author) => author.nativeLanguage)
    authors: AuthorEntity[]

    @OneToMany(() => BookEntity, (book) => book.language)
    books: BookEntity[]
}