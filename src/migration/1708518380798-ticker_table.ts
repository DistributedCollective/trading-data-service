import { MigrationInterface, QueryRunner } from 'typeorm'

export class tickerTable1708518380798 implements MigrationInterface {
  name = 'tickerTable1708518380798'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "ticker" DROP CONSTRAINT "UQ_de810ef424d9f8374604f5cbb06"')
    await queryRunner.query('ALTER TABLE "ticker" DROP CONSTRAINT "UQ_0b3a74f8c3a21388a92d61a050a"')
    await queryRunner.query('ALTER TABLE "ticker" ALTER COLUMN "address" SET NOT NULL')
    await queryRunner.query('ALTER TABLE "ticker" ADD CONSTRAINT "UQ_617b694b3fe3f5f2d47909857cc" UNIQUE ("address")')
    await queryRunner.query('ALTER TABLE "ticker" ADD CONSTRAINT "UQ_de810ef424d9f8374604f5cbb06" UNIQUE ("chainId", "address")')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "ticker" DROP CONSTRAINT "UQ_de810ef424d9f8374604f5cbb06"')
    await queryRunner.query('ALTER TABLE "ticker" DROP CONSTRAINT "UQ_617b694b3fe3f5f2d47909857cc"')
    await queryRunner.query('ALTER TABLE "ticker" ALTER COLUMN "address" DROP NOT NULL')
    await queryRunner.query('ALTER TABLE "ticker" ADD CONSTRAINT "UQ_0b3a74f8c3a21388a92d61a050a" UNIQUE ("symbol")')
    await queryRunner.query('ALTER TABLE "ticker" ADD CONSTRAINT "UQ_de810ef424d9f8374604f5cbb06" UNIQUE ("chainId", "address")')
  }
}
