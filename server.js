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

//this is the correct route
app.get('/e/:id', (req, res) => {
  let templateVars = {};
  // let eventUrl = `http//localhost:8080/e/${req.params.id}`; 
  
  //retrieve data from that urlF
  knex('events').where('url', req.params.id)
  .select('id', 'title', 'description', 'location')
  .then((data) => {
    console.log('line60',data[0]);
    let templateVars = {
      id: data[0].id,
      title: data[0].title,
      description: data[0].description,
      location: data[0].location,
      eventUrl: req.params.id,
      timeslot: [],
      // start_date: [],
      // end_date: [],
      // start_time: [],
      // end_time: []
    }
    knex('timeslots').where('event_id', data[0].id)
    .select('id', 'start_date', 'end_date', 'start_time', 'end_time')
    .returning('id')
    .then((data) => {
      data.map(item => {
        templateVars["timeslot"].push(item)
        // templateVars["end_date"].push(item.end_date),
        // templateVars["start_time"].push(item.start_time),
        // templateVars["end_time"].push(item.end_time)
      })
        // templateVars["end_date"].push(item.end_date),
        // templateVars["start_time"].push(item.start_time),
        // templateVars["end_time"].push(item.end_time)
     
      console.log(templateVars);
      return res.render('event_attendees', templateVars);
    })
    // console.log(templateVars);
    // return res.render('event_attendees', templateVars);
  .catch(err => {
    res.status(500).send("Error in server.js")
  })
})
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
})
