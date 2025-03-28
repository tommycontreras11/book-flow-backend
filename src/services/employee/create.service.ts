import bcrypt from "bcrypt";
import { statusCode } from "../../utils/status.util";
import { retrieveIfUserExists } from "../../utils/user.util";
import { EmployeeEntity } from "./../../database/entities/entity/employee.entity";
import { CreateEmployeeDTO } from "./../../dto/employee.dto";
import { getFullDate } from "./../../utils/date.util";
import { UserEntity } from "./../../database/entities/entity/user.entity";

export async function createEmployeeService({
  email,
  identification,
  password,
  entry_date,
  ...payload
}: CreateEmployeeDTO) {
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

  await EmployeeEntity.create({
    email,
    identification,
    status: "ACTIVE",
    password: hashedPassword,
    entry_date: getFullDate(new Date(entry_date)),
    ...payload,
  })
    .save()
    .catch((e) => {
      console.error("EmployeeEntity.create: ", e);
      return null;
    });

  return "Employee created successfully";
}
