import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateEntries1638284879807 implements MigrationInterface {
  name = 'updateEntries1638284879807';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."entries_type_enum" RENAME TO "entries_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."entries_type_enum" AS ENUM('pay', 'receive')`,
    );
    await queryRunner.query(
      `ALTER TABLE "entries" ALTER COLUMN "type" TYPE "public"."entries_type_enum" USING "type"::"text"::"public"."entries_type_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."entries_type_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."entries_type_enum_old" AS ENUM('0', '1')`,
    );
    await queryRunner.query(
      `ALTER TABLE "entries" ALTER COLUMN "type" TYPE "public"."entries_type_enum_old" USING "type"::"text"::"public"."entries_type_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."entries_type_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."entries_type_enum_old" RENAME TO "entries_type_enum"`,
    );
  }
}
