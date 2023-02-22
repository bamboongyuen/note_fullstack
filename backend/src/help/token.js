const jwt = require('jsonwebtoken');

function createToken(data, accessToken) {
    if (accessToken) {
        return jwt.sign(data, process.env.ACCESS_JWT, { expiresIn: 90 });
    } else {
        return jwt.sign(data, process.env.REFRESH_JWT, { expiresIn: '1d' });
    }
}

function decodeToken(token) {
    if (token) {
        return jwt.decode(token) || undefined;
    }
}

module.exports = { createToken, decodeToken };
