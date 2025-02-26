import bcrypt from 'bcrypt';
import { StatusEnum } from "./../../../database/entities/base/base.entity";
import { EmployeeEntity } from "./../../../database/entities/entity/employee.entity";

const employees = [
    {
        name: "Adonaiby Nuñez",
        email: "adonaiby20@gmail.com",
        password: bcrypt.hashSync('admin', 10),
        identification: "402-1565254-8",
        work_shift: "Morning",
        commission_percentage: 10.5,
        entry_date: "2023-01-15",
        status: StatusEnum.ACTIVE
    }
];

export const EmployeeData: Partial<EmployeeEntity>[] = employees.map((employee) => ({
    name: employee.name,
    email: employee.email,
    password: employee.password,
    identification: employee.identification,
    work_shift: employee.work_shift,
    commission_percentage: employee.commission_percentage,
    entry_date: employee.entry_date,
    status: employee.status
}));