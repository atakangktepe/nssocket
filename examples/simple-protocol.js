var nss = require('../')

//
// define a simple message protocol as [<type>, <id>] and create some messages that use it.
//
var message1 = ['message', 'one']
var message2 = ['message', 'two']

//
// Create an `nss` TCP server and tell the server to listen on port `6785`.
//
var server = nss.createServer(function (socket) {

  //
  // Here `socket` will be an instance of `NsSocket`.
  // When there is a connection, send `message1` to the socket.
  //
  socket.send(message1)

  //
  // listen for `message2` from the connecting socket.
  //
  socket.ondata(message2, function (data) {

    //
    // If this callback is called, we know that the socket
    // speaks our language, we will likely be provided with
    // a payload. In this case `{ "foo": "bar" }`.
    //
    console.log(data)
  })

}).listen(6785)

//
// Create a new `NsSocket` instance and then connect to the server in 1000 miliseconds.
//
setTimeout(function() {

  var outbound = nss()

  //
  //
  //
  outbound.ondata(message1, function () {
    outbound.send(message2, { "foo": "bar" })
  })

  outbound.connect(6785)

}, 1000)
