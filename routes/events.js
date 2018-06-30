"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {
    let formData = req.body;
    let timeSlots = [];

    //check if req.body.start_date is an array
    function checkArray(){
      if (Array.isArray(formData.start_date)){

        // compileStartAndEndDates
        formData.start_date.map((date, index) => {
          let data = {
            start_date: formData.start_date[index],
            start_time: formData.start_time[index],
            end_date: formData.end_date[index],
            end_time: formData.end_time[index]
          }
          timeSlots.push(data);
        })
        return;
      }
      return false;
    }

    knex('events')
    .insert({
      title: formData.title,
      description: formData.description,
      location: formData.location,
      url: generateRandUrl()
    })
    .returning('id')
    .then(function(response){
      // console.log(formData.start_date);
      if (checkArray){
        timeSlots.map(item => {
          knex('timeslots')
          .insert({
            start_date: item.start_date,
            start_time: item.start_time,
            end_time: item.end_time,
            end_date: item.end_date,
            event_id: response[0]
          })
        })
      } 
      knex('timeslots')
      .insert({
        start_date: formData.start_date,
        start_time: formData.start_time,
        end_time: formData.end_time,
        end_date: formData.end_date,
        event_id: response[0]
      })
    })
    .then(() => {
      knex
      .select('url')
      .from('events')
      .then((rows) => {
        //console.log(rows.slice(-1)[0].url);
        // console.log(rows);
        // res.json(rows)
        // console.log(res.status(304));
        return res.redirect(`/e/${rows.slice(-1)[0].url}`);
      })
      .catch(err => res.send("Error in events.js in routes:", err))
    })
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
