import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741835134407 implements MigrationInterface {
    name = 'Migration1741835134407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`status\` varchar(255) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`status\`
        `);
    }

}
