import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { BaseEntity } from "../base/base.entity"
import { BookEntity } from "./book.entity"
import { EmployeeEntity } from "./employee.entity"
import { UserEntity } from "./user.entity"

export enum LoanManagementEnum {
    'BORROWED' = 'BORROWED',
    'RETURNED' = 'RETURNED'
}

export type LoanManagementType = keyof typeof LoanManagementEnum

@Entity({ name: 'loans-management' })
export class LoanManagementEntity extends BaseEntity {
    @Column({ length: 100 })
    loan_number: string

    @Column()
    date_loan: string

    @Column()
    date_return: string

    @Column({ type: 'float', precision: 10, scale: 2 })
    amount_day: number

    @Column()
    quantity_day: number

    @Column({ length: 250 })
    comment: string

    @Column()
    employee_id: string

    @Column()
    book_id: string

    @Column()
    user_id: string

    @ManyToOne(() => EmployeeEntity, (employee) => employee.loansManagement)
    @JoinColumn({ name: 'employee_id', referencedColumnName: 'id' })
    employee: EmployeeEntity

    @ManyToOne(() => BookEntity, (book) => book.loansManagement)
    @JoinColumn({ name: 'book_id', referencedColumnName: 'id' })
    book: BookEntity

    @ManyToOne(() => UserEntity, (user) => user.loansManagement)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: UserEntity
 
    @Column({ type: 'enum', enum: LoanManagementEnum })
    state: LoanManagementType
}