import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { BaseEntity } from "../base/base.entity"
import { RequestEntity } from "./request.entity"

export enum LoanManagementEnum {
    'BORROWED' = 'BORROWED',
    'RETURNED' = 'RETURNED'
}

export type LoanManagementType = keyof typeof LoanManagementEnum

@Entity({ name: 'loan-managements' })
export class LoanManagementEntity extends BaseEntity {
    @Column({ length: 100 })
    loan_number: string

    @Column()
    date_loan: string

    @Column({ nullable: true })
    date_return: string

    @Column({ type: 'float', precision: 10, scale: 2 })
    amount_day: number

    @Column()
    quantity_day: number

    @Column({ length: 250, nullable: true })
    comment: string

    @Column()
    request_id: number

    @ManyToOne(() => RequestEntity, (request) => request.loanManagements)
    @JoinColumn({ name: 'request_id', referencedColumnName: 'id' })
    request: RequestEntity
 
    @Column({ type: 'enum', enum: LoanManagementEnum })
    status: LoanManagementType
}