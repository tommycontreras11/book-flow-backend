import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGenreTableAndRelationshipWithBookTable1744824114101 implements MigrationInterface {
    name = 'AddGenreTableAndRelationshipWithBookTable1744824114101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book-genres\` ADD CONSTRAINT \`FK_330a750ea1667a77bb3d7fea8bf\` FOREIGN KEY (\`bookId\`) REFERENCES \`books\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`book-genres\` ADD CONSTRAINT \`FK_10fa1b00d0332c27c047830a796\` FOREIGN KEY (\`genreId\`) REFERENCES \`genres\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book-genres\` DROP FOREIGN KEY \`FK_10fa1b00d0332c27c047830a796\``);
        await queryRunner.query(`ALTER TABLE \`book-genres\` DROP FOREIGN KEY \`FK_330a750ea1667a77bb3d7fea8bf\``);
    }

}
