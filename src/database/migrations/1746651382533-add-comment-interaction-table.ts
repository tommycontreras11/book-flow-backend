import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCommentInteractionTable1746651382533 implements MigrationInterface {
    name = 'AddCommentInteractionTable1746651382533'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`comment-interactions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`type\` enum ('LIKE', 'DISLIKE') NOT NULL, \`user_id\` int NOT NULL, \`comment_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comment-interactions\` ADD CONSTRAINT \`FK_0e2c5afe8336b0fb10b08cbfc8f\` FOREIGN KEY (\`comment_id\`) REFERENCES \`comments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment-interactions\` ADD CONSTRAINT \`FK_014522330d4fe5ddc01ff4fde15\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment-interactions\` DROP FOREIGN KEY \`FK_014522330d4fe5ddc01ff4fde15\``);
        await queryRunner.query(`ALTER TABLE \`comment-interactions\` DROP FOREIGN KEY \`FK_0e2c5afe8336b0fb10b08cbfc8f\``);
        await queryRunner.query(`DROP TABLE \`comment-interactions\``);
    }

}
