import { UserEntity } from "./../../database/entities/entity/user.entity";
import { CreateUserDTO } from "./../../dto/user.dto";
import { statusCode } from "../../utils/status.util";
import { retrieveIfUserExists } from "../../utils/user.util";
import bcrypt from "bcrypt";
import { generateRandomCode } from "./../../utils/common.util";
import { EmployeeEntity } from "./../../database/entities/entity/employee.entity";

export async function createUserService({
  email,
  identification,
  password,
  ...payload
}: CreateUserDTO) {
  const foundEmployeeByEmail = await Promise.all([
    retrieveIfUserExists(EmployeeEntity, email),
    retrieveIfUserExists(UserEntity, email),
  ]).then((users) => users.find((user) => user));
  
  if (foundEmployeeByEmail)
    return Promise.reject({
      message: "Email already exists",
      status: statusCode.BAD_REQUEST,
    });

  const foundEmployeeByIdentification = await Promise.all([
    retrieveIfUserExists(EmployeeEntity, "", identification),
    retrieveIfUserExists(UserEntity, "", identification),
  ]).then((users) => users.find((user) => user));

  if (foundEmployeeByIdentification)
    return Promise.reject({
      message: "Identification already exists",
      status: statusCode.BAD_REQUEST,
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  await UserEntity.create({
    email,
    identification,
    carnet_number: generateRandomCode("CAR"),
    status: "ACTIVE",
    password: hashedPassword,
    ...payload,
  })
    .save()
    .catch((e) => {
      console.error("UserEntity.create: ", e);
      return null;
    });

  return "User created successfully";
}
