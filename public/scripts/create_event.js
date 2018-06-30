$(document).ready(function(){
  $('#datepair .time').timepicker({
  'showDuration': true,
  'timeFormat': 'g:ia'
  });

  $('#datepair .date').datepicker({
    'format': 'm/d/yyyy',
    'autoclose': true
  });

  $('#datepair').datepair();

  $('.add-timeslot').on('click', (function(e){
    e.preventDefault();
    let result = `
      <p class="appendDatePair">
        <input type="text" class="date start" name="start_date" placeholder="start date" />
        <input type="text" class="time start" name="start_time" placeholder="start time"/> to
        <input type="text" class="time end" name="end_time" placeholder="end time" />
        <input type="text" class="date end" name="end_date" placeholder="end date" />
      </p> `;      
      $('.timeslot-container').append(result);

      var counter = $('.Counter').html();
      counter++ ;
      $('.Counter').html(counter);

      $('.appendDatePair .time').timepicker({
        'showDuration': true,
        'timeFormat': 'g:ia'
      });
    
      $('.appendDatePair .date').datepicker({
        'format': 'm/d/yyyy',
        'autoclose': true
      });

      $('.appendDatePair').datepair();     
  }))

    // Attach Button click event listener 
  $('#submit-btn').on('click', (function(e){
    e.preventDefault();

        // show Modal
        $('#myModal').modal('show');
   }));
});
