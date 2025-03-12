import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741771249298 implements MigrationInterface {
    name = 'Migration1741771249298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`user_content\` (
                \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`deleted_at\` timestamp NULL,
                \`ucid\` varchar(36) NOT NULL,
                \`conid\` varchar(255) NOT NULL,
                \`uid\` varchar(255) NOT NULL,
                \`is_access\` tinyint NOT NULL,
                PRIMARY KEY (\`ucid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_content\`
            ADD CONSTRAINT \`FK_796cda47a03285ece686abaae5d\` FOREIGN KEY (\`conid\`) REFERENCES \`contents\`(\`conid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_content\`
            ADD CONSTRAINT \`FK_4b530860c3cc56de4777f4a8381\` FOREIGN KEY (\`uid\`) REFERENCES \`users\`(\`uid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user_content\` DROP FOREIGN KEY \`FK_4b530860c3cc56de4777f4a8381\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_content\` DROP FOREIGN KEY \`FK_796cda47a03285ece686abaae5d\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user_content\`
        `);
    }

}
