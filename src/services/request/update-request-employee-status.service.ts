import { EmployeeEntity } from "../../database/entities/entity/employee.entity";
import { RequestEntity } from "../../database/entities/entity/request.entity";
import { statusCode } from "../../utils/status.util";
import { UpdateRequestEmployeeStatusDTO } from "../../dto/request.dto";

export async function updateRequestEmployeeStatusService(
  requestUUID: string,
  employeeUUID: string,
  { status }: UpdateRequestEmployeeStatusDTO
) {
  const foundRequest = await RequestEntity.findOneBy({
    uuid: requestUUID,
  }).catch((e) => {
    console.error("RequestEntity.findOneBy: ", e);
    return null;
  });

  if (!foundRequest)
    return Promise.reject({
      message: "Request not found",
      status: statusCode.BAD_REQUEST,
    });

  const foundEmployee = await EmployeeEntity.findOneBy({
    uuid: employeeUUID,
  }).catch((e) => {
    console.error("EmployeeEntity.findOneBy: ", e);
    return null;
  });

  if (!foundEmployee)
    return Promise.reject({
      message: "Employee not found",
      status: statusCode.NOT_FOUND,
    });

  foundRequest.status = status;
  foundRequest.employees = [foundEmployee];
  await foundRequest.save().catch((e) => {
    console.error("RequestEntity.save: ", e);
    return null;
  });

  return "Request employee status updated successfully";
}
