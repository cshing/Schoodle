
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('timeslots', function (table) {
            table.dropColumn('date');
            table.dropColumn('time');
            table.date('start_date');
            table.date('end_date');
            table.time('start_time');
            table.time('end_time');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('timeslots', function (table) {
            table.date('date');
            table.time('time');
            table.dropColumn('start_date');
            table.dropColumn('end_date');
            table.dropColumn('start_time');
            table.dropColumn('end_time');
        })
    ])
};