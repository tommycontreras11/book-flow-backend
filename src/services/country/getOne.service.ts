import { CountryEntity } from "../../database/entities/entity/country.entity";
import { FindOneOptions } from "typeorm";
import { statusCode } from "../../utils/status.util";

export async function getOneCountryService(options: FindOneOptions<CountryEntity>) {
  const country = await CountryEntity.findOne(options).catch((e) => {
    console.error("CountryEntity.findOne: ", e);
    return null;
  });

  if (!country)
    return Promise.reject({
      message: "Country not found",
      status: statusCode.NOT_FOUND,
    });

  return country;
}
