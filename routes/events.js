"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/new", (req, res) => {
    knex
      .select("name")
      .from("creators")
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}


