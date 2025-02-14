import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm"
import { BaseEntity, StatusEnum, StatusType } from "../base/base.entity"
import { AuthorEntity } from "./author.entity"
import { BibliographyTypeEntity } from "./bibliography-type.entity"
import { LanguageEntity } from "./language.entity"
import { PublisherEntity } from "./publisher.entity"
import { RequestEntity } from "./request.entity"
import { ScienceEntity } from "./science.entity"

@Entity({ name: 'books' })
export class BookEntity extends BaseEntity {
    @Column({ length: 250 })
    name: string

    @Column()
    topographical_signature: string

    @Column()
    isbn: string

    @Column()
    bibliography_type_id: number

    @Column()
    publisher_id: number

    @Column()
    publication_year: number

    @Column()
    language_id: number

    @Column()
    science_id: number

    @Column()
    file_name: string
    
    @Column({ type: 'enum', enum: StatusEnum })
    status: StatusType

    @ManyToMany(() => AuthorEntity, (author) => author.books)
    @JoinTable({
      name: 'book-authors',
      joinColumn: {
        name: 'bookId',
        referencedColumnName: 'id'
      },
      inverseJoinColumn: {
        name: 'authorId',
        referencedColumnName: 'id'
      }
    })
    authors: AuthorEntity[]

    @ManyToOne(() => BibliographyTypeEntity, (bibliographyType) => bibliographyType.books)
    @JoinColumn({ name: 'bibliography_type_id', referencedColumnName: 'id' })
    bibliographyType: BibliographyTypeEntity

    @ManyToOne(() => PublisherEntity, (publisher) => publisher.books)
    @JoinColumn({ name: 'publisher_id', referencedColumnName: 'id' })
    publisher: PublisherEntity

    @ManyToOne(() => LanguageEntity, (language) => language.books)
    @JoinColumn({ name: 'language_id', referencedColumnName: 'id' })
    language: LanguageEntity

    @ManyToOne(() => ScienceEntity, (science) => science.books)
    @JoinColumn({ name: 'science_id', referencedColumnName: 'id' })
    science: ScienceEntity

    @OneToMany(() => RequestEntity, (request) => request.book)
    requests: RequestEntity[]
}