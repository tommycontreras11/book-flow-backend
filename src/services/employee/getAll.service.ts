import { EmployeeEntity } from "./../../database/entities/entity/employee.entity";
import { FindManyOptions } from "typeorm";
import { statusCode } from "../../utils/statusCode";

export async function getAllEmployeeService(options: FindManyOptions<EmployeeEntity>) {
  const employee = await EmployeeEntity.find(options).catch((e) => {
    console.error("EmployeeEntity.find: ", e);
    return null;
  });

  if (!employee)
    return Promise.reject({
      message: "Employees not found",
      status: statusCode.NOT_FOUND,
    });

  return employee;
}
