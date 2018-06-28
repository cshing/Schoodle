$(() => {
  $.ajax({
    method: "GET",
    url: "/api/creators"
  }).done((creators) => {
    for(creator of creators) {
      $("<div>").text(creator.name).appendTo($("nav"));
    }
  });;
});
