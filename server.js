"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const creatorsRoutes = require("./routes/creators");
const eventsRoutes = require("./routes/events");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/creators", creatorsRoutes(knex));
app.use("/api/events", eventsRoutes(knex));

app.get("/", (req, res) => {
  res.render("index")
})

app.get("/new", (req, res) => {
  res.render("event_new")
})

// app.get("/eventpage", (req, res) => {
//   console.log(req.params.id);
//   res.render("event_page")
// })

//this is the correct route
app.get('/e/:id', (req, res) => {
  let templateVars = {};
  // let eventUrl = `http//localhost:8080/e/${req.params.id}`; 
  
  //retrieve data from that url
  knex('events').where('url', req.params.id)
  .select('id', 'title', 'description', 'location')
  .then((data) => {
    // console.log(data);
    console.log(data[0].title); 
    let templateVars = {
      title: data[0].title,
      description: data[0].description,
      location: data[0].location,
      eventUrl: req.params.id
    }
    console.log(data);
    return res.render('event_attendees', templateVars);
  })
  .catch(err => res.send("Error in server.js in routes:", err))
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
