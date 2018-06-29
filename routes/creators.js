"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
    .select("name")
    .from("creators")
    .then((results) => {
      return res.json(results);
    })
    .catch(err => res.send("Error in creators.js in routes"))
  });

  return router;
}


