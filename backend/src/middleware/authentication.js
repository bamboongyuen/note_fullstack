const jwt = require('jsonwebtoken');
const response = require('../help/response');

module.exports = function (req, res, next) {
    const token = req.headers.token?.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_JWT, (err, decode) => {
        if (err) return res.status(401).json(response(false, 'Request no authentication'));
        req.role = decode.role;
        next();
    });
};
