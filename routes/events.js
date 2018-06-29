"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {
    const {title, description, location} = req.body;
    knex('events')
    .insert({
      title: title,
      description: description,
      location: location,
      url: generateRandUrl()
    })
    .then((data) => {
      return res.redirect("/");
    })
    .catch(err => res.send("Error in events.js in routes"))
  });

  //Generate 10 random characters
  function generateRandUrl() {
    let randomUrl = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 10; i++)
      randomUrl += possible.charAt(Math.floor(Math.random() * possible.length));
    return randomUrl;
  }

  return router;
}


