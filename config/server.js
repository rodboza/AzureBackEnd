
const bodyParser = require('body-parser');
const express = require('express');
const allowCors = require('./cors');
const queryParser = require('express-query-int');
var consign = require('consign');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(allowCors);
app.use(queryParser());

consign({cwd: 'app'})
    .include('model')
    .then('api')
    .then('route/rtsAuth.js')
    .then('route')
    .into(app);


app.listen(port, function() {
  console.log(`BACKEND is running on port ${port}.`);
})

module.exports = app;
