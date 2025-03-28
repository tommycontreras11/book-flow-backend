import { EmployeeEntity } from "./../../database/entities/entity/employee.entity";
import { UserEntity } from "../../database/entities/entity/user.entity";
import { UpdateUserDTO } from "../../dto/user.dto";
import { statusCode } from "../../utils/status.util";
import { retrieveIfUserExists } from "../../utils/user.util";
import bcrypt from "bcrypt";

export async function updateUserService(
  uuid: string,
  { email, password, identification, ...payload }: UpdateUserDTO
) {
  const user = await UserEntity.findOneBy({ uuid }).catch((e) => {
    console.error("UserEntity.findOneBy: ", e);
    return null;
  });

  if (!user)
    return Promise.reject({
      message: "User not found",
      status: statusCode.NOT_FOUND,
    });

const validateEmployeeByEmail = await Promise.all([
    retrieveIfUserExists(
      EmployeeEntity,
      email,
      null,
      uuid
    ),
    retrieveIfUserExists(
      UserEntity,
      email,
      null,
      uuid
    ),
  ]).then((users) => users.find((user) => user));

  if (validateEmployeeByEmail && uuid != validateEmployeeByEmail?.uuid)
    return Promise.reject({
      message: "Email already exists",
      status: statusCode.BAD_REQUEST,
    });

  const validateEmployeeByIdentification = await Promise.all([
    retrieveIfUserExists(
      EmployeeEntity,
      null,
      identification,
      uuid
    ),
    retrieveIfUserExists(
      UserEntity,
      null,
      identification,
      uuid
    ),
  ]).then((users) => users.find((user) => user));

  if (
    validateEmployeeByIdentification &&
    uuid != validateEmployeeByIdentification?.uuid
  )
    return Promise.reject({
      message: "Employee's identification already exists",
      status: statusCode.BAD_REQUEST,
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  await UserEntity.update(
    { uuid },
    { ...payload, email, password: hashedPassword, identification }
  ).catch((e) => {
    console.error("UserEntity.update: ", e);
    return null;
  });

  return "User updated successfully";
}
