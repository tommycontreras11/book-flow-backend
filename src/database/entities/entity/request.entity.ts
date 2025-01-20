import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm"
import { BaseEntity, StatusEnum, StatusType } from "../base/base.entity"
import { BookEntity } from "./book.entity"
import { UserEntity } from "./user.entity"
import { EmployeeEntity } from "./employee.entity"

export enum StatusRequestEnum {
    APPROVAL = 'APPROVAL',
    DENIED = 'DENIED'
  }
  
export type StatusRequestType = keyof typeof StatusEnum

@Entity({ name: 'requests' })
export class RequestEntity extends BaseEntity {
    @Column({ length: 100 })
    description: string

    @Column({ type: 'enum', enum: StatusEnum })
    state: StatusType

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
}