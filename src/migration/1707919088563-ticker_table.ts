import { MigrationInterface, QueryRunner } from 'typeorm'

export class tickerTable1707919088563 implements MigrationInterface {
  name = 'tickerTable1707919088563'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "ticker" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "symbol" character varying NOT NULL, "name" character varying NOT NULL, "chainId" integer NOT NULL, "address" character varying, "description" character varying, "decimals" integer NOT NULL DEFAULT \'18\', CONSTRAINT "UQ_0b3a74f8c3a21388a92d61a050a" UNIQUE ("symbol"), CONSTRAINT "UQ_de810ef424d9f8374604f5cbb06" UNIQUE ("chainId", "address"), CONSTRAINT "PK_cdb1814b8bc63df6e8be5736bc8" PRIMARY KEY ("id"))')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "ticker"')
  }
}
