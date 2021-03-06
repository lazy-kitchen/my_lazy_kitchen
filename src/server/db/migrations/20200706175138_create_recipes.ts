import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable('recipes', table => {
        table.bigIncrements('id').primary();

        table.string('name').notNullable();
        table.string('slug').notNullable();
        table.text('description');
        table.decimal('completion_time');

        table.timestamps(true, true);
    });

    await knex.schema.alterTable('recipes', table => {
        table.unique(['name']);
        table.unique(['slug']);
    });
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('recipes');
}

