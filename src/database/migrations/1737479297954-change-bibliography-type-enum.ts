import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeBibliographyTypeEnum1737479297954 implements MigrationInterface {
    name = 'ChangeBibliographyTypeEnum1737479297954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bibliography-types\` CHANGE \`state\` \`state\` enum ('ACTIVE', 'INACTIVE') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bibliography-types\` CHANGE \`state\` \`state\` enum ('ARTICLE', 'BOOK', 'CONFERENCE', 'JOURNAL', 'OTHER') NOT NULL`);
    }

}
