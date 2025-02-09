import { StatusEnum } from "./../../../database/entities/base/base.entity";
import { BibliographyTypeEntity } from "./../../../database/entities/entity/bibliography-type.entity";

const bibliographyTypes = [
    { name: "Annotated", status: "ACTIVE" },
    { name: "Analytical", status: "ACTIVE" },
    { name: "Descriptive", status: "ACTIVE" },
    { name: "Enumerative", status: "ACTIVE" },
    { name: "Historical", status: "ACTIVE" },
    { name: "Subject", status: "ACTIVE" },
    { name: "Period", status: "ACTIVE" },
    { name: "National", status: "ACTIVE" },
    { name: "Critical", status: "ACTIVE" },
    { name: "Personal", status: "ACTIVE" }
];

export const BibliographyTypeData: Partial<BibliographyTypeEntity>[] = bibliographyTypes.map((b) => ({
    name: b.name,
    status: b.status as StatusEnum
}))