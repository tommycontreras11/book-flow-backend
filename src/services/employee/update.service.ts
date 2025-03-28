import bcrypt from "bcrypt";
import { statusCode } from "../../utils/status.util";
import { retrieveIfUserExists } from "../../utils/user.util";
import { EmployeeEntity } from "../../database/entities/entity/employee.entity";
import { UpdateEmployeeDTO } from "../../dto/employee.dto";
import { UserEntity } from "./../../database/entities/entity/user.entity";
import { getFullDate } from "./../../utils/date.util";

export async function updateEmployeeService(
  uuid: string,
  { email, password, identification, entry_date, ...payload }: UpdateEmployeeDTO
) {
  const employee = await EmployeeEntity.findOneBy({ uuid }).catch((e) => {
    console.error("EmployeeEntity.findOneBy: ", e);
    return null;
  });

  if (!employee)
    return Promise.reject({
      message: "EmployeeEntity not found",
      status: statusCode.NOT_FOUND,
    });

  const validateEmployeeByEmail = await Promise.all([
    retrieveIfUserExists(EmployeeEntity, email, null, uuid),
    retrieveIfUserExists(UserEntity, email, null, uuid),
  ]).then((users) => users.find((user) => user));

  if (validateEmployeeByEmail && uuid != validateEmployeeByEmail?.uuid)
    return Promise.reject({
      message: "Email already exists",
      status: statusCode.BAD_REQUEST,
    });

  const validateEmployeeByIdentification = await Promise.all([
    retrieveIfUserExists(EmployeeEntity, null, identification, uuid),
    retrieveIfUserExists(UserEntity, null, identification, uuid),
  ]).then((users) => users.find((user) => user));

  if (
    validateEmployeeByIdentification &&
    uuid != validateEmployeeByIdentification?.uuid
  )
    return Promise.reject({
      message: "Employee's identification already exists",
      status: statusCode.BAD_REQUEST,
    });

  await EmployeeEntity.update(
    { uuid },
    {
      ...payload,
      ...(email && { email }),
      ...(password && {
        password: await bcrypt.hash(password, 10),
        ...(entry_date && { entry_date: getFullDate(new Date(entry_date)) }),
      }),
    }
  ).catch((e) => {
    console.error("EmployeeEntity.update: ", e);
    return null;
  });

  return "Employee updated successfully";
}
