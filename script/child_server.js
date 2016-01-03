var express = require('express');
var php = require("node-php");

var port = process.argv[0];
var dir = process.argv[1];

var app = express();
app.use(express.static(dir));
app.all(php.cgi(dir));

var server = app.listen(port,function(){
  var s_host = server.host;
  var s_port = server.port;
  console.log("Server Running on " + s_host + ":" + s_port);
});