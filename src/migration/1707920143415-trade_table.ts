import { MigrationInterface, QueryRunner } from 'typeorm'

export class tradeTable1707920143415 implements MigrationInterface {
  name = 'tradeTable1707920143415'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "trade" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "baseAmount" numeric(45,32) NOT NULL, "quoteAmount" numeric(45,32) NOT NULL, "rate" numeric(45,32) NOT NULL, "date" TIMESTAMP NOT NULL, "baseTickerId" uuid, "quoteTickerId" uuid, CONSTRAINT "REL_535438ade9aa8266fc15088fc3" UNIQUE ("baseTickerId"), CONSTRAINT "REL_7c94a0d66dd14e5adda80682e7" UNIQUE ("quoteTickerId"), CONSTRAINT "PK_d4097908741dc408f8274ebdc53" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE INDEX "IDX_e57c7baa64e20f0fc9a16809d1" ON "trade" ("baseTickerId", "quoteTickerId", "date") ')
    await queryRunner.query('ALTER TABLE "trade" ADD CONSTRAINT "FK_535438ade9aa8266fc15088fc3d" FOREIGN KEY ("baseTickerId") REFERENCES "ticker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "trade" ADD CONSTRAINT "FK_7c94a0d66dd14e5adda80682e76" FOREIGN KEY ("quoteTickerId") REFERENCES "ticker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "trade" DROP CONSTRAINT "FK_7c94a0d66dd14e5adda80682e76"')
    await queryRunner.query('ALTER TABLE "trade" DROP CONSTRAINT "FK_535438ade9aa8266fc15088fc3d"')
    await queryRunner.query('DROP INDEX "public"."IDX_e57c7baa64e20f0fc9a16809d1"')
    await queryRunner.query('DROP TABLE "trade"')
  }
}
