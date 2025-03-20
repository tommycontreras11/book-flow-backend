import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyDateDataTypeOnLoanManagementTable1742500551499 implements MigrationInterface {
    name = 'ModifyDateDataTypeOnLoanManagementTable1742500551499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`loan-managements\` DROP COLUMN \`date_loan\``);
        await queryRunner.query(`ALTER TABLE \`loan-managements\` ADD \`date_loan\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`loan-managements\` DROP COLUMN \`date_return\``);
        await queryRunner.query(`ALTER TABLE \`loan-managements\` ADD \`date_return\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`loan-managements\` DROP COLUMN \`date_return\``);
        await queryRunner.query(`ALTER TABLE \`loan-managements\` ADD \`date_return\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`loan-managements\` DROP COLUMN \`date_loan\``);
        await queryRunner.query(`ALTER TABLE \`loan-managements\` ADD \`date_loan\` varchar(255) NOT NULL`);
    }

}
