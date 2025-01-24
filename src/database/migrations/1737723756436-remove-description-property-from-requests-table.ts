import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveDescriptionPropertyFromRequestsTable1737723756436 implements MigrationInterface {
    name = 'RemoveDescriptionPropertyFromRequestsTable1737723756436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`requests\` DROP COLUMN \`description\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`requests\` ADD \`description\` varchar(100) NOT NULL`);
    }

}
