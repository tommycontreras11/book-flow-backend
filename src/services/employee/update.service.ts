import bcrypt from "bcrypt";
import { statusCode } from "../../utils/status.util";
import { retrieveIfUserExists } from "../../utils/user.util";
import { EmployeeEntity } from "../../database/entities/entity/employee.entity";
import { UpdateEmployeeDTO } from "../../dto/employee.dto";

export async function updateEmployeeService(
  uuid: string,
  { email, password, identification, ...payload }: UpdateEmployeeDTO
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

  const validateUserByUsername = await retrieveIfUserExists(
    email,
    null,
    employee.uuid
  );

  if (validateUserByUsername && employee.uuid != validateUserByUsername?.uuid)
    return Promise.reject({
      message: "User with this email already exists",
      status: statusCode.BAD_REQUEST,
    });

  const validateUserByIdentification = await retrieveIfUserExists(
    null,
    identification,
    employee.uuid
  );

  if (
    validateUserByIdentification &&
    employee.uuid != validateUserByIdentification?.uuid
  )
    return Promise.reject({
      message: "User with this identification already exists",
      status: statusCode.BAD_REQUEST,
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  await EmployeeEntity.update(
    { uuid },
    { ...payload, email, password: hashedPassword, identification }
  ).catch((e) => {
    console.error("EmployeeEntity.update: ", e);
    return null;
  });

  return "Employee updated successfully";
}
