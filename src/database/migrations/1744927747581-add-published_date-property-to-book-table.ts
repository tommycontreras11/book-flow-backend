import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPublishedDatePropertyToBookTable1744927747581 implements MigrationInterface {
    name = 'AddPublishedDatePropertyToBookTable1744927747581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` CHANGE \`publication_year\` \`published_date\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`published_date\``);
        await queryRunner.query(`ALTER TABLE \`books\` ADD \`published_date\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`published_date\``);
        await queryRunner.query(`ALTER TABLE \`books\` ADD \`published_date\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`books\` CHANGE \`published_date\` \`publication_year\` int NOT NULL`);
    }

}
