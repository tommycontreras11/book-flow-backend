import { Column, Entity, OneToMany } from "typeorm"
import { BaseEntity, StatusEnum, StatusType } from "../base/base.entity"
import { BookEntity } from "./book.entity"

@Entity({ name: 'bibliography-types' })
export class BibliographyTypeEntity extends BaseEntity {
    @Column({ length: 100 })
    description: string

    @Column({ type: 'enum', enum: StatusEnum })
    state: StatusType

    @OneToMany(() => BookEntity, (book) => book.bibliographyType)
    books: BookEntity[]
}