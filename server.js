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
const resultRoutes = require("./routes/result-attendee-avail");
var templateVars = {};
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
// app.use("/api/result", resultRoutes(knex));

app.get("/", (req, res) => {
  res.render("index")
})

app.get("/new", (req, res) => {
  res.render("event_new")
})

//this is the correct route
app.get('/e/:id', (req, res) => {
  // let templateVars = {};
  // let eventUrl = `http//localhost:8080/e/${req.params.id}`; 
  
  //retrieve data from that urlF
  knex('events').where('url', req.params.id)
  .select('id', 'title', 'description', 'location', 'creator_id')
  .then((data) => {
     templateVars = {
      id: data[0].id,
      creator_name: "",
      creator_email: "",
      title: data[0].title,
      description: data[0].description,
      location: data[0].location,
      eventUrl: req.params.id,
      timeslot: [],
    }
    knex('creators').where('id', data[0].creator_id)
    .select('id', 'name', 'email')
    .returning('*')
    .then((data) => {
        templateVars["creator_name"] = data[0].name,
        templateVars["creator_email"] = data[0].email
      })
      knex('timeslots').where('event_id', data[0].id)
      .select('id', 'start_date', 'end_date', 'start_time', 'end_time')
      .returning('id')
      .then((data) => {
        data.map(item => {
          templateVars["timeslot"].push(item)
        })
        // console.log(templateVars);
        return res.render('event_attendees', templateVars);
      })
    .catch(err => {
      res.status(500).send("Error in server.js")
    })
  })
})

app.post('/e/:id', (req, res) => {
  console.log(req.body);
  let formData = req.body; 
  let checkboxID;
  let checkboxIDs = [];
  let timeslotID;
  let timeslotIDs = [];

  //templateVars is an obj
  function verifyCheckboxArray(){
    if (Array.isArray(formData["checkbox-input"])){
      formData["checkbox-input"].forEach(checkbox => {
        checkboxIDs.push(Number(checkbox.substr(checkbox.length - 1)))
      })
      return true;
    }
    else {
      checkboxID = Number(formData["checkbox-input"].slice(-1));
      // console.log(checkboxID);
      return false;
    }
  }
  
   if (verifyCheckboxArray() == false){
    timeslotID = templateVars.timeslot[checkboxID].id
    // console.log(timeslotID);
  }
  else {
    console.log("116", checkboxIDs);
    for (let checkbox in checkboxIDs) {
        timeslotIDs.push(templateVars.timeslot[checkbox].id)
    }
  }

  function checkTimeslotArr(){
    if (timeslotIDs.length === 0){
      return false;
    }
    return true;
  }

  knex('events').where('url', req.params.id)
    .select('id')
    // .returning('id')
    .then((data) => {
      knex('attendees')
      .insert({
        name: formData["typeName"],
        email: formData["typeEmail"],
        event_id: data[0].id
      })
      .returning('*')
      .then((data) =>{
        console.log("*data:", data);
        console.log(data[0].id);
        templateVars = {
          attendee_name: data[0].name,
          attendee_email: data[0].email
        }
        console.log(templateVars);
        if (checkTimeslotArr() == false){
          knex('availabilities')
          .insert({
            attendee_id: attendeeID,
            timeslot_id: timeslotID
          })
          .returning('*')
          .then((data) => {
            console.log(data);
            res.render('event_attendees', templateVars)
          })
          .catch(err => res.send("Error in server.js in routes:", err)) 
        }
        else {
          let timeslotId = timeslotIDs[0]
          // for (let timeslotId in timeslotIDs){
            knex('availabilities')
            .insert({
              attendee_id: attendeeID,
              timeslot_id: timeslotId
            })
            .returning('*')
            .then((data) => {
              console.log(data);
              res.render('event_attendees', templateVars)
            })
            .catch(err => res.send("Error in server.js in routes:", err)) 
            .then(() => {
              let timeslotId = timeslotIDs[1];
              knex('availabilities')
              .insert({
                attendee_id: attendeeID,
                timeslot_id: timeslotId
              })
              .returning('*')
              .then((data) => {
                console.log(data);
                res.render('event_attendees', templateVars)
              })
              .catch(err => res.send("Error in server.js in routes:", err)) 
          })
        }
      })
      .catch(err => res.send("Error in server.js in routes:", err)) 
      })
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
})