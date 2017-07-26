/*
const restful = require('node-restful')
const mongoose = restful.mongoose

module.exports = function(app) {

	var modelo = {};

  const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, min: 6, max: 12, required: true }
  })

  modelo = restful.model('User', userSchema);

  return modelo;
}
//module.exports = restful.model('User', userSchema)
*/
