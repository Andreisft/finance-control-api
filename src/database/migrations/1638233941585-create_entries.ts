import { MigrationInterface, QueryRunner } from 'typeorm';

export class createEntries1638233941585 implements MigrationInterface {
  name = 'createEntries1638233941585';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."entries_type_enum" AS ENUM('0', '1')`,
    );
    await queryRunner.query(
      `CREATE TABLE "entries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, "isPaid" boolean NOT NULL DEFAULT false, "dueDate" date NOT NULL, "expectedDate" date NOT NULL, "writeOffDate" date NOT NULL, "amount" numeric NOT NULL, "type" "public"."entries_type_enum" NOT NULL, CONSTRAINT "PK_23d4e7e9b58d9939f113832915b" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "entries"`);
    await queryRunner.query(`DROP TYPE "public"."entries_type_enum"`);
  }
}
