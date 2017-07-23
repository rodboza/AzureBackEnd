console.log("rtsTeste inicio");

module.exports = function(app) {

    var api = app.api.teste;
    app.get("/v1/teste", api.teste);

};

console.log("rtsTeste fim");
