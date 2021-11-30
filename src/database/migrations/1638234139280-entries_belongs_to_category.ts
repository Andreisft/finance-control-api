import { MigrationInterface, QueryRunner } from 'typeorm';

export class entriesBelongsToCategory1638234139280
  implements MigrationInterface
{
  name = 'entriesBelongsToCategory1638234139280';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entries" ADD "categoryId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "entries" ADD CONSTRAINT "FK_16690857e79d09979df6f88c0c2" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entries" DROP CONSTRAINT "FK_16690857e79d09979df6f88c0c2"`,
    );
    await queryRunner.query(`ALTER TABLE "entries" DROP COLUMN "categoryId"`);
  }
}
