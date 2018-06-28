
exports.up = function(knex, Promise) {
    return createTables()
    .then(createEvents)
    .then(createAttendees)
    .then(createTimeslots)
    .then(createAvailabilities) 
    
    function createTables(){
        return knex.schema.createTable('creators', function (table) {
            table.increments('id').primary;
            table.string('name');
            table.varchar('email');
          });
    }

    function createEvents(){
        return knex.schema.createTable('events', function (table) {
            table.increments('id').primary;
            table.string('title');
            table.string('description');
            table.string('location');
            table.varchar('url');
            table.integer('creator_id').unsigned();
            table.foreign('creator_id').references('creators.id');
          });
    }

    function createAttendees(){
        return knex.schema.createTable('attendees', function (table) {
            table.increments('id').primary;
            table.string('name');
            table.varchar('email');
            table.integer('event_id').unsigned();
            table.foreign('event_id').references('events.id');
        });
    }

    function createTimeslots(){
        return knex.schema.createTable('timeslots', function (table) {
        table.increments('id').primary;
        table.date('date');
        table.time('time');
        table.integer('event_id').unsigned();
        table.foreign('event_id').references('events.id');
        });
    }

    function createAvailabilities(){
        return knex.schema.createTable('availabilities', function (table) {
            table.increments('id').primary;
            table.integer('attendee_id').unsigned();
            table.foreign('attendee_id').references('attendees.id');
            table.integer('timeslot_id').unsigned();
            table.foreign('timeslot_id').references('timeslots.id');
        });
    }
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('creators')
    .then(knex.schema.dropTable('events'))
    .then(knex.schema.dropTable('attendees'))
    .then(knex.schema.dropTable('timeslots'))
    .then(knex.schema.dropTable('availabilities')); 
};
