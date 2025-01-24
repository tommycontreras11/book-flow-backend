import { CountryEntity } from "../../database/entities/entity/country.entity";
import { FindManyOptions } from "typeorm";
import { statusCode } from "../../utils/status.util";

export async function getAllCountryService(options: FindManyOptions<CountryEntity>) {
  const countries = await CountryEntity.find(options).catch((e) => {
    console.error("CountryEntity.find: ", e);
    return null;
  });

  if (!countries)
    return Promise.reject({
      message: "Countries not found",
      status: statusCode.NOT_FOUND,
    });

  return countries;
}
