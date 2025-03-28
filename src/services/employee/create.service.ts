import bcrypt from "bcrypt";
import { statusCode } from "../../utils/status.util";
import { retrieveIfUserExists } from "../../utils/user.util";
import { EmployeeEntity } from "./../../database/entities/entity/employee.entity";
import { CreateEmployeeDTO } from "./../../dto/employee.dto";
import { getFullDate } from "./../../utils/date.util";

export async function createEmployeeService({
  email,
  identification,
  password,
  entry_date,
  ...payload
}: CreateEmployeeDTO) {
  const foundEmployeeByUsername = (await retrieveIfUserExists(email));

  if (foundEmployeeByUsername)
    return Promise.reject({
      message: "Employee with this email already exists",
      status: statusCode.BAD_REQUEST,
    });

  const foundEmployeeByIdentification = (await retrieveIfUserExists("", identification));

  if (foundEmployeeByIdentification)
    return Promise.reject({
      message: "Employee with this identification already exists",
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
