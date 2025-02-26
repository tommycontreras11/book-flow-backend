import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangePropertyUsernameToEmailOnUserAndEmployeeTable1740531511089 implements MigrationInterface {
    name = 'ChangePropertyUsernameToEmailOnUserAndEmployeeTable1740531511089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employees\` CHANGE \`username\` \`email\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`username\` \`email\` varchar(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`email\` \`username\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`employees\` CHANGE \`email\` \`username\` varchar(100) NOT NULL`);
    }

}
