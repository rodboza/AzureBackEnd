var mongoose = require('mongoose');

module.exports = function(app) {

     var api = {};

     api.teste = function(req, res, next) {
       res.end("<h1>teste da chamada da API</h1>");
       console.log("teste api");
     }

     return api;
 };
