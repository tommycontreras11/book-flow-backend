import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyWorkShiftToEnumOnEmployeeTable1742323052971 implements MigrationInterface {
    name = 'ModifyWorkShiftToEnumOnEmployeeTable1742323052971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employees\` DROP COLUMN \`work_shift\``);
        await queryRunner.query(`ALTER TABLE \`employees\` ADD \`work_shift\` enum ('MORNING', 'AFTERNOON', 'NIGHT') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employees\` DROP COLUMN \`work_shift\``);
        await queryRunner.query(`ALTER TABLE \`employees\` ADD \`work_shift\` varchar(255) NOT NULL`);
    }

}
