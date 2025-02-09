import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameDescriptionPropertyToName1739115004278 implements MigrationInterface {
    name = 'RenameDescriptionPropertyToName1739115004278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`languages\` CHANGE \`description\` \`name\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`bibliography-types\` CHANGE \`description\` \`name\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`publishers\` CHANGE \`description\` \`name\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sciences\` CHANGE \`description\` \`name\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`books\` CHANGE \`description\` \`name\` varchar(250) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` CHANGE \`name\` \`description\` varchar(250) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sciences\` CHANGE \`name\` \`description\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`publishers\` CHANGE \`name\` \`description\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`bibliography-types\` CHANGE \`name\` \`description\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`languages\` CHANGE \`name\` \`description\` varchar(100) NOT NULL`);
    }

}
