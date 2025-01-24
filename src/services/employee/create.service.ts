import bcrypt from "bcrypt";
import { statusCode } from "../../utils/status.util";
import { retrieveIfUserExists } from "../../utils/user.util";
import { EmployeeEntity } from "./../../database/entities/entity/employee.entity";
import { CreateEmployeeDTO } from "./../../dto/employee.dto";

export async function createEmployeeService({
  username,
  identification,
  password,
  ...payload
}: CreateEmployeeDTO) {
  const foundEmployeeByUsername = (await retrieveIfUserExists(username)).user;

  if (foundEmployeeByUsername)
    return Promise.reject({
      message: "Employee with this username already exists",
      status: statusCode.BAD_REQUEST,
    });

  const foundEmployeeByIdentification = (await retrieveIfUserExists("", identification))
    .user;

  if (foundEmployeeByIdentification)
    return Promise.reject({
      message: "Employee with this identification already exists",
      status: statusCode.BAD_REQUEST,
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  await EmployeeEntity.create({
    username,
    identification,
    status: "ACTIVE",
    password: hashedPassword,
    ...payload,
  })
    .save()
    .catch((e) => {
      console.error("EmployeeEntity.create: ", e);
      return null;
    });

  return "Employee created successfully";
}
