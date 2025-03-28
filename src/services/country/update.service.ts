import { Not } from "typeorm";
import { statusCode } from "../../utils/status.util";
import { CountryEntity } from "./../../database/entities/entity/country.entity";
import { UpdateCountryDTO } from "./../../dto/country.dto";

export async function updateCountryService(
  uuid: string,
  { name, status }: UpdateCountryDTO
) {
  const country = await CountryEntity.findBy({ uuid }).catch((e) => {
    console.error("CountryEntity.findBy: ", e);
    return null;
  });

  if (!country)
    return Promise.reject({
      message: "Country not found",
      status: statusCode.NOT_FOUND,
    });

  if (name) {
    const findCountryByName = await CountryEntity.findOne({
      where: { name, uuid: Not(uuid) },
    }).catch((e) => {
      console.error("CountryEntity.findOne: ", e);
      return null;
    });

    if (findCountryByName)
      return Promise.reject({
        message: "Country's name already exists",
        status: statusCode.BAD_REQUEST,
      });
  }

  await CountryEntity.update(
    { uuid },
    {
      ...(name && { name }),
      ...(status && { status }),
    }
  ).catch((e) => {
    console.error("CountryEntity.update: ", e);
    return null;
  });

  return "Country updated successfully";
}
