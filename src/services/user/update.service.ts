import { UserEntity } from "../../database/entities/entity/user.entity";
import { UpdateUserDTO } from "../../dto/user.dto";
import { statusCode } from "../../utils/status.util";
import { retrieveIfUserExists } from "../../utils/user.util";
import bcrypt from "bcrypt";

export async function updateUserService(
  uuid: string,
  { username, password, identification, ...payload }: UpdateUserDTO
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

  const validateUserByUsername = await retrieveIfUserExists(
    username,
    null,
    user.uuid
  );

  if (validateUserByUsername.user && !validateUserByUsername.sameUser)
    return Promise.reject({
      message: "User with this username already exists",
      status: statusCode.BAD_REQUEST,
    });

  const validateUserByIdentification = await retrieveIfUserExists(
    null,
    identification,
    user.uuid
  );

  if (
    validateUserByIdentification.user &&
    !validateUserByIdentification.sameUser
  )
    return Promise.reject({
      message: "User with this identification already exists",
      status: statusCode.BAD_REQUEST,
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  await UserEntity.update(
    { uuid },
    { ...payload, username, password: hashedPassword, identification }
  ).catch((e) => {
    console.error("UserEntity.update: ", e);
    return null;
  });

  return "User updated successfully";
}
