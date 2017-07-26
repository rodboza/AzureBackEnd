const _      = require('lodash');
const jwt    = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const env    = require('../../.env');
const mongoose = require('mongoose');




module.exports = function(app) {

	var api = {};
	const User = mongoose.model('User');

	const sendErrorsFromDB = (res, dbErrors) => {
		const errors = [];
		_.forIn(dbErrors.errors, error => errors.push(error.message));
		if (res.status == -1)
			res.status(400);
		return res.json({ errors });
	}
	
	const enviaErro = ( _res, _status, _msg ) => {
		_res.status(_status);
		throw new Error(_msg);
	}

	api.login = function(req, res, next) {
		const email = req.body.email || '';
		const password = req.body.password || '';

		User.findOne({ email } )
			.then( 
				function (user){
					if (! ( user && bcrypt.compareSync(password, user.password ) ) ) 
						enviaErro(res,404, 'Usuário/Senha inválidos');
					const token = jwt.sign(user, env._authSecret, {expiresIn: "1 day"});
					const { name, email } = user;
					return res.status(200).send({ name, email, token });
				}
				,function ( err ) {
					return sendErrorsFromDB(res, err);
				}
			);
	}


	api.logout = function(req, res, next) {
		res.end("<h1>logout</h1>");
		console.log("logout");
	}

	api.registrar = function(req, res, next) {
		const name = req.body.name || '';
		const email = req.body.email || '';
		const password = req.body.password || '';
		const confirmPassword = req.body.confirm_password || '';

		User.findOne({ email })
			.then(
				function (user){
					if (user) 
						return enviaErro ( res, 400, env._usuarioJaCadastrado );
					
					if (!email.match(env._emailRegex))
						return enviaErro ( res, 400, env._emailInvalido );
					
					if (!password.match(env._passwordRegex))
						return enviaErro ( res, 400, env._senhaInvalida );

					const salt = bcrypt.genSaltSync();
					const passwordHash = bcrypt.hashSync(password, salt);
					if (!bcrypt.compareSync(confirmPassword, passwordHash))
						return enviaErro ( res, 400, env._senhaDifConfirmacao );
					
					const newUser = new User({ name, email, password: passwordHash });
					newUser.save()
						.then( 
							function (err){
								return sendErrorsFromDB(res, err);
							}
						);
					next();
				}
				,function (err){
					return sendErrorsFromDB(res, err);
				}
			)
	}


	api.validarToken = function(req, res, next) {
		console.log("token validado");
		next();
	}

	return api;
};
