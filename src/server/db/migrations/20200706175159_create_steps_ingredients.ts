import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable('steps_ingredients', (table) => {
        table.primary(['step_id', 'ingredient_id']);

        table.bigInteger('step_id').references('id').inTable('recipes').index().notNullable();
        table.bigInteger('ingredient_id').references('id').inTable('ingredients').index().notNullable();
        table.decimal('amount').notNullable();
        // null constraint not placed here to allow ingredients like '1 leaf'
        table.string('unit');

        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('steps_ingredients');
}

