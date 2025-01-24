import { StatusEnum } from "./../../../database/entities/base/base.entity";
import { PublisherEntity } from "./../../../database/entities/entity/publisher.entity";

const bookPublishers = [
    { description: "Penguin Random House", status: "ACTIVE" },
    { description: "HarperCollins", status: "ACTIVE" },
    { description: "Macmillan Publishers", status: "ACTIVE" },
    { description: "Simon & Schuster", status: "ACTIVE" },
    { description: "Hachette Livre", status: "ACTIVE" },
    { description: "Scholastic", status: "ACTIVE" },
    { description: "Pearson", status: "ACTIVE" },
    { description: "Cengage Learning", status: "ACTIVE" },
    { description: "Springer Nature", status: "ACTIVE" },
    { description: "Oxford University Press", status: "ACTIVE" }
];

export const PublisherData: Partial<PublisherEntity>[] = bookPublishers.map((publisher) => ({
    description: publisher.description,
    status: publisher.status as StatusEnum
}));
