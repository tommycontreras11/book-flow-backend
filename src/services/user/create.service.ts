import { UserEntity } from "./../../database/entities/entity/user.entity";
import { CreateUserDTO } from "./../../dto/user.dto";
import { statusCode } from "../../utils/status.util";
import { retrieveIfUserExists } from "../../utils/user.util";
import bcrypt from "bcrypt";
import { generateRandomCode } from "./../../utils/common.util";

export async function createUserService({
  username,
  identification,
  password,
  ...payload
}: CreateUserDTO) {
  const foundUserByUsername = (await retrieveIfUserExists(username))?.user;

  if (foundUserByUsername)
    return Promise.reject({
      message: "User with this username already exists",
      status: statusCode.BAD_REQUEST,
    });

  const foundUserByIdentification = (await retrieveIfUserExists("", identification))
    ?.user;

  if (foundUserByIdentification)
    return Promise.reject({
      message: "User with this identification already exists",
      status: statusCode.BAD_REQUEST,
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  await UserEntity.create({
    username,
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
