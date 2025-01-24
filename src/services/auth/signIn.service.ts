import bcrypt from "bcrypt";
import { SignInDTO } from "./../../dto/auth.dto";
import { statusCode } from "./../../utils/status.util";
import { retrieveUserByUsername } from "./../../utils/user.util";

export async function signInService({ username, password }: SignInDTO) {
  const foundUserByUsername = await retrieveUserByUsername(username);

  if (!foundUserByUsername)
    return Promise.reject({
      message: "User or password invalid",
      status: statusCode.BAD_REQUEST,
    });

  const comparePasswords = await bcrypt.compare(
    password,
    foundUserByUsername.password
  );

  if (!comparePasswords)
    return Promise.reject({
      message: "User or password invalid",
      status: statusCode.BAD_REQUEST,
    });

  return Promise.resolve(foundUserByUsername);
}
