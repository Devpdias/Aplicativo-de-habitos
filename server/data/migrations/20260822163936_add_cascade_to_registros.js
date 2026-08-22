/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.dropTable("registros");

  await knex.schema.createTable("registros", (table) => {
    table.increments("id");
    table
      .integer("habito_id")
      .references("id")
      .inTable("habitos")
      .onDelete("CASCADE");
    table.date("data").notNullable();
    table.boolean("concluido").defaultTo(false);
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable("registros");

  await knex.schema.createTable("registros", (table) => {
    table.increments("id");
    table.integer("habito_id").references("id").inTable("habitos");
    table.date("data").notNullable();
    table.boolean("concluido").defaultTo(false);
  });
};
