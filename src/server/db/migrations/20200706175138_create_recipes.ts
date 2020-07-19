import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('recipes', table => {
        table.bigIncrements('id').primary();

        table.string('name').notNullable().unique();
        table.string('slug').notNullable().unique();
        table.text('description');
        table.decimal('completion_time');

        table.timestamps();
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('recipes');
}

