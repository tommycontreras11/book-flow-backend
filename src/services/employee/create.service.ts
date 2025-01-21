import bcrypt from "bcrypt";
import { statusCode } from "../../utils/statusCode";
import { retrieveIfUserExists } from "../../utils/userUtil";
import { EmployeeEntity } from "./../../database/entities/entity/employee.entity";
import { CreateEmployeeDTO } from "./../../dto/employee.dto";

export async function createEmployeeService({
  username,
  identification,
  password,
  ...payload
}: CreateEmployeeDTO) {
  const foundUserByUsername = (await retrieveIfUserExists(username)).user;

  if (foundUserByUsername)
    return Promise.reject({
      message: "Employee with this username already exists",
      status: statusCode.BAD_REQUEST,
    });

  const foundUserByIdentification = (await retrieveIfUserExists("", identification))
    .user;

  if (foundUserByIdentification)
    return Promise.reject({
      message: "Employee with this identification already exists",
      status: statusCode.BAD_REQUEST,
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  await EmployeeEntity.create({
    username,
    identification,
    state: "ACTIVE",
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
