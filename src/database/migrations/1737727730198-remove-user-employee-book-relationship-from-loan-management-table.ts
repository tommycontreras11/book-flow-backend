import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUserEmployeeBookRelationshipFromLoanManagementTable1737727730198 implements MigrationInterface {
    name = 'RemoveUserEmployeeBookRelationshipFromLoanManagementTable1737727730198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`loans-management\` DROP FOREIGN KEY \`FK_8cf182dd8e210940169a69b4ad8\``);
        await queryRunner.query(`ALTER TABLE \`loans-management\` DROP FOREIGN KEY \`FK_ee1b61a41abf55d63deec63f774\``);
        await queryRunner.query(`ALTER TABLE \`loans-management\` DROP COLUMN \`book_id\``);
        await queryRunner.query(`ALTER TABLE \`loans-management\` DROP COLUMN \`employee_id\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`loans-management\` ADD \`employee_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`loans-management\` ADD \`book_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`loans-management\` ADD CONSTRAINT \`FK_ee1b61a41abf55d63deec63f774\` FOREIGN KEY (\`employee_id\`) REFERENCES \`employees\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`loans-management\` ADD CONSTRAINT \`FK_8cf182dd8e210940169a69b4ad8\` FOREIGN KEY (\`book_id\`) REFERENCES \`books\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
