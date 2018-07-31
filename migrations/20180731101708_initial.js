exports.up = (knex, Promise) => {
    return knex.schema.createTable('person', (table) => {
        table.increments();
        table.string('givenName');
        table.string('familyName');
      })
};

exports.down = () => {}
