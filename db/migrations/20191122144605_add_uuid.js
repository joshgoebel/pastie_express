
exports.up = function(knex) {
  return knex.schema.table("pastes", (table) => {
      table.string("uuid",36);
      table.string("key",36);
      table.unique("key");
  })
};

exports.down = function(knex) {

};
