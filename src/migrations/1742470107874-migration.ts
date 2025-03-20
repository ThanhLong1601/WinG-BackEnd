import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742470107874 implements MigrationInterface {
    name = 'Migration1742470107874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`sticker\` (
                \`sid\` varchar(36) NOT NULL,
                \`name\` varchar(255) NOT NULL,
                \`image\` varchar(255) NOT NULL,
                \`point\` int NOT NULL DEFAULT '0',
                \`status\` varchar(255) NOT NULL DEFAULT 'active',
                \`isFree\` varchar(255) NULL,
                PRIMARY KEY (\`sid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`user_sticker\` (
                \`usid\` varchar(36) NOT NULL,
                \`uid\` varchar(255) NOT NULL,
                \`sid\` varchar(255) NOT NULL,
                \`isUnlocked\` tinyint NOT NULL DEFAULT 0,
                \`unlockedDate\` timestamp NULL,
                PRIMARY KEY (\`usid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`art_journal\` DROP COLUMN \`description\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`art_journal\`
            ADD \`description\` text NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_sticker\`
            ADD CONSTRAINT \`FK_f7defa38bef8f9e5c885fc7a646\` FOREIGN KEY (\`sid\`) REFERENCES \`sticker\`(\`sid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_sticker\`
            ADD CONSTRAINT \`FK_566afe10d8674ab3af202e3c976\` FOREIGN KEY (\`uid\`) REFERENCES \`users\`(\`uid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user_sticker\` DROP FOREIGN KEY \`FK_566afe10d8674ab3af202e3c976\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_sticker\` DROP FOREIGN KEY \`FK_f7defa38bef8f9e5c885fc7a646\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`art_journal\` DROP COLUMN \`description\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`art_journal\`
            ADD \`description\` varchar(255) NULL
        `);
        await queryRunner.query(`
            DROP TABLE \`user_sticker\`
        `);
        await queryRunner.query(`
            DROP TABLE \`sticker\`
        `);
    }

}
