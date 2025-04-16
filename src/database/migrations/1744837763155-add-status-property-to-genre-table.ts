import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusPropertyToGenreTable1744837763155 implements MigrationInterface {
    name = 'AddStatusPropertyToGenreTable1744837763155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`genres\` ADD \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`genres\` DROP COLUMN \`status\``);
    }

}
