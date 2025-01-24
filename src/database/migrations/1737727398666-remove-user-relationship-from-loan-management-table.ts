import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUserRelationshipFromLoanManagementTable1737727398666 implements MigrationInterface {
    name = 'RemoveUserRelationshipFromLoanManagementTable1737727398666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`loan-managements\` DROP FOREIGN KEY \`FK_a542b9b5aa1221986a01c1d270e\``);
        await queryRunner.query(`ALTER TABLE \`loan-managements\` DROP COLUMN \`user_id\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`loan-managements\` ADD \`user_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`loan-managements\` ADD CONSTRAINT \`FK_a542b9b5aa1221986a01c1d270e\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
