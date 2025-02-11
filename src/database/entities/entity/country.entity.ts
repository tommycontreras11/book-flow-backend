import { Column, Entity, OneToMany } from "typeorm"
import { BaseEntity, StatusEnum, StatusType } from "../base/base.entity"
import { AuthorEntity } from "./author.entity"

@Entity({ name: 'countries' })
export class CountryEntity extends BaseEntity {
    @Column({ length: 100 })
    name: string

    @Column({ type: 'enum', enum: StatusEnum })
    status: StatusType

    @OneToMany(() => AuthorEntity, (author) => author.birthCountry)
    authors: AuthorEntity[]
}