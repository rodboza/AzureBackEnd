const express = require('express')
const auth = require('./auth')

module.export = function (server) {

server.get('/', function(req, res) {
  res.send('<h1>Index!</h1>')
})
  
}

