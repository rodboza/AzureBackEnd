const express = require('express');
const auth = require('./auth');

module.exports = function (server) {

  server.all(auth);
  
  server.get('/', function(req, res) {
    res.send('<h1>Index!</h1>');
  })
  
}

