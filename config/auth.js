const jwt = require('jsonwebtoken');
const _authSecret = require('../.env');

module.exports = (req, res, next) => {

    console.log('token');
    console.log('request inicio');
    console.log(req.url);
    console.log('request fim');
    // CORS preflight request
    if (req.method === 'OPTIONS' || req.url.indexof('/auth/') !==-1) {
        next();
    } else {
        const token = req.body.token || req.query.token || req.headers['authorization'];

        console.log(token);
        console.log(_authSecret);
        
        if (!token) {
            return res.status(403).send({ errors: ['No token provided.'] });
        }

        jwt.verify(token, _authSecret, function (err, decoded) {
            if (err) {
                return res.status(403).send({
                    errors: ['Failed to authenticate token.']
                });
            } else {
                req.decoded = decoded;
                next();
            }
        })
    }
}
