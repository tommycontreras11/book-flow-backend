import bcrypt from "bcrypt";
import { SignInDTO } from "./../../dto/auth.dto";
import { statusCode } from "./../../utils/status.util";
import { retrieveIfUserExists } from "./../../utils/user.util";
import { UserEntity } from "./../../database/entities/entity/user.entity";
import { EmployeeEntity } from "./../../database/entities/entity/employee.entity";

export async function signInService({ email, password }: SignInDTO) {
  const foundUserByEmail = await Promise.all([
    retrieveIfUserExists(UserEntity, email),
    retrieveIfUserExists(EmployeeEntity, email),
  ]).then((users) => users.find((user) => user));

  if (!foundUserByEmail)
    return Promise.reject({
      message: "Email or password invalid",
      status: statusCode.BAD_REQUEST,
    });

  const comparePasswords = await bcrypt.compare(
    password,
    foundUserByEmail.password
  );

  if (!comparePasswords)
    return Promise.reject({
      message: "Email or password invalid",
      status: statusCode.BAD_REQUEST,
    });

  return Promise.resolve(foundUserByEmail);
}
