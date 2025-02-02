import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyCommentToNullableLoanManagementTable1738457991359 implements MigrationInterface {
    name = 'ModifyCommentToNullableLoanManagementTable1738457991359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`loan-managements\` DROP FOREIGN KEY \`FK_8b02b5db0c19510a24b7ee4c98c\``);
        await queryRunner.query(`ALTER TABLE \`loan-managements\` CHANGE \`comment\` \`comment\` varchar(250) NULL`);
        await queryRunner.query(`ALTER TABLE \`loan-managements\` ADD CONSTRAINT \`FK_6c65c9edb997c5ab9218f86c5f4\` FOREIGN KEY (\`request_id\`) REFERENCES \`requests\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`loan-managements\` DROP FOREIGN KEY \`FK_6c65c9edb997c5ab9218f86c5f4\``);
        await queryRunner.query(`ALTER TABLE \`loan-managements\` CHANGE \`comment\` \`comment\` varchar(250) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`loan-managements\` ADD CONSTRAINT \`FK_8b02b5db0c19510a24b7ee4c98c\` FOREIGN KEY (\`request_id\`) REFERENCES \`requests\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
