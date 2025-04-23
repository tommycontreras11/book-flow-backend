import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1745362725047 implements MigrationInterface {
    name = 'InitMigration1745362725047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`countries\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(100) NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`languages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(100) NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`authors\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(100) NOT NULL, \`birth_country_id\` int NOT NULL, \`native_language_id\` int NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bibliography-types\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(100) NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`publishers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(100) NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sciences\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(100) NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`genres\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(100) NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`books\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(250) NOT NULL, \`description\` varchar(500) NOT NULL, \`topographical_signature\` varchar(255) NOT NULL, \`isbn\` varchar(255) NOT NULL, \`published_date\` datetime NOT NULL, \`pages\` int NOT NULL, \`bibliography_type_id\` int NOT NULL, \`publisher_id\` int NOT NULL, \`language_id\` int NOT NULL, \`science_id\` int NOT NULL, \`file_name\` varchar(255) NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employees\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` varchar(100) NOT NULL, \`identification\` varchar(100) NOT NULL, \`work_shift\` enum ('MORNING', 'AFTERNOON', 'NIGHT') NOT NULL, \`commission_percentage\` float(10,2) NOT NULL, \`entry_date\` varchar(255) NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`loan-managements\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`loan_number\` varchar(100) NOT NULL, \`date_loan\` datetime NOT NULL, \`date_return\` datetime NULL, \`amount_day\` float(10,2) NOT NULL, \`quantity_day\` int NOT NULL, \`comment\` varchar(250) NULL, \`request_id\` int NOT NULL, \`status\` enum ('BORROWED', 'RETURNED') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`requests\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`status\` enum ('BORROWED', 'COMPLETED', 'APPROVAL', 'DENIED', 'PENDING') NOT NULL, \`user_id\` int NOT NULL, \`book_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` varchar(100) NOT NULL, \`identification\` varchar(100) NOT NULL, \`carnet_number\` varchar(100) NOT NULL, \`person_type\` enum ('NATURAL', 'LEGAL') NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`book-authors\` (\`bookId\` int NOT NULL, \`authorId\` int NOT NULL, INDEX \`IDX_f920a6c3c3608d2a72c2d7728e\` (\`bookId\`), INDEX \`IDX_e2712da4f15ea5c17cf354fd48\` (\`authorId\`), PRIMARY KEY (\`bookId\`, \`authorId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`book-genres\` (\`bookId\` int NOT NULL, \`genreId\` int NOT NULL, INDEX \`IDX_330a750ea1667a77bb3d7fea8b\` (\`bookId\`), INDEX \`IDX_10fa1b00d0332c27c047830a79\` (\`genreId\`), PRIMARY KEY (\`bookId\`, \`genreId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`request-employees\` (\`requestId\` int NOT NULL, \`employeeId\` int NOT NULL, INDEX \`IDX_45e7b1d0bf4f7feea62cc656e1\` (\`requestId\`), INDEX \`IDX_7fd7dcad0b7a286d51ee5339f9\` (\`employeeId\`), PRIMARY KEY (\`requestId\`, \`employeeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`authors\` ADD CONSTRAINT \`FK_1443e89729e18041e70b840fbcf\` FOREIGN KEY (\`birth_country_id\`) REFERENCES \`countries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`authors\` ADD CONSTRAINT \`FK_45d9206b0a865c810dfe920a2e5\` FOREIGN KEY (\`native_language_id\`) REFERENCES \`languages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`books\` ADD CONSTRAINT \`FK_c736ee8f59f7997a027becf7b85\` FOREIGN KEY (\`bibliography_type_id\`) REFERENCES \`bibliography-types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`books\` ADD CONSTRAINT \`FK_370ec5bbafd46f74b23a20a5298\` FOREIGN KEY (\`publisher_id\`) REFERENCES \`publishers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`books\` ADD CONSTRAINT \`FK_3164a2958d73d8cdebe5204c838\` FOREIGN KEY (\`language_id\`) REFERENCES \`languages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`books\` ADD CONSTRAINT \`FK_368cad2723e4448d32ad065f5ca\` FOREIGN KEY (\`science_id\`) REFERENCES \`sciences\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`loan-managements\` ADD CONSTRAINT \`FK_6c65c9edb997c5ab9218f86c5f4\` FOREIGN KEY (\`request_id\`) REFERENCES \`requests\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`requests\` ADD CONSTRAINT \`FK_ed71e914310082e73ac37f46529\` FOREIGN KEY (\`book_id\`) REFERENCES \`books\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`requests\` ADD CONSTRAINT \`FK_9e5e2eb56e3837b43e5a547be23\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book-authors\` ADD CONSTRAINT \`FK_f920a6c3c3608d2a72c2d7728e1\` FOREIGN KEY (\`bookId\`) REFERENCES \`books\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`book-authors\` ADD CONSTRAINT \`FK_e2712da4f15ea5c17cf354fd48f\` FOREIGN KEY (\`authorId\`) REFERENCES \`authors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book-genres\` ADD CONSTRAINT \`FK_330a750ea1667a77bb3d7fea8bf\` FOREIGN KEY (\`bookId\`) REFERENCES \`books\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`book-genres\` ADD CONSTRAINT \`FK_10fa1b00d0332c27c047830a796\` FOREIGN KEY (\`genreId\`) REFERENCES \`genres\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`request-employees\` ADD CONSTRAINT \`FK_45e7b1d0bf4f7feea62cc656e19\` FOREIGN KEY (\`requestId\`) REFERENCES \`requests\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`request-employees\` ADD CONSTRAINT \`FK_7fd7dcad0b7a286d51ee5339f93\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employees\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`request-employees\` DROP FOREIGN KEY \`FK_7fd7dcad0b7a286d51ee5339f93\``);
        await queryRunner.query(`ALTER TABLE \`request-employees\` DROP FOREIGN KEY \`FK_45e7b1d0bf4f7feea62cc656e19\``);
        await queryRunner.query(`ALTER TABLE \`book-genres\` DROP FOREIGN KEY \`FK_10fa1b00d0332c27c047830a796\``);
        await queryRunner.query(`ALTER TABLE \`book-genres\` DROP FOREIGN KEY \`FK_330a750ea1667a77bb3d7fea8bf\``);
        await queryRunner.query(`ALTER TABLE \`book-authors\` DROP FOREIGN KEY \`FK_e2712da4f15ea5c17cf354fd48f\``);
        await queryRunner.query(`ALTER TABLE \`book-authors\` DROP FOREIGN KEY \`FK_f920a6c3c3608d2a72c2d7728e1\``);
        await queryRunner.query(`ALTER TABLE \`requests\` DROP FOREIGN KEY \`FK_9e5e2eb56e3837b43e5a547be23\``);
        await queryRunner.query(`ALTER TABLE \`requests\` DROP FOREIGN KEY \`FK_ed71e914310082e73ac37f46529\``);
        await queryRunner.query(`ALTER TABLE \`loan-managements\` DROP FOREIGN KEY \`FK_6c65c9edb997c5ab9218f86c5f4\``);
        await queryRunner.query(`ALTER TABLE \`books\` DROP FOREIGN KEY \`FK_368cad2723e4448d32ad065f5ca\``);
        await queryRunner.query(`ALTER TABLE \`books\` DROP FOREIGN KEY \`FK_3164a2958d73d8cdebe5204c838\``);
        await queryRunner.query(`ALTER TABLE \`books\` DROP FOREIGN KEY \`FK_370ec5bbafd46f74b23a20a5298\``);
        await queryRunner.query(`ALTER TABLE \`books\` DROP FOREIGN KEY \`FK_c736ee8f59f7997a027becf7b85\``);
        await queryRunner.query(`ALTER TABLE \`authors\` DROP FOREIGN KEY \`FK_45d9206b0a865c810dfe920a2e5\``);
        await queryRunner.query(`ALTER TABLE \`authors\` DROP FOREIGN KEY \`FK_1443e89729e18041e70b840fbcf\``);
        await queryRunner.query(`DROP INDEX \`IDX_7fd7dcad0b7a286d51ee5339f9\` ON \`request-employees\``);
        await queryRunner.query(`DROP INDEX \`IDX_45e7b1d0bf4f7feea62cc656e1\` ON \`request-employees\``);
        await queryRunner.query(`DROP TABLE \`request-employees\``);
        await queryRunner.query(`DROP INDEX \`IDX_10fa1b00d0332c27c047830a79\` ON \`book-genres\``);
        await queryRunner.query(`DROP INDEX \`IDX_330a750ea1667a77bb3d7fea8b\` ON \`book-genres\``);
        await queryRunner.query(`DROP TABLE \`book-genres\``);
        await queryRunner.query(`DROP INDEX \`IDX_e2712da4f15ea5c17cf354fd48\` ON \`book-authors\``);
        await queryRunner.query(`DROP INDEX \`IDX_f920a6c3c3608d2a72c2d7728e\` ON \`book-authors\``);
        await queryRunner.query(`DROP TABLE \`book-authors\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`requests\``);
        await queryRunner.query(`DROP TABLE \`loan-managements\``);
        await queryRunner.query(`DROP TABLE \`employees\``);
        await queryRunner.query(`DROP TABLE \`books\``);
        await queryRunner.query(`DROP TABLE \`genres\``);
        await queryRunner.query(`DROP TABLE \`sciences\``);
        await queryRunner.query(`DROP TABLE \`publishers\``);
        await queryRunner.query(`DROP TABLE \`bibliography-types\``);
        await queryRunner.query(`DROP TABLE \`authors\``);
        await queryRunner.query(`DROP TABLE \`languages\``);
        await queryRunner.query(`DROP TABLE \`countries\``);
    }

}
