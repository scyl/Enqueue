// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  var socket = io();
  
  socket.on('updateQueue', function(queue){
    $('#queue').html("");
    if (queue.length  > 0) {
      var i = 0;
      for (i = 0; i < queue.length; i++) {
        $('#queue').append($('<li class="queue">').html(genRoll(queue[i])));
      }
    } else {
      $('#queue').html("EMPTY");
    }
  });
  
  $("#btn").on('click', '.nextBtn', function() {
    socket.emit('next');
    console.log("Next clicked");
  });
  
});


function genRoll(user) {
  return "<table><tr class='nameRow'><th class='names'>" + user[0] + "</th><th class='name'>" + user[1] + "</th></tr></table>";
}