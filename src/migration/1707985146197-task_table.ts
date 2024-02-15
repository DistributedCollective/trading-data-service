import { MigrationInterface, QueryRunner } from 'typeorm'

export class taskTable1707985146197 implements MigrationInterface {
  name = 'taskTable1707985146197'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "UQ_20f1f21d6853d9d20d501636ebd" UNIQUE ("name"), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE INDEX "IDX_20f1f21d6853d9d20d501636eb" ON "task" ("name") ')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX "public"."IDX_20f1f21d6853d9d20d501636eb"')
    await queryRunner.query('DROP TABLE "task"')
  }
}
