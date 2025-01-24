import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm"
import { BaseEntity } from "../base/base.entity"
import { BookEntity } from "./book.entity"
import { EmployeeEntity } from "./employee.entity"
import { LoanManagementEntity } from "./loan-management.entity"
import { UserEntity } from "./user.entity"

export enum StatusRequestEnum {
    APPROVAL = 'APPROVAL',
    DENIED = 'DENIED',
    PENDING = 'PENDING'
  }
  
export type StatusRequestType = keyof typeof StatusRequestEnum

@Entity({ name: 'requests' })
export class RequestEntity extends BaseEntity {
    @Column({ type: 'enum', enum: StatusRequestEnum })
    status: StatusRequestType

    @Column()
    user_id: number

    @Column()
    book_id: number

    @ManyToOne(() => BookEntity, (book) => book.requests)
    @JoinColumn({ name: 'book_id', referencedColumnName: 'id' })
    book: BookEntity

    @ManyToOne(() => UserEntity, (user) => user.requests)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: UserEntity

    @ManyToMany(() => EmployeeEntity, (employee) => employee.requests)
    @JoinTable({
      name: 'request-employees',
      joinColumn: {
        name: 'requestId',
        referencedColumnName: 'id'
      },
      inverseJoinColumn: {
        name: 'employeeId',
        referencedColumnName: 'id'
      }
    })
    employees: EmployeeEntity[]

    @OneToMany(() => LoanManagementEntity, (loanManagement) => loanManagement.request)
    loanManagements: LoanManagementEntity[]
}