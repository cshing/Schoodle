"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/attendees", (req, res) => {
      let formData = req.body;
      console.log(formData)
    knex('events').where('url', req.params.id)
    .select('id')
    .then((event_id) => {
        return res.send("ok");
    })
    // .then((event_id) => {
    //     knex('attendees')
    //     .insert({

    //     })
    // })



    // .from("creators")
    // .then((results) => {
    .catch(err => res.send("Error in result-att-avail.js in routes"))
  });

  return router;
}


