import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742447872890 implements MigrationInterface {
    name = 'Migration1742447872890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user_submis_art\` DROP FOREIGN KEY \`FK_029b59f46e529d365c9921bcda4\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_submis_art\` DROP FOREIGN KEY \`FK_5a8369a38bc2dab5f6206bd363d\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_submis_art\` DROP COLUMN \`artJournalAid\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_submis_art\` DROP COLUMN \`userUid\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_submis_art\`
            ADD CONSTRAINT \`FK_de54be28e049d62df7d492022a2\` FOREIGN KEY (\`aid\`) REFERENCES \`art_journal\`(\`aid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_submis_art\`
            ADD CONSTRAINT \`FK_5baee59c132bf8d6fa366f2f320\` FOREIGN KEY (\`uid\`) REFERENCES \`users\`(\`uid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user_submis_art\` DROP FOREIGN KEY \`FK_5baee59c132bf8d6fa366f2f320\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_submis_art\` DROP FOREIGN KEY \`FK_de54be28e049d62df7d492022a2\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_submis_art\`
            ADD \`userUid\` varchar(36) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_submis_art\`
            ADD \`artJournalAid\` varchar(36) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_submis_art\`
            ADD CONSTRAINT \`FK_5a8369a38bc2dab5f6206bd363d\` FOREIGN KEY (\`userUid\`) REFERENCES \`users\`(\`uid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_submis_art\`
            ADD CONSTRAINT \`FK_029b59f46e529d365c9921bcda4\` FOREIGN KEY (\`artJournalAid\`) REFERENCES \`art_journal\`(\`aid\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
