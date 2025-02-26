import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1740567424744 implements MigrationInterface {
    name = 'Migration1740567424744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`is_kkh_patient\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`is_kkh_patient\` tinyint NOT NULL DEFAULT 1
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`date_of_birth\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`date_of_birth\` timestamp NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`has_pregnancies\` \`has_pregnancies\` tinyint NOT NULL DEFAULT 0
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`vaginal_deliveries\` \`vaginal_deliveries\` int NOT NULL DEFAULT '0'
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`caesarean_sections\` \`caesarean_sections\` int NOT NULL DEFAULT '0'
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`miscarriages\` \`miscarriages\` int NOT NULL DEFAULT '0'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`miscarriages\` \`miscarriages\` int NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`caesarean_sections\` \`caesarean_sections\` int NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`vaginal_deliveries\` \`vaginal_deliveries\` int NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`has_pregnancies\` \`has_pregnancies\` tinyint NOT NULL DEFAULT '1'
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`date_of_birth\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`date_of_birth\` varchar(255) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`is_kkh_patient\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`is_kkh_patient\` varchar(255) NOT NULL DEFAULT '1'
        `);
    }

}
