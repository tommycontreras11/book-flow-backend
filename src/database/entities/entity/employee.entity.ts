import { Column, Entity, ManyToMany, OneToMany } from "typeorm"
import { BaseEntity, StatusEnum, StatusType } from "../base/base.entity"
import { RequestEntity } from "./request.entity"
import { LoanManagementEntity } from "./loan-management.entity"

@Entity({ name: 'employees' })
export class EmployeeEntity extends BaseEntity {
    @Column({ length: 100 })
    name: string

    @Column({ length: 100 })
    username: string

    @Column({ length: 100 })
    password: string

    @Column({ length: 100 })
    identification: string

    @Column()
    work_shift: string

    @Column({ type: 'float', precision: 10, scale: 2 })
    commission_percentage: number

    @Column()
    entry_date: string
    
    @Column({ type: 'enum', enum: StatusEnum })
    status: StatusType

    @ManyToMany(() => RequestEntity, (request) => request.employees)
    requests: RequestEntity[]

    @OneToMany(() => LoanManagementEntity, (loan) => loan.employee)
    loansManagement: LoanManagementEntity[]
}