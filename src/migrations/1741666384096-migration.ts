import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741666384096 implements MigrationInterface {
    name = 'Migration1741666384096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`contents\` DROP COLUMN \`images\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`contents\`
            ADD \`images\` json NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`contents\` DROP COLUMN \`images\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`contents\`
            ADD \`images\` varchar(255) NULL
        `);
    }

}
