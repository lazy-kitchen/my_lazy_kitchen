import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class CreateRecipes1596249293008 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "recipes",
            columns: [
                {
                    name: "id",
                    type: "bigserial",
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "slug",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "description",
                    type: "text",
                    isNullable: true
                },
                {
                    name: "completion_time",
                    type: "decimal",
                    isNullable: false
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    isNullable: false,
                    default: 'NOW()'
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    isNullable: false,
                    default: 'NOW()'
                }
            ]
        }), true, true, true);

        await queryRunner.createIndex('recipes', new TableIndex({
            name: 'index_recipes_on_name',
            columnNames: ['name'],
            isUnique: true
        }))

        await queryRunner.createIndex('recipes', new TableIndex({
            name: 'index_recipes_on_slug',
            columnNames: ['slug'],
            isUnique: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('recipes');
    }

}
