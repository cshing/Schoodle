
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('events').insert(
          {
          id: 1001,
          title: 'Post Midterm Party',
          description: 'Code party',
          location: 'Lighthouse Labs',
          url: 'http://localhost:8080/e/abc',
          creator_id: 1002
          })
      ]);
    });
};
