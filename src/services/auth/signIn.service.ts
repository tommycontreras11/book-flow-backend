import bcrypt from "bcrypt";
import { SignInDTO } from "./../../dto/auth.dto";
import { statusCode } from "./../../utils/status.util";
import { retrieveIfUserExists } from "./../../utils/user.util";

export async function signInService({ email, password }: SignInDTO) {
  const foundUserByEmail = await retrieveIfUserExists(email);

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
