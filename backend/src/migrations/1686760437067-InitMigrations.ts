import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitMigrations1686760437067 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "transaction"
        ADD COLUMN "account_id" uuid
      `)
    await queryRunner.query(`
        ALTER TABLE "transaction"
        ADD CONSTRAINT "FK_transaction_account"
        FOREIGN KEY ("account_id") REFERENCES "account"("account_id")
        ON DELETE CASCADE
      `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "transaction"
      DROP CONSTRAINT "FK_transaction_account"
    `)
    await queryRunner.query(`
      ALTER TABLE "transaction"
      DROP COLUMN "account_id"
    `)
  }
}
