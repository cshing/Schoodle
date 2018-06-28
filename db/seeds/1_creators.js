exports.seed = function(knex, Promise) {
  return knex('creators').del()
    .then(function () {
      return Promise.all([
        knex('creators').insert({id: 1001, name: 'Laura', email: 'laura.tan108@gmail.com'}),
        knex('creators').insert({id: 1002, name: 'Carmen', email: 'carmenshing1221@hotmail.com'}),
        knex('creators').insert({id: 1003, name: 'Paulina', email: 'paulinate@o2.pl'})
      ]);
    });
};
