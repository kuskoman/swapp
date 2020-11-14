import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ReplaceHeroIdWithHeroUri1605388021272
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "users",
      "hero_id",
      new TableColumn({
        name: "hero_uri",
        type: "varchar",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "users",
      "hero_uri",
      new TableColumn({
        name: "hero_id",
        type: "varchar",
        isNullable: false,
      })
    );
  }
}
