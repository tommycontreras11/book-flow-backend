import { EmployeeEntity } from "../../database/entities/entity/employee.entity";
import { statusCode } from "../../utils/statusCode";

export async function deleteEmployeeService(uuid: string) {
  const foundEmployee = await EmployeeEntity.findOneBy({ uuid }).catch((e) => {
    console.error("EmployeeEntity.findOneBy: ", e);
    return null;
  });

  if (!foundEmployee)
    return Promise.reject({
      message: "Employee not found",
      status: statusCode.NOT_FOUND,
    });

  await foundEmployee.softRemove().catch((e) => {
    console.error("EmployeeEntity.softRemove: ", e);
    return null;
  });

  return "Employee deleted successfully";
}
