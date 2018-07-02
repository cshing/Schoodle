
$(document).ready(function(){
    
  $('.addNewAttendee').on('click', (e) => {
    // e.preventDefault();
    function addTimeslotCheckbox(){
        // let countTimeslots = $('.dategiven').length;
        // console.log(countTimeslots);
        // for (let i = 0; i < countTimeslots; i++) {
        // //return `<td><input type="checkbox" class="checkbox-input" name="checkbox-input" value="checkboxInput"></td>`
        return "hello";
        // }  
    } 
    
    let result = `
        <tr class="attendee-row" name="attendee-row">
        <th scope="row" >
            <button class="editAttendee" name="editAttendee"><span><i class="fa fa-pencil"></i></span></button>
            <button class="deleteAttendee" name="deleteAttendee"><span><i class="fa fa-trash"></i></span></button>
        </th>

        <form action="/e/<%=eventUrl%>" method="POST" id="attendee-input">
            <td><input type="text" class="form-control" class="typeName" name="typeName" placeholder="name"> </td>
            <td><input type="text" class="form-control" class="typeEmail" name="typeEmail" placeholder="email"> </td>
            ${(addTimeslotCheckbox)}
        </tr>`;      
    $('.results-container').append(result);
  })
})

    //trying to use ajax and post clicked results to server
    // $('.checkbox-input:checkbox').change(function(){
    //     if($(this).is(":checked")) { 
    //         $.ajax({
    //             url: '/e/:id',
    //             type: 'POST',
    //             data: { strID:$(this).attr("id"), strState:"1" }
    //         });
    //     } 
    //     else {
    //         $.ajax({
    //             url: '/e/:id',
    //             type: 'POST',
    //             data: { strID:$(this).attr("id"), strState:"0" }
    //         });
    //     }




    // $('.checkbox-input').click((e) => {
    //     checkedValue = $('.checkbox-input:checked').val();
    //     console.log(checkedValue);
        
    //     $.ajax('/e/:id', {
    //         method: 'POST',
    //     }).done( (data) => {
    //         console.log(data);
    //     })
    // })