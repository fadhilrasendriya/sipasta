/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('texts', {
        id: {
            type: 'varchar(50)',
            notNull: true,
        },
        userId: {
            type: 'varchar(50)',
            notNull: true,
          },
        text: {
            type: 'text',
            notNull: true,
        }
    })
    pgm.createIndex('texts', 'id')
    pgm.createIndex('texts', 'userId')
};

exports.down = pgm => {};
