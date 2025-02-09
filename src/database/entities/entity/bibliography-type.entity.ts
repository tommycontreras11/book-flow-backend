import { Column, Entity, OneToMany } from "typeorm"
import { BaseEntity, StatusEnum, StatusType } from "../base/base.entity"
import { BookEntity } from "./book.entity"

@Entity({ name: 'bibliography-types' })
export class BibliographyTypeEntity extends BaseEntity {
    @Column({ length: 100 })
    name: string

    @Column({ type: 'enum', enum: StatusEnum })
    status: StatusType

    @OneToMany(() => BookEntity, (book) => book.bibliographyType)
    books: BookEntity[]
}