$(document).ready(function(){
  $('#datepair .time').timepicker({
  'showDuration': true,
  'timeFormat': 'g:ia'
  });

  $('#datepair .date').datepicker({
    'format': 'm/d/yyyy',
    'autoclose': true
  });

  // initialize datepair
  var basicExampleEl = document.getElementById('datepair');
  var datepair = new Datepair(basicExampleEl);
});