const response = require('../help/response');

module.exports = function (type) {
    let user, pass, _id, token;
    switch (type) {
        case 'userpass':
            user = true;
            pass = true;
            break;
        case 'token':
            token = true;
            break;
    }
    return (req, res, next) => {
        if (user && !req.body.username) {
            return res.status(400).json(response(false, 'Request miss params.'));
        }
        if (pass && !req.body.password) {
            return res.status(400).json(response(false, 'Request miss params.'));
        }
        if (_id && !req.body._id) {
            return res.status(400).json(response(false, 'Request miss params.'));
        }
        if (token && !req.headers.token) {
            return res.status(400).json(response(false, 'Request miss params.'));
        }
        next();
    };
};
