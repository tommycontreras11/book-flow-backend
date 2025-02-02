import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCompleteEnumToRequestTable1738510531679 implements MigrationInterface {
    name = 'AddCompleteEnumToRequestTable1738510531679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`requests\` CHANGE \`status\` \`status\` enum ('BORROWED', 'COMPLETED', 'APPROVAL', 'DENIED', 'PENDING') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`requests\` CHANGE \`status\` \`status\` enum ('BORROWED', 'APPROVAL', 'DENIED', 'PENDING') NOT NULL`);
    }

}
