import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFilenamePropertyToBookTable1739492035269 implements MigrationInterface {
    name = 'AddFilenamePropertyToBookTable1739492035269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` ADD \`file_name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`file_name\``);
    }

}
