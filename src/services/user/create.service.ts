import { UserEntity } from "./../../database/entities/entity/user.entity";
import { CreateUserDTO } from "./../../dto/user.dto";
import { statusCode } from "./../../utils/statusCode";
import { retrieveIfUserExists } from "./../../utils/userUtil";
import bcrypt from "bcrypt";

export async function createUserService({
  username,
  password,
  ...payload
}: CreateUserDTO) {
  const foundUser = (await retrieveIfUserExists(username)).user;

  if (foundUser)
    return Promise.reject({
      message: "User with this username already exists",
      status: statusCode.BAD_REQUEST,
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  await UserEntity.create({
    username,
    state: "ACTIVE",
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
