import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('recipe_steps_ingredients', (table) => {
        table.primary(['recipe_step_id', 'ingredient_id']);

        table.bigInteger('recipe_step_id').references('id').inTable('recipes').index().notNullable();
        table.bigInteger('ingredient_id').references('id').inTable('ingredients').index().notNullable();
        table.float('amount').notNullable();
        // null constraint not placed here to allow ingredients like '1 leaf'
        table.string('unit');

        table.timestamps();
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('recipe_steps_ingredients');
}

