import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBorrowEnumToRequestTable1738461208465 implements MigrationInterface {
    name = 'AddBorrowEnumToRequestTable1738461208465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`requests\` CHANGE \`status\` \`status\` enum ('BORROWED', 'APPROVAL', 'DENIED', 'PENDING') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`requests\` CHANGE \`status\` \`status\` enum ('APPROVAL', 'DENIED', 'PENDING') NOT NULL`);
    }

}
