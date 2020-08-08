import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class CreateIngredients1596166774860 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "ingredients",
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

        await queryRunner.createIndex('ingredients', new TableIndex({
            name: 'index_ingredients_on_name',
            columnNames: ['name'],
            isUnique: true
        }))

        await queryRunner.createIndex('ingredients', new TableIndex({
            name: 'index_ingredients_on_slug',
            columnNames: ['slug'],
            isUnique: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('ingredients');
    }

}
