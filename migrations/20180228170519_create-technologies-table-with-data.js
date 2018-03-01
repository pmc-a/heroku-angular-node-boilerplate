exports.up = (knex, Promise) => {
    return knex.schema.createTable('technologies', (table) => {
        table.increments();
        table.string('name').notNullable();
    }).then(() => {
        return knex('technologies').insert([
            { name: 'JavaScript' },
            { name: 'TypeScript' },
            { name: 'Vue' },
            { name: 'Angular' },
            { name: 'React' }
        ]);
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('technologies');
};
