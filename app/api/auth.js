var mongoose = require('mongoose');
var jwt  = require('jsonwebtoken');

module.exports = function(app) {

     var api = {};
     var model = mongoose.model('User');

     api.login = function(req, res, next) {
       res.end("<h1>login</h1>");
       console.log("login");
     }

     api.logout = function(req, res, next) {
       res.end("<h1>logout</h1>");
       console.log("logout");
     }

     api.registrar = function(req, res, next) {
       res.end("<h1>registrar</h1>");
       console.log("registrar");
     }

     api.validarToken = function(req, res, next) {
       console.log("token validado");
       next();
     }

    return api;
};
