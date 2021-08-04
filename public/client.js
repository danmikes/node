// this file's full path is /public/client.js
$(document).ready(function () {
  /*global io*/
  let socket = io();

  socket.on("user", (data) => {
    $("#num-users").text(data.currentUsers + " users online");
    let change = data.connected ? "joined" : "left";
    let message = `${data.name} has ${change} the chat.`;
    $("#messages").append($("<li>").html(`<b> + ${message} + </b>`));
  });

  socket.on("chat message", (data) => {
    $("#messages").append($("<li>").text(`${data.name}: ${data.message}`));
  });

  // Form submission with new message in field with id 'm'
  $("form").submit(function () {
    var messageToSend = $("#m").val();
    socket.emit("chat message", messageToSend);
    $("#m").val("");
    return false; // prevent form submit from refreshing page
  });
});
