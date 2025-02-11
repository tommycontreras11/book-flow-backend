import { statusCode } from "../../utils/status.util";
import { CountryEntity } from "./../../database/entities/entity/country.entity";

export async function deleteCountryService(uuid: string) {
  const foundCountry = await CountryEntity.findOneBy({ uuid }).catch((e) => {
    console.error("CountryEntity.findOneBy: ", e);
    return null;
  });

  if (!foundCountry)
    return Promise.reject({
      message: "Country not found",
      status: statusCode.NOT_FOUND,
    });

  await foundCountry.softRemove().catch((e) => {
    console.error("CountryEntity.softRemove: ", e);
    return null;
  });

  return "Country deleted successfully";
}
