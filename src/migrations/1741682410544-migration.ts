import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741682410544 implements MigrationInterface {
    name = 'Migration1741682410544'

    public async up(queryRunner: QueryRunner): Promise<void> {
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
            DROP TABLE \`user_view_content\`
        `);
    }

}
