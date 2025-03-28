import { UserEntity } from "./../../database/entities/entity/user.entity";
import { CreateUserDTO } from "./../../dto/user.dto";
import { statusCode } from "../../utils/status.util";
import { retrieveIfUserExists } from "../../utils/user.util";
import bcrypt from "bcrypt";
import { generateRandomCode } from "./../../utils/common.util";

export async function createUserService({
  email,
  identification,
  password,
  ...payload
}: CreateUserDTO) {
  const foundUserByEmail = (await retrieveIfUserExists(email));

  if (foundUserByEmail)
    return Promise.reject({
      message: "User with this email already exists",
      status: statusCode.BAD_REQUEST,
    });

  const foundUserByIdentification = (await retrieveIfUserExists("", identification));

  if (foundUserByIdentification)
    return Promise.reject({
      message: "User with this identification already exists",
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
