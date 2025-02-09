import { ScienceEntity } from "./../../../database/entities/entity/science.entity";

const sciences = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "History",
    "Computer Science",
    "Economics",
    "Biology",
    "Astronomy",
    "Psychology",
    "Environmental Science"
];

export const ScienceData: Partial<ScienceEntity>[] = sciences.map((science) => ({
    name: science
}));
