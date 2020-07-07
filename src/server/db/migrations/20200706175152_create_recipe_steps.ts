import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('recipe_steps', table => {
        table.bigIncrements('id').primary();

        table.bigInteger('recipe_id').references('id').inTable('recipes');
        table.integer('step_number').notNullable();
        table.text('instruction').notNullable();

        table.timestamps();
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('recipe_steps');
}

