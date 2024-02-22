import { MigrationInterface, QueryRunner } from 'typeorm'

export class tickerTable1708582233432 implements MigrationInterface {
  name = 'tickerTable1708582233432'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "trade" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "baseAmount" numeric(45,32) NOT NULL, "quoteAmount" numeric(45,32) NOT NULL, "rate" numeric(45,32) NOT NULL, "date" TIMESTAMP NOT NULL, "baseTickerId" uuid, "quoteTickerId" uuid, CONSTRAINT "REL_535438ade9aa8266fc15088fc3" UNIQUE ("baseTickerId"), CONSTRAINT "REL_7c94a0d66dd14e5adda80682e7" UNIQUE ("quoteTickerId"), CONSTRAINT "PK_d4097908741dc408f8274ebdc53" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE INDEX "IDX_e57c7baa64e20f0fc9a16809d1" ON "trade" ("baseTickerId", "quoteTickerId", "date") ')
    await queryRunner.query('CREATE TABLE "ticker" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "symbol" character varying NOT NULL, "name" character varying NOT NULL, "chainId" integer NOT NULL, "address" character varying NOT NULL, "description" character varying, "decimals" integer NOT NULL DEFAULT \'18\', CONSTRAINT "UQ_de810ef424d9f8374604f5cbb06" UNIQUE ("chainId", "address"), CONSTRAINT "PK_cdb1814b8bc63df6e8be5736bc8" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "UQ_20f1f21d6853d9d20d501636ebd" UNIQUE ("name"), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE INDEX "IDX_20f1f21d6853d9d20d501636eb" ON "task" ("name") ')
    await queryRunner.query('ALTER TABLE "trade" ADD CONSTRAINT "FK_535438ade9aa8266fc15088fc3d" FOREIGN KEY ("baseTickerId") REFERENCES "ticker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "trade" ADD CONSTRAINT "FK_7c94a0d66dd14e5adda80682e76" FOREIGN KEY ("quoteTickerId") REFERENCES "ticker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "trade" DROP CONSTRAINT "FK_7c94a0d66dd14e5adda80682e76"')
    await queryRunner.query('ALTER TABLE "trade" DROP CONSTRAINT "FK_535438ade9aa8266fc15088fc3d"')
    await queryRunner.query('DROP INDEX "public"."IDX_20f1f21d6853d9d20d501636eb"')
    await queryRunner.query('DROP TABLE "task"')
    await queryRunner.query('DROP TABLE "ticker"')
    await queryRunner.query('DROP INDEX "public"."IDX_e57c7baa64e20f0fc9a16809d1"')
    await queryRunner.query('DROP TABLE "trade"')
  }
}
