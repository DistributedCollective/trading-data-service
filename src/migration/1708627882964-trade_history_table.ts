import {MigrationInterface, QueryRunner} from "typeorm";

export class tradeHistoryTable1708627882964 implements MigrationInterface {
    name = 'tradeHistoryTable1708627882964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trade_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "timestamp" integer NOT NULL, "baseToken" character varying NOT NULL, "quoteToken" character varying NOT NULL, "price" numeric(45,32) NOT NULL, "amount" numeric(45,32) NOT NULL, CONSTRAINT "PK_5f51898d68b31dbcfedfae906c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f6e2479cc3b576c3b86328efe3" ON "trade_history" ("baseToken", "quoteToken", "timestamp") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_f6e2479cc3b576c3b86328efe3"`);
        await queryRunner.query(`DROP TABLE "trade_history"`);
    }

}
