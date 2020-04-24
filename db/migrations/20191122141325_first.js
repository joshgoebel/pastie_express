
exports.up = function(knex) {
  return knex.schema.createTable('pastes', (table) => {
    table.increments("id");
    table.string("language");
    table.string("content", 100000).notNullable();
    table.datetime("expires_at").notNullable();
    table.timestamps(false, true);
  })
};

exports.down = function(knex) {
  knex.schema.dropTable("pastes")
};
