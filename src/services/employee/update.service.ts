import bcrypt from "bcrypt";
import { statusCode } from "../../utils/statusCode";
import { retrieveIfUserExists } from "../../utils/userUtil";
import { EmployeeEntity } from "../../database/entities/entity/employee.entity";
import { UpdateEmployeeDTO } from "../../dto/employee.dto";

export async function updateEmployeeService(
  uuid: string,
  { username, password, identification, ...payload }: UpdateEmployeeDTO
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
    username,
    null,
    employee.uuid
  );

  if (validateUserByUsername.user && !validateUserByUsername.sameUser)
    return Promise.reject({
      message: "User with this username already exists",
      status: statusCode.BAD_REQUEST,
    });

  const validateUserByIdentification = await retrieveIfUserExists(
    null,
    identification,
    employee.uuid
  );

  if (
    validateUserByIdentification.user &&
    !validateUserByIdentification.sameUser
  )
    return Promise.reject({
      message: "User with this identification already exists",
      status: statusCode.BAD_REQUEST,
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  await EmployeeEntity.update(
    { uuid },
    { ...payload, username, password: hashedPassword, identification }
  ).catch((e) => {
    console.error("EmployeeEntity.update: ", e);
    return null;
  });

  return "Employee updated successfully";
}
