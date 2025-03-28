import { UserEntity } from "../../database/entities/entity/user.entity";
import { UpdateUserDTO } from "../../dto/user.dto";
import { statusCode } from "../../utils/status.util";
import { retrieveIfUserExists } from "../../utils/user.util";
import bcrypt from "bcrypt";

export async function updateUserService(
  uuid: string,
  { email, password, identification, ...payload }: UpdateUserDTO
) {
  const user = await UserEntity.findOneBy({ uuid }).catch((e) => {
    console.error("UserEntity.findOneBy: ", e);
    return null;
  });

  if (!user)
    return Promise.reject({
      message: "User not found",
      status: statusCode.NOT_FOUND,
    });

  const validateUserByEmail = await retrieveIfUserExists(
    email,
    null,
    user.uuid
  );

  if (validateUserByEmail && user.uuid !== validateUserByEmail?.uuid)
    return Promise.reject({
      message: "User with this email already exists",
      status: statusCode.BAD_REQUEST,
    });

  const validateUserByIdentification = await retrieveIfUserExists(
    null,
    identification,
    user.uuid
  );

  if (
    validateUserByIdentification &&
    user.uuid !== validateUserByIdentification?.uuid
  )
    return Promise.reject({
      message: "User with this identification already exists",
      status: statusCode.BAD_REQUEST,
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  await UserEntity.update(
    { uuid },
    { ...payload, email, password: hashedPassword, identification }
  ).catch((e) => {
    console.error("UserEntity.update: ", e);
    return null;
  });

  return "User updated successfully";
}
