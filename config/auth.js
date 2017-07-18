const jwt = require('jsonwebtoken');
const env = require('../.env');

module.exports = (req, res, next) => {

    console.log('token');
    // CORS preflight request
    if (req.method === 'OPTIONS') {
        next();
    } else {
        const token = req.body.token || req.query.token || req.headers['authorization'];

        console.log(token);
        console.log(env._authSecret);
        
        if (!token) {
            return res.status(403).send({ errors: ['No token provided.'] });
        }

        jwt.verify(token, env._authSecret, function (err, decoded) {
            if (err) {
                return res.status(403).send({
                    errors: ['Failed to authenticate token.'];
                })
            } else {
                req.decoded = decoded;
                next();
            }
        })
    }
}
