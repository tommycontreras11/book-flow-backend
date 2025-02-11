import { StatusEnum } from "./../../../database/entities/base/base.entity";
import { CountryEntity } from "./../../../database/entities/entity/country.entity";

const countries = [
  { name: "United States", status: StatusEnum.ACTIVE },
  { name: "Spain", status: StatusEnum.ACTIVE },
  { name: "France", status: StatusEnum.ACTIVE },
  { name: "Germany", status: StatusEnum.ACTIVE },
  { name: "China", status: StatusEnum.ACTIVE },
  { name: "Japan", status: StatusEnum.ACTIVE },
  { name: "Russia", status: StatusEnum.ACTIVE },
  { name: "Portugal", status: StatusEnum.ACTIVE },
  { name: "Italy", status: StatusEnum.ACTIVE },
  { name: "South Korea", status: StatusEnum.ACTIVE },
];

export const CountryData: Partial<CountryEntity>[] = countries.map(
  (country) => ({
    name: country.name,
    status: country.status,
  })
);
