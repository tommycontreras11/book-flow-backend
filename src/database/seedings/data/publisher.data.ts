import { StatusEnum } from "./../../../database/entities/base/base.entity";
import { PublisherEntity } from "./../../../database/entities/entity/publisher.entity";

const bookPublishers = [
    { name: "Penguin Random House", status: "ACTIVE" },
    { name: "HarperCollins", status: "ACTIVE" },
    { name: "Macmillan Publishers", status: "ACTIVE" },
    { name: "Simon & Schuster", status: "ACTIVE" },
    { name: "Hachette Livre", status: "ACTIVE" },
    { name: "Scholastic", status: "ACTIVE" },
    { name: "Pearson", status: "ACTIVE" },
    { name: "Cengage Learning", status: "ACTIVE" },
    { name: "Springer Nature", status: "ACTIVE" },
    { name: "Oxford University Press", status: "ACTIVE" }
];

export const PublisherData: Partial<PublisherEntity>[] = bookPublishers.map((publisher) => ({
    name: publisher.name,
    status: publisher.status as StatusEnum
}));
