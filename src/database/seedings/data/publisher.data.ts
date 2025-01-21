import { StatusEnum } from "./../../../database/entities/base/base.entity";
import { PublisherEntity } from "./../../../database/entities/entity/publisher.entity";

const bookPublishers = [
    { description: "Penguin Random House", state: "ACTIVE" },
    { description: "HarperCollins", state: "ACTIVE" },
    { description: "Macmillan Publishers", state: "ACTIVE" },
    { description: "Simon & Schuster", state: "ACTIVE" },
    { description: "Hachette Livre", state: "ACTIVE" },
    { description: "Scholastic", state: "ACTIVE" },
    { description: "Pearson", state: "ACTIVE" },
    { description: "Cengage Learning", state: "ACTIVE" },
    { description: "Springer Nature", state: "ACTIVE" },
    { description: "Oxford University Press", state: "ACTIVE" }
];

export const PublisherData: Partial<PublisherEntity>[] = bookPublishers.map((publisher) => ({
    description: publisher.description,
    state: publisher.state as StatusEnum
}));
