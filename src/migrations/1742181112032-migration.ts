import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742181112032 implements MigrationInterface {
    name = 'Migration1742181112032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user_content\` DROP COLUMN \`is_access\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`timezone\` int NOT NULL DEFAULT '0'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`timezone\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_content\`
            ADD \`is_access\` tinyint NOT NULL
        `);
    }

}
