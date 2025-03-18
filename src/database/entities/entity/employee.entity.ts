import { Column, Entity, ManyToMany } from "typeorm"
import { BaseEntity, StatusEnum, StatusType } from "../base/base.entity"
import { RequestEntity } from "./request.entity"

export enum WorkShiftEnum {
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON',
  NIGHT = 'NIGHT'
}

export type WorkShiftType = keyof typeof WorkShiftEnum

@Entity({ name: 'employees' })
export class EmployeeEntity extends BaseEntity {
    @Column({ length: 100 })
    name: string

    @Column({ length: 100 })
    email: string

    @Column({ length: 100 })
    password: string

    @Column({ length: 100 })
    identification: string

    @Column({ type: 'enum', enum: WorkShiftEnum })
    work_shift: WorkShiftType

    @Column({ type: 'float', precision: 10, scale: 2 })
    commission_percentage: number

    @Column()
    entry_date: string
    
    @Column({ type: 'enum', enum: StatusEnum })
    status: StatusType

    @ManyToMany(() => RequestEntity, (request) => request.employees)
    requests: RequestEntity[]
}