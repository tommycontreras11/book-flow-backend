import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusPropertyToCountryTable1739233387653 implements MigrationInterface {
    name = 'AddStatusPropertyToCountryTable1739233387653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`countries\` ADD \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`countries\` DROP COLUMN \`status\``);
    }

}
