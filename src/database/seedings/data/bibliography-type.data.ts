import { StatusEnum } from "./../../../database/entities/base/base.entity";
import { BibliographyTypeEntity } from "./../../../database/entities/entity/bibliography-type.entity";

const bibliographyTypes = [
    { description: "Annotated", status: "ACTIVE" },
    { description: "Analytical", status: "ACTIVE" },
    { description: "Descriptive", status: "ACTIVE" },
    { description: "Enumerative", status: "ACTIVE" },
    { description: "Historical", status: "ACTIVE" },
    { description: "Subject", status: "ACTIVE" },
    { description: "Period", status: "ACTIVE" },
    { description: "National", status: "ACTIVE" },
    { description: "Critical", status: "ACTIVE" },
    { description: "Personal", status: "ACTIVE" }
];

export const BibliographyTypeData: Partial<BibliographyTypeEntity>[] = bibliographyTypes.map((b) => ({
    description: b.description,
    status: b.status as StatusEnum
}))