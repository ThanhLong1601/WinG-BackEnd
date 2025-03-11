import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741670451465 implements MigrationInterface {
    name = 'Migration1741670451465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`contents\` CHANGE \`required_days\` \`required_months\` int NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`contents\` CHANGE \`required_months\` \`required_days\` int NULL
        `);
    }

}
