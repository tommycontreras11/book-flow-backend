import { Column, Entity, OneToMany } from "typeorm"
import { BaseEntity, StatusEnum, StatusType } from "../base/base.entity"
import { RequestEntity } from "./request.entity"
import { LoanManagementEntity } from "./loan-management.entity"

export enum PersonTypeEnum {
    NATURAL = 'NATURAL',
    LEGAL = 'LEGAL'
}

export type PersonType = keyof typeof PersonTypeEnum

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @Column({ length: 100 })
    name: string

    @Column({ length: 100 })
    username: string

    @Column({ length: 100 })
    password: string

    @Column({ length: 100 })
    identification: string

    @Column({ length: 100 })
    carnet_number: string
   
    @Column({ type: 'enum', enum: PersonTypeEnum })
    person_type: PersonType
 
    @Column({ type: 'enum', enum: StatusEnum })
    status: StatusType
    
    @OneToMany(() => RequestEntity, (request) => request.user)
    requests: RequestEntity[]
    
    @OneToMany(() => LoanManagementEntity, (loan) => loan.user)
    loansManagement: LoanManagementEntity[]
}