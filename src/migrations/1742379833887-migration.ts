import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742379833887 implements MigrationInterface {
    name = 'Migration1742379833887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`category_content\` (
                \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`deleted_at\` timestamp NULL,
                \`cateid\` varchar(36) NOT NULL,
                \`name\` varchar(255) NOT NULL,
                \`status\` varchar(255) NOT NULL DEFAULT 'active',
                PRIMARY KEY (\`cateid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`contents\` (
                \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`deleted_at\` timestamp NULL,
                \`conid\` varchar(36) NOT NULL,
                \`type\` varchar(255) NOT NULL,
                \`required_months\` int NULL,
                \`banner\` varchar(255) NULL,
                \`title\` varchar(255) NOT NULL,
                \`category_id\` varchar(255) NOT NULL,
                \`content\` text NULL,
                \`video\` varchar(255) NULL,
                \`images\` json NULL,
                \`status\` varchar(255) NOT NULL DEFAULT 'active',
                PRIMARY KEY (\`conid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`user_content\` (
                \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`deleted_at\` timestamp NULL,
                \`ucid\` varchar(36) NOT NULL,
                \`conid\` varchar(255) NOT NULL,
                \`uid\` varchar(255) NOT NULL,
                PRIMARY KEY (\`ucid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`user_settings\` (
                \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`deleted_at\` timestamp NULL,
                \`usid\` varchar(36) NOT NULL,
                \`uid\` varchar(255) NOT NULL,
                \`chatbot_updates\` tinyint NOT NULL DEFAULT 1,
                \`new_enrich_updates\` tinyint NOT NULL DEFAULT 1,
                \`general_reminders_and_updates\` tinyint NOT NULL DEFAULT 1,
                UNIQUE INDEX \`REL_9881f8d5993c707d0228cc5685\` (\`uid\`),
                PRIMARY KEY (\`usid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`art_journal\` (
                \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`deleted_at\` timestamp NULL,
                \`aid\` varchar(36) NOT NULL,
                \`name\` varchar(255) NOT NULL,
                \`status\` varchar(255) NOT NULL DEFAULT 'active',
                \`point\` int NOT NULL DEFAULT '0',
                \`is_draw_circle\` tinyint NULL,
                \`description\` varchar(255) NULL,
                \`banner\` varchar(255) NULL,
                PRIMARY KEY (\`aid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`user_submis_art\` (
                \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`deleted_at\` timestamp NULL,
                \`uaid\` varchar(36) NOT NULL,
                \`aid\` varchar(255) NOT NULL,
                \`uid\` varchar(255) NOT NULL,
                \`submission_date\` timestamp NULL,
                \`pointsEarned\` int NOT NULL DEFAULT '0',
                \`canvas\` varchar(255) NOT NULL,
                \`submitted_artwork\` varchar(255) NOT NULL,
                \`user_thoughts\` text NULL,
                \`status\` varchar(255) NOT NULL DEFAULT 'uncomplete',
                \`artJournalAid\` varchar(36) NULL,
                \`userUid\` varchar(36) NULL,
                PRIMARY KEY (\`uaid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`deleted_at\` timestamp NULL,
                \`uid\` varchar(36) NOT NULL,
                \`phone\` varchar(255) NOT NULL,
                \`pin_code\` varchar(255) NOT NULL,
                \`is_kkh_patient\` tinyint NOT NULL DEFAULT 1,
                \`avatar\` varchar(255) NULL,
                \`name\` varchar(255) NOT NULL,
                \`email\` varchar(255) NULL,
                \`date_of_birth\` timestamp NULL,
                \`ethnicity\` varchar(255) NULL,
                \`current_occupation\` varchar(255) NULL,
                \`highest_attained_education\` varchar(255) NULL,
                \`has_pregnancies\` tinyint NOT NULL DEFAULT 0,
                \`vaginal_deliveries\` int NOT NULL DEFAULT '0',
                \`caesarean_sections\` int NOT NULL DEFAULT '0',
                \`miscarriages\` int NOT NULL DEFAULT '0',
                \`need_update_profile\` tinyint NOT NULL DEFAULT 1,
                \`timezone\` int NOT NULL DEFAULT '0',
                \`status\` varchar(255) NOT NULL,
                \`point\` int NOT NULL DEFAULT '0',
                PRIMARY KEY (\`uid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`user_view_content\` (
                \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`deleted_at\` timestamp NULL,
                \`uid\` varchar(255) NOT NULL,
                \`conid\` varchar(255) NOT NULL,
                \`views\` int NOT NULL DEFAULT '1',
                PRIMARY KEY (\`uid\`, \`conid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`admins\` (
                \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`deleted_at\` timestamp NULL,
                \`uid\` varchar(36) NOT NULL,
                \`username\` varchar(255) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                \`email\` varchar(255) NOT NULL,
                \`name\` varchar(255) NULL,
                PRIMARY KEY (\`uid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`contents\`
            ADD CONSTRAINT \`FK_5eef62af59eab910a4bf3b09d3e\` FOREIGN KEY (\`category_id\`) REFERENCES \`category_content\`(\`cateid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_content\`
            ADD CONSTRAINT \`FK_796cda47a03285ece686abaae5d\` FOREIGN KEY (\`conid\`) REFERENCES \`contents\`(\`conid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_content\`
            ADD CONSTRAINT \`FK_4b530860c3cc56de4777f4a8381\` FOREIGN KEY (\`uid\`) REFERENCES \`users\`(\`uid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_settings\`
            ADD CONSTRAINT \`FK_9881f8d5993c707d0228cc5685d\` FOREIGN KEY (\`uid\`) REFERENCES \`users\`(\`uid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_submis_art\`
            ADD CONSTRAINT \`FK_029b59f46e529d365c9921bcda4\` FOREIGN KEY (\`artJournalAid\`) REFERENCES \`art_journal\`(\`aid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_submis_art\`
            ADD CONSTRAINT \`FK_5a8369a38bc2dab5f6206bd363d\` FOREIGN KEY (\`userUid\`) REFERENCES \`users\`(\`uid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_view_content\`
            ADD CONSTRAINT \`FK_cea6f03d8368203aad28e4a6c2a\` FOREIGN KEY (\`uid\`) REFERENCES \`users\`(\`uid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_view_content\`
            ADD CONSTRAINT \`FK_7a55b46db073bbe2d4a02b26e16\` FOREIGN KEY (\`conid\`) REFERENCES \`contents\`(\`conid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user_view_content\` DROP FOREIGN KEY \`FK_7a55b46db073bbe2d4a02b26e16\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_view_content\` DROP FOREIGN KEY \`FK_cea6f03d8368203aad28e4a6c2a\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_submis_art\` DROP FOREIGN KEY \`FK_5a8369a38bc2dab5f6206bd363d\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_submis_art\` DROP FOREIGN KEY \`FK_029b59f46e529d365c9921bcda4\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_settings\` DROP FOREIGN KEY \`FK_9881f8d5993c707d0228cc5685d\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_content\` DROP FOREIGN KEY \`FK_4b530860c3cc56de4777f4a8381\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_content\` DROP FOREIGN KEY \`FK_796cda47a03285ece686abaae5d\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`contents\` DROP FOREIGN KEY \`FK_5eef62af59eab910a4bf3b09d3e\`
        `);
        await queryRunner.query(`
            DROP TABLE \`admins\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user_view_content\`
        `);
        await queryRunner.query(`
            DROP TABLE \`users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user_submis_art\`
        `);
        await queryRunner.query(`
            DROP TABLE \`art_journal\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_9881f8d5993c707d0228cc5685\` ON \`user_settings\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user_settings\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user_content\`
        `);
        await queryRunner.query(`
            DROP TABLE \`contents\`
        `);
        await queryRunner.query(`
            DROP TABLE \`category_content\`
        `);
    }

}
