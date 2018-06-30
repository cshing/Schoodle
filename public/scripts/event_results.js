$(document).ready(function(){
    $(() => {
        $.ajax({
        method: "GET",
        url: "/e/:id"
        }).done((templateVars) => {
            console.log(templateVars);
        })
    });
});

  