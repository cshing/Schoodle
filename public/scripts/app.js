$(() => {
  $.ajax({
    method: "GET",
    url: "/api/creators"
  }).done((creators) => {
    // for(creator of creators) {
      $("<div>").text(`Logged in as: ${creators[0].name}`).appendTo($("nav"));
  })
});