import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741665543096 implements MigrationInterface {
    name = 'Migration1741665543096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`contents\` CHANGE \`type_of_content\` \`type\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`contents\` DROP COLUMN \`type\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`contents\`
            ADD \`type\` varchar(255) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`contents\` DROP COLUMN \`type\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`contents\`
            ADD \`type\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`contents\` CHANGE \`type\` \`type_of_content\` varchar(255) NOT NULL
        `);
    }

}
