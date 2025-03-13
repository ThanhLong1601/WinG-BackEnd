import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741838681555 implements MigrationInterface {
    name = 'Migration1741838681555'

    public async up(queryRunner: QueryRunner): Promise<void> {
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
            ALTER TABLE \`user_settings\`
            ADD CONSTRAINT \`FK_9881f8d5993c707d0228cc5685d\` FOREIGN KEY (\`uid\`) REFERENCES \`users\`(\`uid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user_settings\` DROP FOREIGN KEY \`FK_9881f8d5993c707d0228cc5685d\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_9881f8d5993c707d0228cc5685\` ON \`user_settings\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user_settings\`
        `);
    }

}
