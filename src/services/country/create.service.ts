import { statusCode } from "../../utils/status.util";
import { CountryEntity } from "./../../database/entities/entity/country.entity";
import { CreateCountryDTO } from "./../../dto/country.dto";

export async function createCountryService({ name }: CreateCountryDTO) {
  const foundCountry = await CountryEntity.findOneBy({ name }).catch((e) => {
    console.error("CountryEntity.findOneBy: ", e);
    return null;
  });

  if (foundCountry)
    return Promise.reject({
      message: "Country's name already exists",
      status: statusCode.BAD_REQUEST,
    });

  await CountryEntity.create({
    name,
    status: "ACTIVE",
  })
    .save()
    .catch((e) => {
      console.error("CountryEntity.create: ", e);
      return null;
    });

  return "Country created successfully";
}
