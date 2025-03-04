import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741076302908 implements MigrationInterface {
    name = 'Migration1741076302908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`category_content\` (
                \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`deleted_at\` timestamp NULL,
                \`cateid\` varchar(36) NOT NULL,
                \`name\` varchar(255) NOT NULL,
                \`status\` varchar(255) NOT NULL DEFAULT 'active',
                PRIMARY KEY (\`cateid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`contents\` (
                \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`deleted_at\` timestamp NULL,
                \`conid\` varchar(36) NOT NULL,
                \`type_of_content\` varchar(255) NOT NULL,
                \`required_months\` int NULL,
                \`banner\` varchar(255) NULL,
                \`title\` varchar(255) NOT NULL,
                \`category_id\` varchar(255) NOT NULL,
                \`content\` text NULL,
                \`video\` varchar(255) NULL,
                \`images\` varchar(255) NULL,
                \`status\` varchar(255) NOT NULL DEFAULT 'active',
                PRIMARY KEY (\`conid\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`contents\`
            ADD CONSTRAINT \`FK_5eef62af59eab910a4bf3b09d3e\` FOREIGN KEY (\`category_id\`) REFERENCES \`category_content\`(\`cateid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`contents\` DROP FOREIGN KEY \`FK_5eef62af59eab910a4bf3b09d3e\`
        `);
        await queryRunner.query(`
            DROP TABLE \`contents\`
        `);
        await queryRunner.query(`
            DROP TABLE \`category_content\`
        `);
    }

}
