/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('texts', {
        id: {
            type: 'varchar(50)',
            notNull: true,
            primaryKey: true,
        },
        user_id: {
            type: 'varchar(50)',
          },
        text: {
            type: 'text',
            notNull: true,
        }
    })
    pgm.createIndex('texts', 'id')
    pgm.createIndex('texts', ['id', 'user_id'])
};

exports.down = pgm => {
    pgm.dropTable('texts')
};
