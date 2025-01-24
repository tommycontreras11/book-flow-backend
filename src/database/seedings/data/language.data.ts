import { LanguageEntity } from "./../../../database/entities/entity/language.entity";
import { StatusEnum } from "./../../../database/entities/base/base.entity";

const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Russian",
    "Portuguese",
    "Italian",
    "Korean"
];

export const LanguageData: Partial<LanguageEntity>[] = languages.map((language) => ({
    description: language,
    status: "ACTIVE" as StatusEnum
}));
