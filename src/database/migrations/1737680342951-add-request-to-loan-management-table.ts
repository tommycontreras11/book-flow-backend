import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRequestToLoanManagementTable1737680342951 implements MigrationInterface {
    name = 'AddRequestToLoanManagementTable1737680342951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`loans-management\` ADD \`request_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`loans-management\` ADD CONSTRAINT \`FK_8b02b5db0c19510a24b7ee4c98c\` FOREIGN KEY (\`request_id\`) REFERENCES \`requests\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`loans-management\` DROP FOREIGN KEY \`FK_8b02b5db0c19510a24b7ee4c98c\``);
        await queryRunner.query(`ALTER TABLE \`loans-management\` DROP COLUMN \`request_id\``);
    }

}
