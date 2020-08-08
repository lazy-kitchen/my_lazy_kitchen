import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable('steps', table => {
        table.bigIncrements('id').primary();

        table.bigInteger('recipe_id').references('id').inTable('recipes').notNullable();
        table.integer('order').notNullable();
        table.text('instruction').notNullable();

        table.timestamps(true, true);
    });

    await knex.schema.alterTable('steps', table => {
       table.index(['recipe_id']);
    });
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('steps');
}

