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
		return res.status(400).json({ errors });
	}

	api.login = function(req, res, next) {
		const email = req.body.email || '';
		const password = req.body.password || '';

		User.findOne({ email }, (err, user) => {
			if (err) {
				return sendErrorsFromDB(res, err);
			} else if (user && bcrypt.compareSync(password, user.password)) {
				const token = jwt.sign(user, env._authSecret, {
					expiresIn: "1 day"
				});
				const { name, email } = user;
				//res.json({ name, email, token });
				return res.status(200).send({ name, email, token });
			} else {
				return res.status(400).send({ errors: ['Usuário/Senha inválidos'] });
			}
		})
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


		if (!email.match(env._emailRegex)) {
			return res.status(400).send({ errors: [ env._emailInvalido ] });
		}

		if (!password.match(env._passwordRegex)) {
			return res.status(400).send({ errors: [ env._senhaInvalida ] });
		}

		const salt = bcrypt.genSaltSync();
		const passwordHash = bcrypt.hashSync(password, salt);
		if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
			return res.status(400).send({ errors: [ env._senhaDifConfirmacao ] });
		}

		User.findOne({ email }, (err, user) => {
			if (err) {
				return sendErrorsFromDB(res, err);
			} else if (user) {
				return res.status(400).send({ errors: [ env._usuarioJaCadastrado ] });
			} else {
				const newUser = new User({ name, email, password: passwordHash });
				newUser.save(err => {
					if (err) {
						return sendErrorsFromDB(res, err);
					} else {
						//api.login(req, res, next);
						next();
					}
				})
			}
		})


	}

	api.validarToken = function(req, res, next) {
		console.log("token validado");
		next();
	}

	return api;
};
