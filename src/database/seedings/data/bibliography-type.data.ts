import { StatusEnum } from "./../../../database/entities/base/base.entity";
import { BibliographyTypeEntity } from "./../../../database/entities/entity/bibliography-type.entity";

const bibliographyTypes = [
    { description: "Annotated", state: "ACTIVE" },
    { description: "Analytical", state: "ACTIVE" },
    { description: "Descriptive", state: "ACTIVE" },
    { description: "Enumerative", state: "ACTIVE" },
    { description: "Historical", state: "ACTIVE" },
    { description: "Subject", state: "ACTIVE" },
    { description: "Period", state: "ACTIVE" },
    { description: "National", state: "ACTIVE" },
    { description: "Critical", state: "ACTIVE" },
    { description: "Personal", state: "ACTIVE" }
];

export const BibliographyTypeData: Partial<BibliographyTypeEntity>[] = bibliographyTypes.map((b) => ({
    description: b.description,
    state: b.state as StatusEnum
}))