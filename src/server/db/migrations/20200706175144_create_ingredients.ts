import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('ingredients', table => {
        table.bigIncrements('id').primary();

        table.string('name').notNullable().unique();
        table.string('slug').notNullable().unique();
        table.text('description');

        table.timestamps();
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('ingredients');
}

