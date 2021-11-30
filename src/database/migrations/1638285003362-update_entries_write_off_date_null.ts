import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateEntriesWriteOffDateNull1638285003362
  implements MigrationInterface
{
  name = 'updateEntriesWriteOffDateNull1638285003362';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entries" ALTER COLUMN "writeOffDate" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entries" ALTER COLUMN "writeOffDate" SET NOT NULL`,
    );
  }
}
