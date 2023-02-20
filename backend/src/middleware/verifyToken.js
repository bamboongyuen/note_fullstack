const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (!req.headers.token) {
        return res.status(401).json({ status: false, data: 'Access without token.' });
    }
    try {
        const decode = jwt.verify(req.headers.token, process.env.REFRESH_JWT);
        req.tokenId = decode._id;
        req.tokenRole = decode.role;
    } catch (error) {
        return res.status(401).json({ status: false, data: 'Access invalid token.' });
    }
    next();
};
