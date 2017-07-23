console.log("rtsAuth inicio");

module.exports = function(app) {

    var api = app.api.auth;
    app.post('/v1/auth/login', api.login);
    app.post('/v1/auth/logout', api.logout);
    app.post('/v1/auth/registrar', api.registrar);
    app.use('/*', api.validarToken);

};

console.log("rtsAuth fim");
