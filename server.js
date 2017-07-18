console.log("inicio do arquivo /server.js");
const server = require('./config/server')
//require('./config/database')
require('./config/routes')(server)
console.log("fim do arquivo /server.js");


/*
var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello, world! [helloworld sample; iisnode version is ' + process.env.IISNODE_VERSION + ', node version is ' + process.version + ']');
    console.log("teste");
}).listen(process.env.PORT);  
*/
