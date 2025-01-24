import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyStateToNullable1737680777816 implements MigrationInterface {
    name = 'ModifyStateToNullable1737680777816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`requests\` CHANGE \`state\` \`state\` enum ('ACTIVE', 'INACTIVE') NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`requests\` CHANGE \`state\` \`state\` enum ('ACTIVE', 'INACTIVE') NOT NULL`);
    }

}
