const _      = require('lodash');
var mongoose = require('mongoose');

module.exports = function(app) {

     var api = {};
     User = app.modelo.user2;
     //User.name = "teste";

     const sendErrorsFromDB = (res, dbErrors) => {
   		const errors = [];
      console.log("error no find");
   		_.forIn(dbErrors.errors, error => errors.push(error.message));
   		return res.status(400).json({ errors });
   	}

     api.teste = function(req, res, next) {
      var email = "teste2@yesye.com";
      console.log("inicio do find");
       User.findOne({ email }, (err, user) => {
         if (err) {
   				return sendErrorsFromDB(res, err);
        } else if (user) {
            console.log(user);
            const { name, email, password } = user;
            return res.status(200).send("<h1>teste da chamada da API</h1><br> nome=" + name + "<br>password=" + password );
          }
       })

       //res.end("<h1>teste da chamada da APIx</h1>");
       console.log("teste apix");

     }

     return api;
 };
