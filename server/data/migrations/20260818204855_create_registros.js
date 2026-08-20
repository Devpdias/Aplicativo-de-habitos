/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("registros", (table) => {
    table.increments("id");
    table.integer("habito_id").references("id").inTable("habitos");
    table.date("data").notNullable();
    table.boolean("concluido").defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("registros");
};
