import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionAndPagesPropertiesToBookTable1744823734412 implements MigrationInterface {
    name = 'AddDescriptionAndPagesPropertiesToBookTable1744823734412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` ADD \`description\` varchar(500) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`books\` ADD \`pages\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`pages\``);
        await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`description\``);
    }

}
