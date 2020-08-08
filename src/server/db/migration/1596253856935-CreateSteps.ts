import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from "typeorm";

export class CreateSteps1596253856935 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "steps",
            columns: [
                {
                    name: "id",
                    type: "bigserial",
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: "instruction",
                    type: "text",
                    isNullable: false
                },
                {
                    name: "order",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "recipe_id",
                    type: "bigint",
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
        await queryRunner.createForeignKey(
            'steps',
            new TableForeignKey({
                columnNames: ['recipe_id'],
                referencedTableName: 'recipes',
                referencedColumnNames: ['id'],

            })
        );

        await queryRunner.createIndex('steps', new TableIndex({
            name: 'index_steps_on_recipe_id',
            columnNames: ['recipe_id']
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('steps');
    }

}
