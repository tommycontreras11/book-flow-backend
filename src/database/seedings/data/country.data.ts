import { CountryEntity } from "./../../../database/entities/entity/country.entity";

const countries = [
    "United States",
    "Spain",
    "France",
    "Germany",
    "China",
    "Japan",
    "Russia",
    "Portugal",
    "Italy",
    "South Korea"
];

export const CountryData: Partial<CountryEntity>[] = countries.map((country) => ({
    name: country
}));
