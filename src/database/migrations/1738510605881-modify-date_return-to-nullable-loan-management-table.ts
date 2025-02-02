import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyDateReturnToNullableLoanManagementTable1738510605881 implements MigrationInterface {
    name = 'ModifyDateReturnToNullableLoanManagementTable1738510605881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`loan-managements\` CHANGE \`date_return\` \`date_return\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`requests\` CHANGE \`status\` \`status\` enum ('BORROWED', 'COMPLETED', 'APPROVAL', 'DENIED', 'PENDING') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`requests\` CHANGE \`status\` \`status\` enum ('BORROWED', 'APPROVAL', 'DENIED', 'PENDING') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`loan-managements\` CHANGE \`date_return\` \`date_return\` varchar(255) NOT NULL`);
    }

}
