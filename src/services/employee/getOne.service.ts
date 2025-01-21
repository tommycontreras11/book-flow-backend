import { EmployeeEntity } from "./../../database/entities/entity/employee.entity";
import { FindOneOptions } from "typeorm";
import { statusCode } from "../../utils/statusCode";

export async function getOneEmployeeService(options: FindOneOptions<EmployeeEntity>) {
  const employee = await EmployeeEntity.findOne(options).catch((e) => {
    console.error("EmployeeEntity.findOne: ", e);
    return null;
  });

  if (!employee)
    return Promise.reject({
      message: "Employee not found",
      status: statusCode.NOT_FOUND,
    });

  return employee;
}
