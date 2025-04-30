import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTreeFormatToCommentTable1746021488510 implements MigrationInterface {
    name = 'AddTreeFormatToCommentTable1746021488510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_93ce08bdbea73c0c7ee673ec35a\``);
        await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`parent_comment_id\` \`parentId\` int NULL`);
        await queryRunner.query(`CREATE TABLE \`comments_closure\` (\`id_ancestor\` int NOT NULL, \`id_descendant\` int NOT NULL, INDEX \`IDX_89a2762362d968c2939b6fab19\` (\`id_ancestor\`), INDEX \`IDX_d2164211fd6ab117cfb2ab8ba9\` (\`id_descendant\`), PRIMARY KEY (\`id_ancestor\`, \`id_descendant\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_8770bd9030a3d13c5f79a7d2e81\` FOREIGN KEY (\`parentId\`) REFERENCES \`comments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments_closure\` ADD CONSTRAINT \`FK_89a2762362d968c2939b6fab193\` FOREIGN KEY (\`id_ancestor\`) REFERENCES \`comments\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments_closure\` ADD CONSTRAINT \`FK_d2164211fd6ab117cfb2ab8ba96\` FOREIGN KEY (\`id_descendant\`) REFERENCES \`comments\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comments_closure\` DROP FOREIGN KEY \`FK_d2164211fd6ab117cfb2ab8ba96\``);
        await queryRunner.query(`ALTER TABLE \`comments_closure\` DROP FOREIGN KEY \`FK_89a2762362d968c2939b6fab193\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_8770bd9030a3d13c5f79a7d2e81\``);
        await queryRunner.query(`DROP INDEX \`IDX_d2164211fd6ab117cfb2ab8ba9\` ON \`comments_closure\``);
        await queryRunner.query(`DROP INDEX \`IDX_89a2762362d968c2939b6fab19\` ON \`comments_closure\``);
        await queryRunner.query(`DROP TABLE \`comments_closure\``);
        await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`parentId\` \`parent_comment_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_93ce08bdbea73c0c7ee673ec35a\` FOREIGN KEY (\`parent_comment_id\`) REFERENCES \`comments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
