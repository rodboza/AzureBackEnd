const express = require('express')
const auth = require('./auth')

server.get('/', function(req, res) {
  res.send('<h1>Index!</h1>')
})

