import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm"
import { BaseEntity, StatusEnum, StatusType } from "../base/base.entity"
import { CountryEntity } from "./country.entity"
import { LanguageEntity } from "./language.entity"
import { BookEntity } from "./book.entity"

@Entity({ name: 'authors' })
export class AuthorEntity extends BaseEntity {
    @Column({ length: 100 })
    name: string

    @Column()
    birth_country_id: number
    
    @Column()
    native_language_id: number
    
    @Column({ type: 'enum', enum: StatusEnum })
    status: StatusType

    @ManyToOne(() => CountryEntity, (country) => country.authors)
    @JoinColumn({ name: 'birth_country_id', referencedColumnName: 'id' })
    birthCountry: CountryEntity

    @ManyToOne(() => LanguageEntity, (language) => language.authors)
    @JoinColumn({ name: 'native_language_id', referencedColumnName: 'id' })
    nativeLanguage: LanguageEntity

    @ManyToMany(() => BookEntity, (book) => book.authors)
    books: BookEntity[]
}