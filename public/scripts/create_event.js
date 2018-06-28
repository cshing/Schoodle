$(() => {
    $.ajax({
      method: "GET",
      url: "/api/events"
    }).done((users) => {
      for(user of users) {
        $("<div>").text(user.email).appendTo($("body"));
      }
    });;
  });
  