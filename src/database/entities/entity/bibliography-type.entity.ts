import { Column, Entity, OneToMany } from "typeorm"
import { BaseEntity } from "../base/base.entity"
import { BookEntity } from "./book.entity"

export enum BibliographyTypeEnum { 
    ARTICLE = 'ARTICLE',
    BOOK = 'BOOK',
    CONFERENCE = 'CONFERENCE',
    JOURNAL = 'JOURNAL',
    OTHER = 'OTHER'
}

export type BibliographyType = keyof typeof BibliographyTypeEnum

@Entity({ name: 'bibliography-types' })
export class BibliographyTypeEntity extends BaseEntity {
    @Column({ length: 100 })
    description: string

    @Column({ type: 'enum', enum: BibliographyTypeEnum })
    state: BibliographyType

    @OneToMany(() => BookEntity, (book) => book.bibliographyType)
    books: BookEntity[]
}